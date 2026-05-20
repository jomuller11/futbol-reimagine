# Papi Fútbol San José Morón · Prototipo

Propuesta visual de rediseño de la web del torneo del Colegio Marista San José
Morón, con **actualización automática** de datos desde el sitio oficial.

## Arquitectura

```
┌──────────────────────┐         ┌──────────────────┐
│  Sitio oficial       │         │  GitHub Actions  │
│  (papifutbol...)     │ ◄─────  │  cada 6hs        │
└──────────────────────┘         └────────┬─────────┘
                                          │
                                          ▼
                                 ┌──────────────────┐
                                 │  scraper/scrape.py │
                                 │  parsea HTML       │
                                 └────────┬─────────┘
                                          │
                                          ▼
                                 ┌──────────────────┐
                                 │  data/torneo.js  │ ← regenerado y commiteado
                                 └────────┬─────────┘
                                          │
                                          ▼
                                 ┌──────────────────┐
                                 │  Prototipo HTML  │
                                 │  (GitHub Pages)  │
                                 └──────────────────┘
```

## Páginas del prototipo

| Archivo | Descripción |
|---|---|
| `index.html` | Home con próxima fecha, última fecha, posiciones, goleadores, fair play, valla |
| `fixture.html` | Las 11 fechas con sus partidos (cancha + turno reales) |
| `equipos.html` | Listado de los 24 equipos |
| `equipo.html?id=05` | Detalle de un equipo: plantel, stats, fixture |
| `estadisticas.html` | 5 paneles: posiciones, goleadores, fair play, valla, sanciones |
| `ficha.html?fecha=5&local=05` | Detalle de un partido específico |

## Datos

Todos los datos vienen de **`data/torneo.js`**, generado automáticamente por
el scraper desde el sitio oficial. Ver `scraper/README.md` para detalles.

**Lo que se actualiza solo:**
- Plantel de cada equipo (288 jugadores)
- Resultados de cada fecha
- Tabla de posiciones, goleadores, fair play, valla, sanciones
- Fixture completo (11 fechas) con cancha y turno

**Lo que es estático** (definido en el scraper):
- Paleta de colores de cada equipo (`COLORES_EQUIPOS` en `scrape.py`)

## Setup rápido

### Sólo ver el prototipo (sin actualización automática)

1. Descomprimí el ZIP.
2. Abrí `index.html` en cualquier navegador.

Listo, vas a ver los datos del torneo al momento del último scraping.

### Setup completo con auto-actualización

Ver instrucciones detalladas en `scraper/README.md`. Resumen:

1. Crear repo en GitHub con todo el contenido del prototipo
2. Settings → Pages: activar GitHub Pages desde main
3. Settings → Actions: dar permiso de write
4. Listo — el sitio queda público y se actualiza cada 6hs

## Identidad visual

Paleta extraída del logo del Colegio Marista San José:

```css
--primary: #0F3C5F   /* Azul marino institucional */
--accent:  #DC8C28   /* Dorado del logo */
```

Centralizadas en `:root` al inicio de `styles.css`. Cambiar esas variables
actualiza toda la web.

## Estructura del proyecto

```
.
├── index.html              # Home
├── fixture.html            # Calendario completo
├── equipos.html            # Listado de equipos
├── equipo.html             # Detalle de equipo (?id=NN)
├── ficha.html              # Detalle de partido (?fecha=N&local=NN)
├── estadisticas.html       # Estadísticas completas
├── styles.css              # Estilos compartidos
├── logo.png                # Logo del Colegio Marista
├── data/
│   └── torneo.js           # Datos del torneo (auto-generado)
├── scraper/
│   ├── scrape.py           # Scraper principal
│   ├── requirements.txt    # Dependencias Python
│   └── README.md           # Doc del scraper
└── .github/workflows/
    └── update.yml          # GitHub Action para actualizar
```

## Limitación de datos

El sitio oficial publica los goleadores y tarjetas como **totales del torneo**,
no por partido individual. Por eso la ficha de partido muestra los planteles
con sus stats acumuladas (no del partido puntual). Si en el futuro el sitio
empieza a publicar el detalle por partido, basta con extender el scraper para
incluir ese dato.

## Notas técnicas

- HTML + CSS + JavaScript vainilla, sin dependencias en runtime
- Diseño 100% responsive
- El scraper es respetuoso: 2s entre requests, 4 corridas por día, User-Agent
  identificable
