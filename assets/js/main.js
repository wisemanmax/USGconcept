// ============================================================
// UGS SHARED JS — main.js
// Used by all pages. Phase-specific logic is loaded separately.
// ============================================================

// ── SCROLL REVEAL (Phase 1 pages) ───────────────────────────
if (document.querySelectorAll('.reveal').length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('in'), i * 60);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ── NAV ACTIVE STATE ─────────────────────────────────────────
// Mark current page active in nav by matching pathname
(function() {
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-menu a, .shared-nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop().split('#')[0] || 'index.html';
    if (linkFile === filename || (filename === '' && linkFile === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ── SMOOTH SCROLL for on-page anchors ───────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ── PLATFORM TOGGLE (Phase 1 promo form) ────────────────────
document.querySelectorAll('.platform-check')?.forEach(label => {
  label.addEventListener('click', () => label.classList.toggle('checked'));
});

// ── SHARED TOAST ─────────────────────────────────────────────
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3500);
}

// ── BAR FILL ANIMATION (Phase 2) ─────────────────────────────
if (document.querySelectorAll('.breakdown-bar-fill[data-w]').length) {
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
}
