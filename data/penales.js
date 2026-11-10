// ============================================================
// RESOLUCIÓN DE EMPATES POR PENALES
// ============================================================
// El papi no publica el detalle estructurado de las series de penales,
// así que este archivo es MANUAL. Lo editamos a mano cuando un cruce
// termina empatado y hay que anotar quién pasó.
//
// Formato de clave: '<copa>-<idCruce>'  →  idEquipoQuePasó
//   copa: 'oro' | 'plata' | 'bronce'
//   idCruce: 'QF1'..'QF4' | 'SFG1'/'SFG2'/'SFP1'/'SFP2' | 'F12'/'F34'/'F56'/'F78'
//   idEquipoQuePasó: el id de equipo (ej. '08') del ganador por penales
//
// Si el papi en algún momento publica los penales como campo, migrar esto
// al parser y vaciar este archivo.
// ============================================================

const PENALES = {
  cuartos: {
    // Copa de Plata, QF3: Iribarren 3-3 Resico (agregado). Pasó Iribarren.
    'plata-QF3': { ganador: '08', notas: 'Iribarren eliminó a Resico por penales' }
  },
  semis: {
    // Copa de Oro, SFG1 (rama ganadores): Funaro 2-2 Miguel. Pasó Funaro.
    'oro-SFG1': { ganador: '05', notas: 'Funaro eliminó a Miguel por penales en la semi de la rama ganadores' }
  },
  finales: {}
};
