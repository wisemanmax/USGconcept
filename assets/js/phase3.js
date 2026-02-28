// ── NETWORK CANVAS ────────────────────────────────────────
(function() {
  const canvas = document.getElementById('network-canvas');
  const ctx = canvas.getContext('2d');
  let nodes = [], W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function init() {
    resize();
    nodes = Array.from({length:60}, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random()-.5) * .4, vy: (Math.random()-.5) * .4,
      r: Math.random() * 2 + 1,
      color: Math.random() > .5 ? '#8b5cf6' : '#00ff88'
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    // connections
    for(let i = 0; i < nodes.length; i++) {
      for(let j = i+1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if(d < 140) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(139,92,246,${0.12 * (1 - d/140)})`;
          ctx.lineWidth = .5;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
    // nodes
    nodes.forEach(n => {
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
      ctx.fillStyle = n.color;
      ctx.globalAlpha = .6;
      ctx.fill();
      ctx.globalAlpha = 1;
      // update
      n.x += n.vx; n.y += n.vy;
      if(n.x < 0 || n.x > W) n.vx *= -1;
      if(n.y < 0 || n.y > H) n.vy *= -1;
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  init(); draw();
})();

// ── TAB NAVIGATION ────────────────────────────────────────
const pageTitles = {
  overview:'COMMUNITY HUB', discord:'DISCORD PARTNERS',
  ambassadors:'AMBASSADORS', reputation:'REPUTATION SYSTEM',
  referrals:'REFERRAL REWARDS', events:'EVENT PRIORITY',
  perks:'PERKS & REWARDS', feed:'ACTIVITY FEED', roadmap:'ROADMAP'
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

// ── LIVE FEED GENERATOR ──────────────────────────────────
const feedEvents = [
  {icon:'🔗',color:'var(--violet-d)',text:'<strong>KingFlow_DC</strong> <span style="color:var(--neo)">referred</span> 3 members',meta:'JUST NOW · +150 XP'},
  {icon:'🎤',color:'var(--neo-d)',text:'<strong>Drill Nation HQ</strong> <span style="color:var(--neo)">shared</span> UGS promo post',meta:'2M AGO · PARTNER ACTION'},
  {icon:'⭐',color:'var(--amber-d)',text:'<strong>ZaraVibes</strong> <span style="color:var(--amber)">unlocked</span> Gold tier',meta:'8M AGO · MILESTONE'},
  {icon:'🎟️',color:'var(--rose-d)',text:'<strong>14 members</strong> <span style="color:var(--sky)">claimed</span> March event access',meta:'22M AGO · EVENT'},
  {icon:'📣',color:'var(--violet-d)',text:'<strong>LunarTracks</strong> <span style="color:var(--neo)">shared</span> Freshman post — 800 impressions',meta:'1H AGO · CONTENT'},
  {icon:'🏆',color:'var(--amber-d)',text:'<strong>DrillKing_CHI</strong> won <span style="color:var(--amber)">monthly referral challenge</span>',meta:'2H AGO · REWARD'},
  {icon:'💬',color:'var(--sky-d)',text:'<strong>Emo Rap Collective</strong> <span style="color:var(--neo)">joined</span> as partner server',meta:'3H AGO · NEW PARTNER'},
  {icon:'🎤',color:'var(--violet-d)',text:'<strong>BeatPlug_ATL</strong> submitted <span style="color:var(--violet-l)">Tidecrest</span> for Freshman consideration',meta:'4H AGO · A&R SUBMISSION'},
];

function buildFeed() {
  const feed = document.getElementById('live-feed');
  if(!feed) return;
  feed.innerHTML = feedEvents.map(e => `
    <div class="feed-item">
      <div class="feed-avi" style="background:${e.color};">${e.icon}</div>
      <div class="feed-body">
        <div class="feed-text">${e.text}</div>
        <div class="feed-meta"><span>${e.meta}</span></div>
      </div>
    </div>
  `).join('');
}
buildFeed();

// Simulate live feed updates
setInterval(() => {
  const feed = document.getElementById('live-feed');
  if(!feed || !document.getElementById('tab-feed').classList.contains('active')) return;
  const newItem = feedEvents[Math.floor(Math.random() * feedEvents.length)];
  const el = document.createElement('div');
  el.className = 'feed-item';
  el.style.background = 'rgba(139,92,246,0.05)';
  el.style.borderRadius = '6px';
  el.innerHTML = `
    <div class="feed-avi" style="background:${newItem.color};">${newItem.icon}</div>
    <div class="feed-body">
      <div class="feed-text">${newItem.text}</div>
      <div class="feed-meta"><span>JUST NOW · LIVE</span></div>
    </div>
  `;
  feed.insertBefore(el, feed.firstChild);
  setTimeout(() => el.style.background = '', 2000);
  if(feed.children.length > 12) feed.removeChild(feed.lastChild);
}, 8000);

// ── TOAST ─────────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ── BAR ANIMS ─────────────────────────────────────────────
const barObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      e.target.querySelectorAll('.rep-bar-fill[data-w], .breakdown-bar-fill[data-w]').forEach(b => {
        b.style.width = '0%';
        setTimeout(() => b.style.width = b.getAttribute('data-w') + '%', 150);
      });
      barObs.unobserve(e.target);
    }
  });
}, {threshold: 0.2});
document.querySelectorAll('.card').forEach(c => barObs.observe(c));
