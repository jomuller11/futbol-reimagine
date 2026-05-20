#!/usr/bin/env python3
"""
Scraper del torneo Papi Fútbol San José Morón.

Lee las páginas públicas del sitio oficial y regenera data/torneo.js
con la estructura que consume el prototipo.

Uso:
    python3 scrape.py              # ejecución normal
    python3 scrape.py --dry-run    # sin escribir archivos
    python3 scrape.py --verbose    # más output

Si la estructura del sitio cambia, este script detecta el problema y falla con
un mensaje claro en lugar de generar datos rotos.
"""

import argparse
import json
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path

import requests
from bs4 import BeautifulSoup

# ============================================================
# CONFIGURACIÓN
# ============================================================

BASE_URL = "https://papifutbolsanjosemoron.com.ar"
HOME_URL = f"{BASE_URL}/"
EQUIPOS_URL = f"{BASE_URL}/index.php?r=equipos/vistaweb"

USER_AGENT = (
    "PapifutbolPrototipoBot/1.0 "
    "(rediseño visual no oficial; contacto: josemuller11@gmail.com)"
)
REQUEST_TIMEOUT = 20
SLEEP_BETWEEN_REQUESTS = 2  # segundos: ser respetuosos con el servidor

# Colores asignados a equipos (se mantienen entre corridas; si se agrega
# un equipo nuevo, hay que asignarle un color acá).
COLORES_EQUIPOS = {
    '01': '#5F5E5A', '02': '#185FA5', '03': '#993C1D', '04': '#0F6E56',
    '05': '#DC8C28', '06': '#534AB7', '07': '#888780', '08': '#BA7517',
    '09': '#A32D2D', '10': '#5DCAA5', '11': '#7F77DD', '12': '#D4537E',
    '13': '#D85A30', '14': '#0F3C5F', '15': '#85B7EB', '16': '#888780',
    '17': '#E24B4A', '18': '#534AB7', '19': '#27500A', '20': '#993C1D',
    '21': '#BA7517', '22': '#D4537E', '23': '#5F5E5A', '24': '#0F6E56',
}

OUTPUT_PATH = Path(__file__).parent.parent / "data" / "torneo.js"


# ============================================================
# UTILIDADES
# ============================================================

def log(msg, verbose_only=False):
    if verbose_only and not VERBOSE:
        return
    timestamp = datetime.now().strftime("%H:%M:%S")
    print(f"[{timestamp}] {msg}", flush=True)


def fail(msg):
    """Termina con error y mensaje claro. Usado cuando el HTML no tiene la
    estructura esperada (cambió el sitio)."""
    print(f"\n❌ ERROR: {msg}", file=sys.stderr)
    print("\nEsto puede significar que cambió la estructura del sitio oficial.",
          file=sys.stderr)
    print("Revisar el HTML manualmente y ajustar el parser correspondiente.\n",
          file=sys.stderr)
    sys.exit(1)


def fetch(url, retries=3):
    """Descarga una URL con retries y backoff exponencial."""
    headers = {"User-Agent": USER_AGENT}
    last_err = None
    for attempt in range(1, retries + 1):
        try:
            log(f"  GET {url} (intento {attempt})", verbose_only=True)
            r = requests.get(url, headers=headers, timeout=REQUEST_TIMEOUT)
            r.raise_for_status()
            r.encoding = r.apparent_encoding or "utf-8"
            return r.text
        except requests.RequestException as e:
            last_err = e
            if attempt < retries:
                wait = 2 ** attempt
                log(f"  Falló: {e}. Reintentando en {wait}s...")
                time.sleep(wait)
    fail(f"No se pudo descargar {url}: {last_err}")


def clean_text(s):
    """Normaliza espacios en blanco."""
    if s is None:
        return ""
    return re.sub(r"\s+", " ", s).strip()


def parse_team_label(label):
    """Convierte '05 FUNARO' en ('05', 'Funaro'). Devuelve (None, None) si no
    matchea el patrón."""
    label = clean_text(label)
    m = re.match(r"^(\d{2})\s+(.+)$", label)
    if not m:
        return None, None
    num = m.group(1)
    name = m.group(2).strip().title()
    # Casos especiales que .title() rompe
    name = name.replace(" De ", " de ").replace(" La ", " la ")
    return num, name


def parse_int(s, default=0):
    """Convierte texto a int, robusto a guiones y vacíos."""
    s = clean_text(s)
    if not s or s in ("-", "—"):
        return default
    try:
        return int(s)
    except ValueError:
        return default


# ============================================================
# PARSEO DE LA HOME (posiciones, goleadores, fair play, valla, sanciones, fixture)
# ============================================================

def parse_home(html):
    """Extrae todas las estadísticas desde la home."""
    soup = BeautifulSoup(html, "lxml")
    data = {}

    # Las tablas <table> en la home están en este orden:
    # 1. Goleadores generales
    # 2. Fair play general
    # 3. Valla menos vencida general
    # 4. Sanciones
    # 5-6. Posiciones zona 1 y 2 + sus subtablas (goleadores, fair play, valla por zona)
    tables = soup.find_all("table")
    log(f"  Tablas encontradas: {len(tables)}", verbose_only=True)

    if len(tables) < 4:
        fail(f"Se esperaban al menos 4 tablas en la home, hay {len(tables)}")

    data["goleadores"] = parse_table_goleadores(tables[0])
    data["fairplay"] = parse_table_fairplay(tables[1])
    data["valla"] = parse_table_valla(tables[2])
    data["sanciones"] = parse_table_sanciones(tables[3])

    # Posiciones: buscamos tablas que tengan encabezado con PTS/PJ/PG
    posiciones = {"zona1": [], "zona2": []}
    zona_idx = 1
    for t in tables[4:]:
        headers = [clean_text(th.get_text()) for th in t.find_all("th")]
        if "PTS" in headers and "PJ" in headers:
            key = f"zona{zona_idx}"
            posiciones[key] = parse_table_posiciones(t)
            zona_idx += 1
            if zona_idx > 2:
                break

    if not posiciones["zona1"] or not posiciones["zona2"]:
        fail("No se encontraron las dos tablas de posiciones (zona 1 y zona 2)")

    data["posiciones"] = posiciones

    # Fixture: parseamos las secciones de cada fecha
    data["fixture"] = parse_fixture(soup)

    return data


def parse_table_goleadores(table):
    """Tabla con columnas: # | Jugador | Equipo | Goles"""
    goleadores = []
    for tr in table.find("tbody").find_all("tr") if table.find("tbody") else table.find_all("tr")[1:]:
        cells = tr.find_all("td")
        if len(cells) < 4:
            continue
        pos = parse_int(cells[0].get_text())
        nombre = clean_text(cells[1].get_text()).title()
        equipo_label = clean_text(cells[2].get_text())
        equipo_id, _ = parse_team_label(equipo_label)
        goles = parse_int(cells[3].get_text())
        goleadores.append({
            "pos": pos,
            "nombre": nombre,
            "equipo": equipo_id or "",
            "goles": goles,
        })
    log(f"  Goleadores parseados: {len(goleadores)}")
    return goleadores


def parse_table_fairplay(table):
    """Tabla con columnas: # | Equipo | Amarillas | Azules | Rojas | Puntaje"""
    fairplay = []
    for tr in table.find("tbody").find_all("tr") if table.find("tbody") else table.find_all("tr")[1:]:
        cells = tr.find_all("td")
        if len(cells) < 6:
            continue
        equipo_id, _ = parse_team_label(cells[1].get_text())
        if not equipo_id:
            continue
        fairplay.append({
            "pos": parse_int(cells[0].get_text()),
            "equipo": equipo_id,
            "amarillas": parse_int(cells[2].get_text()),
            "azules": parse_int(cells[3].get_text()),
            "rojas": parse_int(cells[4].get_text()),
            "puntos": parse_int(cells[5].get_text()),
        })
    log(f"  Fair play parseado: {len(fairplay)} equipos")
    return fairplay


def parse_table_valla(table):
    """Tabla con columnas: # | Arquero | Equipo | Goles en contra"""
    valla = []
    for tr in table.find("tbody").find_all("tr") if table.find("tbody") else table.find_all("tr")[1:]:
        cells = tr.find_all("td")
        if len(cells) < 4:
            continue
        equipo_id, _ = parse_team_label(cells[2].get_text())
        if not equipo_id:
            continue
        valla.append({
            "pos": parse_int(cells[0].get_text()),
            "arquero": clean_text(cells[1].get_text()).title(),
            "equipo": equipo_id,
            "gc": parse_int(cells[3].get_text()),
        })
    log(f"  Valla parseada: {len(valla)} arqueros")
    return valla


def parse_table_sanciones(table):
    """Tabla con columnas: # | Jugador | Equipo | Amarillas | Azules | Rojas | Fechas | Cumplidas"""
    sanciones = []
    for tr in table.find("tbody").find_all("tr") if table.find("tbody") else table.find_all("tr")[1:]:
        cells = tr.find_all("td")
        if len(cells) < 7:
            continue
        equipo_id, _ = parse_team_label(cells[2].get_text())
        if not equipo_id:
            continue
        sanciones.append({
            "jugador": clean_text(cells[1].get_text()).title(),
            "equipo": equipo_id,
            "amarillas": parse_int(cells[3].get_text()),
            "azules": parse_int(cells[4].get_text()),
            "rojas": parse_int(cells[5].get_text()),
            "fechas": parse_int(cells[6].get_text()),
        })
    log(f"  Sanciones parseadas: {len(sanciones)} jugadores")
    return sanciones


def parse_table_posiciones(table):
    """Tabla con columnas: # | Equipo | PTS | PJ | PG | PE | PP | GF | GC | FP"""
    posiciones = []
    for tr in table.find("tbody").find_all("tr") if table.find("tbody") else table.find_all("tr")[1:]:
        cells = tr.find_all("td")
        if len(cells) < 10:
            continue
        equipo_id, _ = parse_team_label(cells[1].get_text())
        if not equipo_id:
            continue
        posiciones.append({
            "id": equipo_id,
            "pts": parse_int(cells[2].get_text()),
            "pj": parse_int(cells[3].get_text()),
            "pg": parse_int(cells[4].get_text()),
            "pe": parse_int(cells[5].get_text()),
            "pp": parse_int(cells[6].get_text()),
            "gf": parse_int(cells[7].get_text()),
            "gc": parse_int(cells[8].get_text()),
            "fp": parse_int(cells[9].get_text()),
        })
    return posiciones


def parse_fixture(soup):
    """Extrae el fixture completo. La estructura del sitio agrupa por fecha,
    luego zona, luego turno, luego cancha. Vamos a recorrer todo el texto de
    forma defensiva.

    El patrón observado en el HTML es:
      - Cabecera de fecha (ej: 'FECHA 5 | 1ra Fase' o título con fecha)
      - Bloques de partidos con: 'Cancha X', equipo local, resultado/guion, equipo visitante, zona
    """
    fixture = []

    # Estrategia: buscar el texto plano y partir por marcadores de fecha
    text = soup.get_text("\n", strip=True)

    # Identificar bloques de fecha con su fecha (formato DD-MM-YYYY)
    # Patrón: "ZONA ZONA X\n\nDD-MM-YYYY" indica el comienzo de partidos de una fecha
    # Aprovechamos que en el fixture aparecen los headers 'FECHA N'
    fecha_blocks = re.split(r"\n(?=\d{2}-\d{2}-\d{4}\n)", text)

    fechas_dict = {}  # numero_fecha -> {fechaTexto, zona1: [], zona2: []}

    # Para detectar el número de fecha buscamos las listas de tabs "FECHA 1 ... FECHA 11"
    # y luego cada bloque ZONA contiene una fecha en formato DD-MM-YYYY que es la que
    # nos dice cuándo se juega.

    # Más simple: buscar todos los bloques con patrón "ZONA ZONA N\n\nDD-MM-YYYY\n\n<partidos>"
    zona_pattern = re.compile(
        r"ZONA ZONA (\d)\n+(\d{2}-\d{2}-\d{4})\n+(.+?)(?=\n+ZONA ZONA \d|\n+\* FASE|\n+!\[|\Z)",
        re.DOTALL
    )

    for m in zona_pattern.finditer(text):
        zona_num = int(m.group(1))
        fecha_str = m.group(2)
        bloque_partidos = m.group(3)

        # Clave: fecha en formato DD-MM-YYYY (la usamos como agrupador)
        # Misma fecha = misma jornada
        if fecha_str not in fechas_dict:
            fechas_dict[fecha_str] = {
                "fechaTexto": fecha_str.replace("-", "/"),
                "zona1": [],
                "zona2": [],
            }

        # Parsear los partidos dentro del bloque
        partidos = parse_partidos_bloque(bloque_partidos)
        clave_zona = f"zona{zona_num}"
        fechas_dict[fecha_str][clave_zona].extend(partidos)

    # Ordenar por fecha cronológica y numerar
    fechas_ordenadas = sorted(
        fechas_dict.items(),
        key=lambda kv: datetime.strptime(kv[0], "%d-%m-%Y")
    )

    today = datetime.now().date()
    for idx, (fecha_str, contenido) in enumerate(fechas_ordenadas, start=1):
        fecha_dt = datetime.strptime(fecha_str, "%d-%m-%Y").date()
        # Estado: 'jugada' si al menos un partido tiene resultado, 'pendiente' si no
        partidos_todos = contenido["zona1"] + contenido["zona2"]
        tiene_resultados = any("golesL" in p for p in partidos_todos)
        estado = "jugada" if tiene_resultados else "pendiente"

        fixture.append({
            "fecha": idx,
            "fechaTexto": contenido["fechaTexto"],
            "estado": estado,
            "zona1": contenido["zona1"],
            "zona2": contenido["zona2"],
        })

    log(f"  Fixture parseado: {len(fixture)} fechas")
    return fixture


def parse_partidos_bloque(texto):
    """Parsea un bloque de texto con partidos del sitio oficial.

    El sitio usa dos formatos según si el partido fue jugado o no:

    Jugado (3 líneas + "Ficha"):
        01 MOBRICI
        1 - 3
        12 MACIEL
        Ficha

    Pendiente (1 línea inline o 3 líneas con guion):
        02 VENTRICELI - 03 MEYER
        — o —
        02 VENTRICELI
        -
        03 MEYER

    No hay info de cancha/turno en el texto del sitio.
    """
    partidos = []
    # Descartar líneas de ruido conocido
    RUIDO = {"ficha", "ver ficha", "resultado"}
    lines = [
        l.strip() for l in texto.strip().split("\n")
        if l.strip() and l.strip().lower() not in RUIDO
    ]

    i = 0
    while i < len(lines):
        line = lines[i]

        # --- Formato inline pendiente: "NN EQUIPO - NN EQUIPO" ---
        # Ejemplo: "02 VENTRICELI - 03 MEYER"
        # Distinguimos de un score "1 - 3" porque empieza con dos dígitos + espacio + letra
        inline = re.match(
            r"^(\d{2}\s+[A-ZÁÉÍÓÚÑ].+?)\s+-\s+(\d{2}\s+[A-ZÁÉÍÓÚÑ].+)$",
            line
        )
        if inline:
            local_id, _ = parse_team_label(inline.group(1))
            visit_id, _ = parse_team_label(inline.group(2))
            if local_id and visit_id:
                partidos.append({"local": local_id, "visitante": visit_id})
                i += 1
                continue

        # --- Formato multilínea: local / score-o-guion / visitante ---
        local_id, _ = parse_team_label(line)
        if not local_id or i + 2 >= len(lines):
            i += 1
            continue

        score_raw = clean_text(lines[i + 1])
        visit_id, _ = parse_team_label(lines[i + 2])
        if not visit_id:
            i += 1
            continue

        partido = {"local": local_id, "visitante": visit_id}

        score_match = re.match(r"^(\d+)\s*-\s*(\d+)$", score_raw)
        if score_match:
            partido["golesL"] = int(score_match.group(1))
            partido["golesV"] = int(score_match.group(2))
        # Si score_raw == "-" es pendiente, no agregamos goles

        partidos.append(partido)
        i += 3

    return partidos


# ============================================================
# PARSEO DE EQUIPOS (planteles)
# ============================================================

def parse_equipos(html):
    """Extrae los planteles de los 24 equipos.

    El HTML tiene una estructura tipo: cada equipo es un bloque con su
    encabezado 'NN NOMBRE' seguido de la lista de jugadores.
    """
    soup = BeautifulSoup(html, "lxml")
    text = soup.get_text("\n", strip=True)

    # Patrón: "NN APELLIDO" seguido de líneas con nombres
    # Cortar por bloques que empiecen con "NN " (donde NN es 01-24)
    bloques = re.split(r"\n(?=\d{2}\s+[A-ZÁÉÍÓÚÑa-záéíóúñ])", text)

    equipos = {}
    planteles = {}

    for bloque in bloques:
        lines = [l.strip() for l in bloque.strip().split("\n") if l.strip()]
        if not lines:
            continue

        # Primera línea: "NN NOMBRE_EQUIPO"
        equipo_id, equipo_nombre = parse_team_label(lines[0])
        if not equipo_id or not equipo_id.isdigit():
            continue
        # Filtrar IDs fuera del rango esperado
        if not (1 <= int(equipo_id) <= 30):
            continue

        # Líneas siguientes son los jugadores, hasta el próximo encabezado o
        # hasta encontrar texto que no parezca un nombre de persona
        jugadores = []
        for line in lines[1:]:
            # Cortar si encontramos otro encabezado de equipo
            if re.match(r"^\d{2}\s+", line):
                break
            # Cortar si la línea parece menú/footer
            if line.upper() in ("INICIO", "REGLAMENTO", "NOTICIAS",
                                 "ESTADÍSTICAS", "INSCRIPCIÓN", "EQUIPOS",
                                 "PAPIFÚTBOL MORÓN"):
                break
            # Filtrar líneas demasiado cortas o que parecen ruido
            if len(line) < 3 or len(line) > 80:
                continue
            # Filtrar líneas que tengan caracteres extraños
            if re.search(r"https?://|@|\.com|powered by", line, re.I):
                continue
            jugadores.append(line.title())

        if jugadores:
            equipos[equipo_id] = equipo_nombre
            planteles[equipo_id] = jugadores

    log(f"  Equipos parseados: {len(equipos)}")
    log(f"  Jugadores totales: {sum(len(j) for j in planteles.values())}")

    if len(equipos) < 20:
        fail(f"Se esperaban ~24 equipos, se parsearon {len(equipos)}")

    return equipos, planteles


# ============================================================
# DETERMINAR ZONA DE CADA EQUIPO (desde posiciones)
# ============================================================

def asignar_zonas(equipos_dict, posiciones):
    """Marca cada equipo con su zona (1 o 2) usando la tabla de posiciones."""
    zonas = {}
    for fila in posiciones["zona1"]:
        zonas[fila["id"]] = 1
    for fila in posiciones["zona2"]:
        zonas[fila["id"]] = 2

    equipos_con_zona = {}
    for eid, nombre in equipos_dict.items():
        equipos_con_zona[eid] = {
            "nombre": nombre,
            "zona": zonas.get(eid, 0),  # 0 = no se pudo determinar
        }
    return equipos_con_zona


# ============================================================
# GENERACIÓN DEL ARCHIVO torneo.js
# ============================================================

def js_string(s):
    """Escapa una string para usar como literal JavaScript."""
    return "'" + str(s).replace("\\", "\\\\").replace("'", "\\'") + "'"


def generar_js(equipos, planteles, posiciones, goleadores, fairplay, valla,
               sanciones, fixture):
    """Genera el contenido completo de data/torneo.js."""
    ts = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    lines = [
        "// ============================================================",
        "// DATOS DEL TORNEO PAPI FÚTBOL SAN JOSÉ — Generado automáticamente",
        f"// Última actualización: {ts}",
        "// Fuente: papifutbolsanjosemoron.com.ar",
        "// NO EDITAR A MANO — este archivo lo regenera scraper/scrape.py",
        "// ============================================================",
        "",
        "const COLORES_EQUIPOS = " + json.dumps(COLORES_EQUIPOS, indent=2, ensure_ascii=False) + ";",
        "",
        "const EQUIPOS = " + json.dumps(equipos, indent=2, ensure_ascii=False) + ";",
        "",
        "const PLANTELES = " + json.dumps(planteles, indent=2, ensure_ascii=False) + ";",
        "",
        "const POSICIONES = " + json.dumps(posiciones, indent=2, ensure_ascii=False) + ";",
        "",
        "const FIXTURE = " + json.dumps(fixture, indent=2, ensure_ascii=False) + ";",
        "",
        "const GOLEADORES = " + json.dumps(goleadores, indent=2, ensure_ascii=False) + ";",
        "",
        "const FAIRPLAY = " + json.dumps(fairplay, indent=2, ensure_ascii=False) + ";",
        "",
        "const VALLA = " + json.dumps(valla, indent=2, ensure_ascii=False) + ";",
        "",
        "const SANCIONES = " + json.dumps(sanciones, indent=2, ensure_ascii=False) + ";",
        "",
        # Funciones helper (estables, no cambian con los datos)
        "function getEquipoLabel(id) {",
        "  if (!id) return '—';",
        "  const e = EQUIPOS[id];",
        "  return e ? `${id} ${e.nombre}` : id;",
        "}",
        "",
        "function getEquipoNombre(id) {",
        "  return EQUIPOS[id]?.nombre || id;",
        "}",
        "",
        "function getEquipoColor(id) {",
        "  return COLORES_EQUIPOS[id] || '#888780';",
        "}",
        "",
        "function teamAvatar(id, size) {",
        "  size = size || 32;",
        "  const fontSize = Math.round(size * 0.34);",
        '  return `<span class="team-avatar" style="background:${getEquipoColor(id)}; width:${size}px; height:${size}px; font-size:${fontSize}px;">${id}</span>`;',
        "}",
        "",
        "function getStatsJugador(nombre, equipoId) {",
        "  const nombreUpper = nombre.toUpperCase();",
        "  const golesData = GOLEADORES.find(g =>",
        "    g.nombre.toUpperCase() === nombreUpper && g.equipo === equipoId);",
        "  const sancionData = SANCIONES.find(s =>",
        "    s.jugador.toUpperCase() === nombreUpper && s.equipo === equipoId);",
        "  const vallaData = VALLA.find(v =>",
        "    v.arquero.toUpperCase() === nombreUpper && v.equipo === equipoId);",
        "  return {",
        "    goles: golesData ? golesData.goles : 0,",
        "    amarillas: sancionData ? sancionData.amarillas : 0,",
        "    azules: sancionData ? sancionData.azules : 0,",
        "    rojas: sancionData ? sancionData.rojas : 0,",
        "    esArquero: !!vallaData,",
        "    golesRecibidos: vallaData ? vallaData.gc : null",
        "  };",
        "}",
        "",
        "const STATS_GLOBALES = (function() {",
        "  let totalGoles = 0;",
        "  let partidosJugados = 0;",
        "  FIXTURE.forEach(f => {",
        "    if (f.estado === 'jugada') {",
        "      [...f.zona1, ...f.zona2].forEach(p => {",
        "        partidosJugados++;",
        "        totalGoles += (p.golesL || 0) + (p.golesV || 0);",
        "      });",
        "    }",
        "  });",
        "  const fechasJugadas = FIXTURE.filter(f => f.estado === 'jugada').length;",
        "  const proximaFecha = FIXTURE.find(f => f.estado === 'pendiente');",
        "  return {",
        "    equipos: Object.keys(EQUIPOS).length,",
        "    partidosJugados,",
        "    totalGoles,",
        "    fechaActual: fechasJugadas,",
        "    totalFechas: FIXTURE.length,",
        "    proximaFecha: proximaFecha ? proximaFecha.fecha : null,",
        "    proximaFechaTexto: proximaFecha ? proximaFecha.fechaTexto : '',",
        "    ultimaFecha: fechasJugadas",
        "  };",
        "})();",
        "",
    ]

    return "\n".join(lines)


# ============================================================
# MAIN
# ============================================================

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--dry-run", action="store_true",
                        help="No escribir archivos, solo mostrar qué se haría")
    parser.add_argument("--verbose", action="store_true", help="Output detallado")
    args = parser.parse_args()

    global VERBOSE
    VERBOSE = args.verbose

    log("🏟️  Scraping de Papi Fútbol San José Morón")
    log(f"   User-Agent: {USER_AGENT}")
    log("")

    # 1. Descargar las dos páginas
    log("📥 Descargando home...")
    home_html = fetch(HOME_URL)
    time.sleep(SLEEP_BETWEEN_REQUESTS)

    log("📥 Descargando equipos...")
    equipos_html = fetch(EQUIPOS_URL)

    log("")

    # 2. Parsear
    log("🔍 Parseando home (estadísticas y fixture)...")
    home_data = parse_home(home_html)

    log("")
    log("🔍 Parseando equipos (planteles)...")
    equipos_dict, planteles = parse_equipos(equipos_html)

    # 3. Combinar info de zonas
    equipos_completo = asignar_zonas(equipos_dict, home_data["posiciones"])

    log("")
    log("📝 Generando data/torneo.js...")

    contenido = generar_js(
        equipos=equipos_completo,
        planteles=planteles,
        posiciones=home_data["posiciones"],
        goleadores=home_data["goleadores"],
        fairplay=home_data["fairplay"],
        valla=home_data["valla"],
        sanciones=home_data["sanciones"],
        fixture=home_data["fixture"],
    )

    if args.dry_run:
        log("⚠️  DRY RUN: no se escribió ningún archivo")
        log(f"   Hubiera escrito {len(contenido)} caracteres en {OUTPUT_PATH}")
    else:
        OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
        OUTPUT_PATH.write_text(contenido, encoding="utf-8")
        log(f"✅ Escrito: {OUTPUT_PATH} ({len(contenido):,} caracteres)")

    log("")
    log("🎉 Listo")


if __name__ == "__main__":
    VERBOSE = False
    main()
