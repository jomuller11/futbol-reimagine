#!/usr/bin/env python3
"""
Congela el torneo activo como snapshot inmutable en data/torneos/{slug}.*.

Uso:
    python3 scraper/snapshot.py                # congela el torneo activo
    python3 scraper/snapshot.py --dry-run      # muestra qué se haría sin tocar nada
    python3 scraper/snapshot.py --force        # sobreescribe snapshot existente

Lo que hace:
    1. Lee data/torneo-meta.json para saber qué torneo congelar.
    2. Copia data/torneo.js   → data/torneos/{slug}.js
    3. Copia data/torneo.json → data/torneos/{slug}.json  (si existe)
    4. Actualiza data/torneo-meta.json: mueve el torneo activo a 'cerrados'
       y deja 'activo' en null (listo para inicializar el próximo torneo).

Esta herramienta se ejecuta a mano cuando termina el torneo. NO corre
desde ningún workflow automático. Es un paso explícito y deliberado:
una vez que el snapshot queda commiteado, el torneo pasa a ser inmutable.

Dejar el torneo activo en null después de congelar es intencional: el
scraper (scrape.py) detecta ese estado y pausa sus runs hasta que un
humano inicialice el próximo torneo editando torneo-meta.json.
"""
import argparse
import json
import shutil
import sys
from datetime import datetime, timezone
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
DATA_DIR = REPO_ROOT / "data"
META_PATH = DATA_DIR / "torneo-meta.json"
TORNEO_JS = DATA_DIR / "torneo.js"
TORNEO_JSON = DATA_DIR / "torneo.json"
ARCHIVO_DIR = DATA_DIR / "torneos"


def log(msg):
    print(f"[snapshot] {msg}", flush=True)


def main():
    parser = argparse.ArgumentParser(
        description="Congela el torneo activo como snapshot inmutable",
    )
    parser.add_argument(
        "--dry-run", action="store_true",
        help="Mostrar qué se haría sin tocar archivos",
    )
    parser.add_argument(
        "--force", action="store_true",
        help="Sobreescribir snapshot existente si ya hay uno con ese slug",
    )
    args = parser.parse_args()

    # 1. Leer meta
    if not META_PATH.exists():
        log(f"❌ No existe {META_PATH}. Nada que congelar.")
        return 1
    meta = json.loads(META_PATH.read_text(encoding="utf-8"))
    activo = meta.get("activo")
    if not activo:
        log("❌ No hay torneo activo en el meta. Nada que congelar.")
        return 1

    slug = activo.get("slug")
    año = activo.get("año")
    if not slug:
        log(f"❌ El torneo activo no tiene 'slug' en el meta: {activo}")
        return 1

    # 2. Verificar que los datos del torneo activo existan
    if not TORNEO_JS.exists():
        log(f"❌ No existe {TORNEO_JS}. Correr primero el scraper.")
        return 1

    # 3. Verificar que no haya ya un snapshot con ese slug
    dest_js = ARCHIVO_DIR / f"{slug}.js"
    dest_json = ARCHIVO_DIR / f"{slug}.json"
    if dest_js.exists() and not args.force:
        log(f"❌ Ya existe {dest_js.relative_to(REPO_ROOT)}.")
        log(f"   Usá --force para sobreescribirlo (perdiendo el snapshot anterior).")
        return 1

    # 4. Preview
    log(f"Congelando torneo {slug} (año {año})")
    log(f"  {TORNEO_JS.relative_to(REPO_ROOT)} → {dest_js.relative_to(REPO_ROOT)}")
    if TORNEO_JSON.exists():
        log(f"  {TORNEO_JSON.relative_to(REPO_ROOT)} → {dest_json.relative_to(REPO_ROOT)}")
    else:
        log(f"  ⚠️  No existe {TORNEO_JSON.relative_to(REPO_ROOT)}.")
        log(f"     Se copia solo el .js. Correr scrape.py actualizado primero")
        log(f"     para también tener el .json congelado.")

    if args.dry_run:
        log("DRY RUN: no se escribió nada.")
        return 0

    # 5. Copiar los archivos
    ARCHIVO_DIR.mkdir(parents=True, exist_ok=True)
    shutil.copy2(TORNEO_JS, dest_js)
    if TORNEO_JSON.exists():
        shutil.copy2(TORNEO_JSON, dest_json)

    # 6. Actualizar meta: mover a cerrados
    ahora = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    cerrado = dict(activo)
    cerrado["estado"] = "finalizado"
    cerrado["cerrado_el"] = ahora
    cerrado["archivo_js"] = f"torneos/{slug}.js"
    if TORNEO_JSON.exists():
        cerrado["archivo_json"] = f"torneos/{slug}.json"

    meta.setdefault("cerrados", []).append(cerrado)
    meta["activo"] = None

    META_PATH.write_text(
        json.dumps(meta, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )

    log(f"✅ Snapshot creado y meta actualizado.")
    log(f"")
    log(f"Próximo paso (cuando quieras iniciar el torneo siguiente):")
    log(f"  Editá {META_PATH.relative_to(REPO_ROOT)} y agregá un bloque")
    log(f"  'activo' con año/slug/fechas del nuevo torneo. El scraper va")
    log(f"  a arrancar a escribir los datos del nuevo torneo en torneo.js.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
