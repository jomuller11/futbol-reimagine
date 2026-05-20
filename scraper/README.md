# Scraper · Papi Fútbol San José Morón

Script que descarga los datos del sitio oficial y regenera `../data/torneo.js`
con la información que consume el prototipo.

## Uso local (correr a mano)

```bash
# Instalar dependencias (una sola vez)
pip install -r requirements.txt

# Ejecutar
python3 scrape.py

# Sin escribir archivos (verificar que parsea bien)
python3 scrape.py --dry-run

# Con output detallado
python3 scrape.py --verbose
```

Después de correr el script, abrí `../index.html` y verás los datos actualizados.

## Uso automatizado (GitHub Actions)

El scraper está configurado para correrse automáticamente cada 6 horas via
GitHub Actions. Mirá `.github/workflows/update.yml` en la raíz del repo.

### Setup completo: prototipo público y auto-actualizado

Para tener todo el sistema funcionando (sitio público en una URL +
actualización automática), seguí estos pasos una sola vez:

#### 1. Crear el repositorio en GitHub

```bash
# Desde la carpeta del prototipo
git init
git add .
git commit -m "Prototipo inicial"
git branch -M main

# Crear el repo en github.com y reemplazar la URL:
git remote add origin https://github.com/<tu_usuario>/papifutbol-moron.git
git push -u origin main
```

#### 2. Habilitar GitHub Pages

En el repo:
- **Settings** → **Pages**
- En "Source", elegí **Deploy from a branch**
- Branch: **main**, carpeta: **/ (root)**
- Click **Save**

A los 2 minutos vas a tener el prototipo público en:
`https://<tu_usuario>.github.io/papifutbol-moron/`

#### 3. Habilitar GitHub Actions

- En el repo: **Settings** → **Actions** → **General**
- En "Workflow permissions" elegí **Read and write permissions** (esto permite
  que el bot haga commit cuando hay cambios en los datos).
- Click **Save**

#### 4. Probar la actualización manual

- Andá a la pestaña **Actions** del repo
- Click en **Actualizar datos del torneo**
- Click en **Run workflow** → **Run workflow**

Si todo está OK, vas a ver un commit nuevo en el repo con los datos
actualizados.

### Frecuencia de actualización

Por defecto corre cada 6 horas. Para cambiar la frecuencia, editá el `cron` en
`.github/workflows/update.yml`. Sintaxis:

```yaml
- cron: '0 */6 * * *'    # cada 6 horas
- cron: '0 */3 * * *'    # cada 3 horas
- cron: '*/30 * * * *'   # cada 30 minutos (poco recomendable)
- cron: '0 22 * * 6'     # solo sábados a las 22:00 UTC (después de fecha)
```

## ¿Qué pasa si cambia el sitio oficial?

El scraper está diseñado para **fallar ruidosamente**: si encuentra una
estructura HTML distinta a la esperada, termina con un error claro en lugar de
generar datos rotos. En ese caso:

1. Se va a ver un fallo en la pestaña Actions de GitHub (recibirás email).
2. Hay que mirar el HTML actualizado del sitio y ajustar las funciones de
   parseo correspondientes (`parse_table_*`, `parse_fixture`, etc.).
3. Mientras tanto, el prototipo sigue mostrando los últimos datos válidos
   (los que se commiteraron la última vez que funcionó).

## Ser respetuosos con el sitio

El scraper:
- Se identifica claramente con un User-Agent transparente
- Espera 2 segundos entre requests
- Solo descarga 2 páginas por ejecución
- Corre a lo sumo 4 veces por día (cada 6 horas)

Eso son **8 requests por día** en total — totalmente razonable para cualquier
sitio público. Aun así, **es buena práctica avisar al admin del sitio** que
estamos usando esos datos, sobre todo si después de la presentación esto queda
funcionando de forma permanente.

## Estructura del archivo generado

`data/torneo.js` se regenera completo cada vez que corre el scraper. Contiene:

- `EQUIPOS`: dict con `{id: {nombre, zona}}`
- `PLANTELES`: dict con `{id: [jugadores]}`
- `POSICIONES`: `{zona1: [...], zona2: [...]}`
- `FIXTURE`: array de fechas con sus partidos
- `GOLEADORES`, `FAIRPLAY`, `VALLA`, `SANCIONES`: arrays con los rankings
- `COLORES_EQUIPOS`: paleta asignada por equipo (estática, definida en el script)
- Funciones helper: `getStatsJugador()`, `teamAvatar()`, etc.
- `STATS_GLOBALES`: stats agregadas calculadas en runtime

## Limitaciones conocidas

- El sitio no publica goleadores ni tarjetas por partido, solo totales del
  torneo. La ficha de partido muestra esos totales (no del partido puntual).
- Los colores de cada equipo se asignaron manualmente en el script. Si se
  agrega un equipo 25, hay que asignarle un color en `COLORES_EQUIPOS` o
  usará el gris por defecto.
- Si la estructura HTML del sitio oficial cambia significativamente, hay que
  actualizar el scraper.
