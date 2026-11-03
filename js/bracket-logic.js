// ============================================================
// bracket-logic.js — Lógica compartida del bracket de Copa Final
//
// Fuente única de verdad para los cruces de Fase 3 (Copa de Oro / Plata /
// Bronce), su resolución y los overrides por penales. La usan:
//   - bracket.html (vista completa de las llaves)
//   - index.html   (resumen de la Copa Final en la home)
//
// Requiere data/torneo.js y data/penales.js cargados ANTES de este archivo.
// ============================================================

// -------- Reglas de clasificación de Fase 2 → Copa --------
// Por cada zona de Fase 2 (A/B/C), qué copa recibe a cada puesto (1°-8°).
const REGLAS_COPA_FASE2 = {
  A: ['oro','oro','oro','oro','oro','plata','plata','bronce'],
  B: ['oro','oro','plata','plata','plata','plata','bronce','bronce'],
  C: ['oro','plata','plata','bronce','bronce','bronce','bronce','bronce']
};

// -------- Cruces oficiales de cuartos de final --------
// Fijados por la organización del torneo, no derivados de los seeds. Fuente:
// papifutbolsanjosemoron.com.ar (fixture 4tos de final publicado).
const CRUCES_POR_COPA = {
  oro: [
    { id: 'QF1', localId: '05', visitId: '12' },  // FUNARO vs MACIEL
    { id: 'QF2', localId: '20', visitId: '24' },  // MIGUEL vs FENNER
    { id: 'QF3', localId: '02', visitId: '04' },  // VENTRICELI vs DA COSTA
    { id: 'QF4', localId: '21', visitId: '16' }   // PINTO vs VISCONTI
  ],
  plata: [
    { id: 'QF1', localId: '10', visitId: '11' },  // AHUMADA vs ELIZALDE
    { id: 'QF2', localId: '17', visitId: '03' },  // CASTRO vs MEYER
    { id: 'QF3', localId: '08', visitId: '23' },  // IRIBARREN vs RESICO
    { id: 'QF4', localId: '14', visitId: '18' }   // TORRES vs GOMEZ
  ],
  bronce: [
    { id: 'QF1', localId: '06', visitId: '09' },  // ORTIZ vs ALIANO
    { id: 'QF2', localId: '15', visitId: '13' },  // RUIZ DIAZ vs PISTILLI
    { id: 'QF3', localId: '19', visitId: '01' },  // LAGUNA vs MOBRICI
    { id: 'QF4', localId: '07', visitId: '22' }   // DEL VALLE vs RIVAS
  ]
};

// Semis: SFG1 = ganadores de QF1/QF2, SFG2 = ganadores de QF3/QF4
//        SFP1 = perdedores de QF1/QF2, SFP2 = perdedores de QF3/QF4
const CRUCES_SEMIS = [
  { id: 'SFG1', localFrom: { partido: 'QF1', tipo: 'G' }, visitFrom: { partido: 'QF2', tipo: 'G' }, rama: 'ganadores' },
  { id: 'SFG2', localFrom: { partido: 'QF3', tipo: 'G' }, visitFrom: { partido: 'QF4', tipo: 'G' }, rama: 'ganadores' },
  { id: 'SFP1', localFrom: { partido: 'QF1', tipo: 'P' }, visitFrom: { partido: 'QF2', tipo: 'P' }, rama: 'perdedores' },
  { id: 'SFP2', localFrom: { partido: 'QF3', tipo: 'P' }, visitFrom: { partido: 'QF4', tipo: 'P' }, rama: 'perdedores' }
];

// Finales de puesto (partido único)
const CRUCES_FINALES = [
  { id: 'F12', puesto: '1°/2°', localFrom: { partido: 'SFG1', tipo: 'G' }, visitFrom: { partido: 'SFG2', tipo: 'G' }, rama: 'ganadores', puestoClass: 'puesto-1' },
  { id: 'F34', puesto: '3°/4°', localFrom: { partido: 'SFG1', tipo: 'P' }, visitFrom: { partido: 'SFG2', tipo: 'P' }, rama: 'ganadores', puestoClass: 'puesto-3' },
  { id: 'F56', puesto: '5°/6°', localFrom: { partido: 'SFP1', tipo: 'G' }, visitFrom: { partido: 'SFP2', tipo: 'G' }, rama: 'perdedores', puestoClass: '' },
  { id: 'F78', puesto: '7°/8°', localFrom: { partido: 'SFP1', tipo: 'P' }, visitFrom: { partido: 'SFP2', tipo: 'P' }, rama: 'perdedores', puestoClass: '' }
];

// Meta visual de cada copa
const COPA_META = {
  oro:    { label: 'Copa de Oro',    initial: 'O', color: 'var(--gold)',   trofeoWinner: '🏆' },
  plata:  { label: 'Copa de Plata',  initial: 'P', color: 'var(--silver)', trofeoWinner: '🥈' },
  bronce: { label: 'Copa de Bronce', initial: 'B', color: 'var(--bronze)', trofeoWinner: '🥉' }
};

// -------- Override de penales (archivo data/penales.js) --------
// Si no está cargado, usamos un objeto vacío para no romper.
const PENALES_SAFE = (typeof PENALES === 'object' && PENALES) || { cuartos: {}, semis: {}, finales: {} };

function penalGanador(seccion, copa, cruceId) {
  const key = copa + '-' + cruceId;
  const entry = PENALES_SAFE[seccion] && PENALES_SAFE[seccion][key];
  return entry ? entry.ganador : null;
}

// -------- Cálculo de seeds (orden por puntos/DG/GF/posición en zona) --------
function getSeedsCopa(copa) {
  const clasificados = [];
  ['A', 'B', 'C'].forEach(function (z) {
    const posiciones = POSICIONES['zona' + z] || [];
    posiciones.forEach(function (row, idx) {
      if (REGLAS_COPA_FASE2[z][idx] === copa) {
        clasificados.push({
          equipoId: row.id, zonaOrigen: z, posOrigen: idx + 1,
          pts: row.pts, gf: row.gf, gc: row.gc, dg: row.gf - row.gc
        });
      }
    });
  });
  clasificados.sort(function (a, b) {
    if (a.pts !== b.pts) return b.pts - a.pts;
    if (a.dg !== b.dg)   return b.dg - a.dg;
    if (a.gf !== b.gf)   return b.gf - a.gf;
    return a.posOrigen - b.posOrigen;
  });
  return clasificados;
}

// -------- Buscar resultado de cuartos (ida + vuelta) --------
// El papi suele publicar las dos fechas con el mismo "local" nominal (no
// invierte roles entre ida y vuelta), así que no podemos distinguir ida/vuelta
// por el orden local/visitante. Buscamos todos los partidos entre estos dos
// equipos y usamos el número de fecha para ordenar.
function findResultadoBracket(equipoLocalId, equipoVisitId) {
  if (!equipoLocalId || !equipoVisitId) return null;
  const partidosFase3 = FIXTURE
    .filter(function (f) { return f.fase === 3; })
    .flatMap(function (f) {
      const ps = f.zonas ? Object.values(f.zonas).flat() : (f.partidos || []);
      return ps.map(function (p) { return Object.assign({}, p, { _fecha: f.fecha }); });
    });
  const matches = partidosFase3
    .filter(function (p) {
      return (
        (p.local === equipoLocalId && p.visitante === equipoVisitId) ||
        (p.local === equipoVisitId && p.visitante === equipoLocalId)
      ) && p.golesL !== undefined && p.golesV !== undefined;
    })
    .sort(function (a, b) { return (a._fecha || 0) - (b._fecha || 0); });

  if (matches.length === 0) return null;

  function norm(p) {
    const asLocal = p.local === equipoLocalId;
    return {
      l: asLocal ? p.golesL : p.golesV,
      v: asLocal ? p.golesV : p.golesL
    };
  }
  const ida    = norm(matches[0]);
  const vuelta = matches[1] ? norm(matches[1]) : null;
  const golesL = ida.l + (vuelta ? vuelta.l : 0);
  const golesV = ida.v + (vuelta ? vuelta.v : 0);
  return {
    ida: ida,
    vuelta: vuelta,
    agg: { l: golesL, v: golesV },
    completo: matches.length >= 2
  };
}

// -------- Buscar resultado de un partido único (semis, finales) --------
function findResultadoUnico(equipoLocalId, equipoVisitId) {
  if (!equipoLocalId || !equipoVisitId) return null;
  const partidosFase3 = FIXTURE
    .filter(function (f) { return f.fase === 3; })
    .flatMap(function (f) {
      if (f.zonas) return Object.values(f.zonas).flat();
      if (f.partidos) return f.partidos;
      return [];
    });
  const p = partidosFase3.find(function (x) {
    return (
      (x.local === equipoLocalId && x.visitante === equipoVisitId) ||
      (x.local === equipoVisitId && x.visitante === equipoLocalId)
    ) && x.golesL !== undefined && x.golesV !== undefined;
  });
  if (!p) return null;
  const inverso = p.local !== equipoLocalId;
  return {
    l: inverso ? p.golesV : p.golesL,
    v: inverso ? p.golesL : p.golesV
  };
}

// -------- Resolver el bracket completo de una copa --------
function resolverBracket(copa) {
  const cruces = CRUCES_POR_COPA[copa] || [];
  const seeds  = getSeedsCopa(copa);
  const bracket = { seeds: seeds, cuartos: {}, semis: {}, finales: {} };

  // Cuartos — ida y vuelta, con override de penales si el agregado da empate
  cruces.forEach(function (c) {
    const equipoL = c.localId;
    const equipoV = c.visitId;
    const res = findResultadoBracket(equipoL, equipoV);
    let ganador = null, perdedor = null, penales = false;
    if (res && res.completo) {
      if (res.agg.l > res.agg.v)      { ganador = equipoL; perdedor = equipoV; }
      else if (res.agg.v > res.agg.l) { ganador = equipoV; perdedor = equipoL; }
      else {
        const pen = penalGanador('cuartos', copa, c.id);
        if (pen) {
          ganador  = pen;
          perdedor = (pen === equipoL) ? equipoV : equipoL;
          penales  = true;
        }
      }
    }
    bracket.cuartos[c.id] = { id: c.id, equipoL: equipoL, equipoV: equipoV, resultado: res, ganador: ganador, perdedor: perdedor, penales: penales };
  });

  // Semis — partido único; empate se define por penales
  CRUCES_SEMIS.forEach(function (c) {
    const equipoL = bracket.cuartos[c.localFrom.partido]
                     && (c.localFrom.tipo === 'G' ? bracket.cuartos[c.localFrom.partido].ganador
                                                 : bracket.cuartos[c.localFrom.partido].perdedor);
    const equipoV = bracket.cuartos[c.visitFrom.partido]
                     && (c.visitFrom.tipo === 'G' ? bracket.cuartos[c.visitFrom.partido].ganador
                                                 : bracket.cuartos[c.visitFrom.partido].perdedor);
    const res = findResultadoUnico(equipoL, equipoV);
    let ganador = null, perdedor = null, penales = false;
    if (res) {
      if (res.l > res.v)      { ganador = equipoL; perdedor = equipoV; }
      else if (res.v > res.l) { ganador = equipoV; perdedor = equipoL; }
      else {
        const pen = penalGanador('semis', copa, c.id);
        if (pen) {
          ganador  = pen;
          perdedor = (pen === equipoL) ? equipoV : equipoL;
          penales  = true;
        }
      }
    }
    bracket.semis[c.id] = {
      id: c.id, equipoL: equipoL, equipoV: equipoV,
      resultado: res, ganador: ganador, perdedor: perdedor, penales: penales,
      rama: c.rama, localFrom: c.localFrom, visitFrom: c.visitFrom
    };
  });

  // Finales de puesto (partido único)
  CRUCES_FINALES.forEach(function (c) {
    const equipoL = bracket.semis[c.localFrom.partido]
                     && (c.localFrom.tipo === 'G' ? bracket.semis[c.localFrom.partido].ganador
                                                 : bracket.semis[c.localFrom.partido].perdedor);
    const equipoV = bracket.semis[c.visitFrom.partido]
                     && (c.visitFrom.tipo === 'G' ? bracket.semis[c.visitFrom.partido].ganador
                                                 : bracket.semis[c.visitFrom.partido].perdedor);
    const res = findResultadoUnico(equipoL, equipoV);
    let ganador = null, penales = false;
    if (res) {
      if (res.l > res.v) ganador = equipoL;
      else if (res.v > res.l) ganador = equipoV;
      else {
        const pen = penalGanador('finales', copa, c.id);
        if (pen) { ganador = pen; penales = true; }
      }
    }
    bracket.finales[c.id] = {
      id: c.id, puesto: c.puesto, puestoClass: c.puestoClass,
      equipoL: equipoL, equipoV: equipoV,
      resultado: res, ganador: ganador, penales: penales,
      rama: c.rama
    };
  });

  return bracket;
}

// -------- Resumen por copa (útil para la home) --------
// Devuelve { cuartosJugados, cuartosTotal, semisJugadas, semisTotal, finalesJugadas, finalesTotal, ganadorFinal }
function resumenCopa(copa) {
  const b = resolverBracket(copa);
  const cuartosTotal = Object.keys(b.cuartos).length;
  const cuartosJugados = Object.values(b.cuartos).filter(function (c) { return c.ganador; }).length;
  const semisTotal = Object.keys(b.semis).length;
  const semisJugadas = Object.values(b.semis).filter(function (s) { return s.ganador; }).length;
  const finalesTotal = Object.keys(b.finales).length;
  const finalesJugadas = Object.values(b.finales).filter(function (f) { return f.ganador; }).length;
  const ganadorFinal = b.finales.F12 && b.finales.F12.ganador;
  return {
    bracket: b,
    cuartosJugados: cuartosJugados, cuartosTotal: cuartosTotal,
    semisJugadas: semisJugadas, semisTotal: semisTotal,
    finalesJugadas: finalesJugadas, finalesTotal: finalesTotal,
    ganadorFinal: ganadorFinal
  };
}
