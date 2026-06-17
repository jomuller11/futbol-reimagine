// ============================================================
// site.js — utilidades compartidas (tab bar, mi equipo, forma)
// Requiere data/torneo.js cargado antes.
// ============================================================

// ---------- Mi equipo (favorito, persistido en el teléfono) ----------
function getMiEquipo() {
  const id = localStorage.getItem('miEquipo');
  return id && EQUIPOS[id] ? id : null;
}

function setMiEquipo(id) {
  if (id) localStorage.setItem('miEquipo', id);
  else localStorage.removeItem('miEquipo');
}

// ---------- Últimos N resultados de un equipo (G/E/P) ----------
function computeForma(id, n) {
  n = n || 5;
  const res = [];
  FIXTURE.filter(f => f.estado === 'jugada').forEach(f => {
    [...f.zona1, ...f.zona2].forEach(p => {
      if ((p.local === id || p.visitante === id) && p.golesL !== undefined) {
        const gp = p.local === id ? p.golesL : p.golesV;
        const gr = p.local === id ? p.golesV : p.golesL;
        res.push(gp > gr ? 'G' : (gp < gr ? 'P' : 'E'));
      }
    });
  });
  return res.slice(-n);
}

function formaDotsHtml(id) {
  const forma = computeForma(id);
  if (!forma.length) return '';
  return forma.map(r =>
    `<span class="forma-dot ${r === 'G' ? 'g' : (r === 'E' ? 'e' : 'p')}">${r}</span>`
  ).join('');
}

// ---------- Zona de la fase final según la posición (0-based) ----------
// 1°-4° → A · 5°-8° → B · 9°-12° → C
function zonaDestino(idx) {
  if (idx < 4) return 'A';
  if (idx < 8) return 'B';
  return 'C';
}

function zonaLegendHtml() {
  return `
    <div class="zona-legend">
      <span class="item"><span class="swatch a"></span> 1°-4° → Zona A</span>
      <span class="item"><span class="swatch b"></span> 5°-8° → Zona B</span>
      <span class="item"><span class="swatch c"></span> 9°-12° → Zona C</span>
    </div>
  `;
}

// ---------- Próximo partido de un equipo ----------
function getProximoPartido(id) {
  for (const f of FIXTURE) {
    if (f.estado !== 'pendiente') continue;
    for (const zona of [1, 2]) {
      for (const p of f['zona' + zona]) {
        if (p.local === id || p.visitante === id) {
          return { ...p, fecha: f.fecha, fechaTexto: f.fechaTexto, zona, rival: p.local === id ? p.visitante : p.local };
        }
      }
    }
  }
  return null;
}

// ---------- Tab bar inferior (mobile) ----------
const TABBAR_ICONS = {
  inicio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11 L12 4 L20 11 V20 H14 V14 H10 V20 H4 Z"></path></svg>',
  fixture: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="6" width="16" height="14" rx="2"></rect><line x1="4" y1="10" x2="20" y2="10"></line><line x1="9" y1="4" x2="9" y2="7"></line><line x1="15" y1="4" x2="15" y2="7"></line></svg>',
  posiciones: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>',
  stats: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="20" x2="6" y2="12"></line><line x1="12" y1="20" x2="12" y2="6"></line><line x1="18" y1="20" x2="18" y2="15"></line></svg>',
};

function renderTabBar(active) {
  const tabs = [
    { id: 'inicio',     label: 'Inicio',       href: 'index.html' },
    { id: 'fixture',    label: 'Fixture',      href: 'fixture.html' },
    { id: 'posiciones', label: 'Posiciones',   href: 'estadisticas.html' },
    { id: 'stats',      label: 'Estadísticas', href: 'estadisticas.html?tab=goleadores' },
  ];
  const nav = document.createElement('nav');
  nav.className = 'tabbar';
  nav.innerHTML = tabs.map(t => `
    <a href="${t.href}" class="tabbar-item ${t.id === active ? 'on' : ''}">
      <span class="ico">${TABBAR_ICONS[t.id]}</span>
      ${t.label}
    </a>
  `).join('');
  document.body.appendChild(nav);
  document.body.classList.add('has-tabbar');
}
