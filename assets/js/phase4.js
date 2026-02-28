// ── TAB NAVIGATION ─────────────────────────────────────────
const pageTitles = {
  overview:'MISSION CONTROL', venue:'VENUE INTELLIGENCE',
  ticketing:'TICKETING ENGINE', lineup:'LINEUP BUILDER',
  production:'PRODUCTION PLAN', sponsors:'SPONSOR DECK',
  pnl:'P&L PROJECTIONS', expansion:'MULTI-CITY EXPANSION', roadmap:'ROADMAP'
};

function showTab(id, btn) {
  document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const page = document.getElementById('tab-' + id);
  if(page) page.classList.add('active');
  if(btn) btn.classList.add('active');
  document.getElementById('page-title').textContent = pageTitles[id] || id.toUpperCase();
  window.scrollTo({top:0, behavior:'smooth'});
}

// ── STAGE SWITCHER ─────────────────────────────────────────
function switchStage(stage, btn) {
  document.querySelectorAll('.stage-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  ['main','second','third'].forEach(s => {
    const el = document.getElementById('stage-' + s);
    if(el) el.style.display = s === stage ? '' : 'none';
  });
}

// ── PRESALE BAR ANIMATION ──────────────────────────────────
setTimeout(() => {
  const bar = document.getElementById('presale-bar');
  if(bar) bar.style.width = '27.5%';
}, 500);

// ── LIVE COUNTDOWN ─────────────────────────────────────────
(function() {
  const target = new Date('2026-11-14T19:00:00');
  function update() {
    const diff = target - new Date();
    if(diff > 0) {
      const days = Math.floor(diff / 86400000);
      const el = document.getElementById('countdown-val');
      if(el) el.textContent = days + 'd';
    }
  }
  update();
  setInterval(update, 60000);
})();

// ── TOAST ──────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3800);
}

// ── HEATBAR ANIMATIONS ────────────────────────────────────
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.querySelectorAll('.heatbar-fill[data-w]').forEach(b => {
        const w = b.getAttribute('data-w');
        b.style.width = '0%';
        setTimeout(() => b.style.width = w + '%', 200);
      });
      barObs.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.card, .venue-map-placeholder').forEach(c => barObs.observe(c));
