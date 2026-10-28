# Archivo histórico de torneos

Carpeta donde viven los snapshots inmutables de los torneos cerrados.
El objetivo es que el histórico sobreviva a los re-arranques de cada temporada
(cuando el papi reasigna IDs de equipos y empieza todo desde cero).

## Layout de datos

```
data/
├── torneo.js          # torneo activo, regenerado por scraper 3x/día (lo que lee el sitio)
├── torneo.json        # mismos datos del torneo activo en JSON crudo (para scripts)
├── torneo-meta.json   # qué torneo está activo + lista de cerrados
├── torneos/
│   ├── README.md      # este archivo
│   ├── 2026.js        # snapshot congelado del torneo 2026 (al cerrar)
│   ├── 2026.json      # mismo snapshot en JSON crudo
│   ├── 2027.js        # snapshot congelado del torneo 2027 (al cerrar)
│   └── ...
├── registro-equipos.json      # (Fase 2) identidades canonicas de equipos all-time
└── registro-jugadores.json    # (Fase 2) identidades canonicas de jugadores all-time
```

## Flujo

### Durante el torneo

El workflow `Actualizar datos del torneo` corre 3x/día y regenera
`data/torneo.js` + `data/torneo.json`. Los HTML del sitio leen `torneo.js`
como siempre, no cambia nada visible.

### Al cerrar el torneo

Cuando se termine la última fecha de la Fase Final y confirmemos campeones,
corremos a mano:

```bash
python3 scraper/snapshot.py
```

Esto:

1. Copia `data/torneo.js` → `data/torneos/{slug}.js`
2. Copia `data/torneo.json` → `data/torneos/{slug}.json`
3. Actualiza `data/torneo-meta.json`: mueve el torneo activo a `cerrados`
   y deja `activo` en `null` (listo para inicializar el próximo).

A partir de ese momento el snapshot queda inmutable. El scraper no lo toca
porque ya no apunta a esa temporada.

### Al iniciar el próximo torneo (marzo del año siguiente)

Editar `data/torneo-meta.json` agregando un bloque `activo` con el año nuevo:

```json
{
  "activo": {
    "año": 2027,
    "slug": "2027",
    "nombre": "Torneo Papi Fútbol San José Morón 2027",
    "estado": "en-curso",
    "inicio": "2027-03-XX",
    "cierre_previsto": "2027-11-XX"
  },
  "cerrados": [ { ... 2026 ... } ]
}
```

El scraper arranca a escribir el nuevo torneo en `torneo.js`/`torneo.json`.

## Próximas fases (TBD)

- **Fase 2** — Generar `registro-equipos.json` y `registro-jugadores.json`
  con identidades canonicas (slug por nombre), reglas de merge/split para
  cuando el scraper confunde nombres parecidos.

- **Fase 3** — Selector de temporada en el header del sitio + pestaña
  "Historial" con palmarés, goleadores all-time, títulos por equipo,
  head-to-head y rachas.
