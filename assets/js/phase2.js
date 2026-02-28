// ── LIVE DATE ──────────────────────────────────────────────
const d = new Date();
document.getElementById('live-date').textContent =
  d.toLocaleDateString('en-US', {weekday:'short', month:'short', day:'numeric', year:'numeric'}).toUpperCase();

// ── TAB NAVIGATION ────────────────────────────────────────
const titles = {
  overview: 'DASHBOARD', campaigns: 'CAMPAIGNS', submit: 'NEW CAMPAIGN',
  funnel: 'ARTIST FUNNEL', analytics: 'PLATFORM ANALYTICS',
  sponsors: 'SPONSORS', reports: 'REPORTS', roadmap: 'ROADMAP'
};

function showTab(id, btn) {
  document.querySelectorAll('.tab-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById('tab-' + id);
  if (page) page.classList.add('active');
  if (btn) btn.classList.add('active');
  document.getElementById('header-title').textContent = titles[id] || id.toUpperCase();
  window.scrollTo({top:0, behavior:'smooth'});
}

// ── PLATFORM TOGGLES ──────────────────────────────────────
document.querySelectorAll('.plat-toggle').forEach(el => {
  el.addEventListener('click', () => el.classList.toggle('on'));
});

// ── PACKAGE SELECT ────────────────────────────────────────
function selectPkg(el) {
  document.querySelectorAll('.pkg-option').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected');
}

// ── CAMPAIGN SUBMIT ──────────────────────────────────────
function submitCampaign() {
  showToast('⚡ Campaign submitted — added to review queue');
}

// ── CAMPAIGN FILTER ──────────────────────────────────────
function filterCampaigns(status, btn) {
  document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const rows = document.querySelectorAll('#campaigns-table tbody tr');
  rows.forEach(row => {
    const show = status === 'all' || row.dataset.status === status;
    row.style.display = show ? '' : 'none';
  });
}

// ── APPROVE ───────────────────────────────────────────────
function approveItem(btn) {
  const row = btn.closest('tr');
  const statusCell = row.querySelector('.status-pill');
  statusCell.className = 'status-pill sp-live';
  statusCell.textContent = '';
  const dot = document.createElement('span');
  statusCell.classList.add('sp-live');
  statusCell.innerHTML = 'Live';
  row.dataset.status = 'live';
  btn.className = 'btn btn-ghost';
  btn.textContent = 'View';
  btn.onclick = null;
  showToast('✓ Campaign approved and scheduled');
}

// ── PLATFORM SWITCHER ─────────────────────────────────────
const platformData = {
  tw:  { followers:'92K', impressions:'5.4M', engagements:'228K', visits:'41K',
         col:'#1da1f2', colB:'var(--acid)', colC:'var(--off)', colD:'var(--cyan)' },
  ig:  { followers:'50K+', impressions:'1.2M', engagements:'48K', visits:'12K',
         col:'#e1306c', colB:'var(--acid)', colC:'var(--off)', colD:'var(--cyan)' },
  yt:  { followers:'—', impressions:'1.8M peak', engagements:'364K', visits:'8.4K',
         col:'#ff4444', colB:'var(--acid)', colC:'var(--off)', colD:'var(--cyan)' },
  all: { followers:'140K+', impressions:'8.4M', engagements:'640K', visits:'61K',
         col:'var(--acid)', colB:'var(--acid)', colC:'var(--off)', colD:'var(--cyan)' },
};
function switchPlatform(btn, platform) {
  document.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const d = platformData[platform];
  const stats = document.querySelectorAll('.a-stat-val');
  const vals = [d.followers, d.impressions, d.engagements, d.visits];
  const colors = [d.col, d.colB, d.colC, d.colD];
  stats.forEach((s, i) => {
    s.textContent = vals[i]; s.style.color = colors[i];
  });
}

// ── HEATMAP GENERATOR ────────────────────────────────────
(function buildHeatmap() {
  const grid = document.getElementById('heatmap-grid');
  if (!grid) return;
  const vals = [0,1,0,2,3,4,2, 1,0,2,3,4,4,3, 0,1,3,2,4,3,1, 2,2,1,3,4,4,2, 1,0,2,4,3,2,0, 2,3,1,2,4,3,1, 0,1,2,3,3,4,2];
  vals.forEach(v => {
    const d = document.createElement('div');
    d.className = 'hm-day'; d.setAttribute('data-v', v);
    grid.appendChild(d);
  });
})();

// ── SPONSOR REPORT ────────────────────────────────────────
function genReport(btn) {
  btn.textContent = '✓ Report generated';
  btn.style.color = 'var(--acid)';
  showToast('📊 Sponsor report generated & ready');
  setTimeout(() => { btn.textContent = '⬇ Generate Report'; btn.style.color = ''; }, 3000);
}

// ── TOAST ─────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ── BAR FILL ANIMATION ────────────────────────────────────
const fillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.breakdown-bar-fill[data-w]').forEach(bar => {
        bar.style.width = '0%';
        setTimeout(() => { bar.style.width = bar.getAttribute('data-w') + '%'; }, 200);
      });
      fillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.panel').forEach(p => fillObserver.observe(p));

// ── CAMPAIGNS SEARCH ─────────────────────────────────────
document.querySelector('.search-input input')?.addEventListener('input', function() {
  const q = this.value.toLowerCase();
  document.querySelectorAll('#campaigns-table tbody tr').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
});
