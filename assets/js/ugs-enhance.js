/* ============================================================
   UGS ENHANCEMENTS — ugs-enhance.js
   Mobile nav · Counters · Progress · Back-to-top · Announce
   ============================================================ */

(function() {
  'use strict';

  // ── Announce Bar ────────────────────────────────────────────
  function initAnnounceBar() {
    const bar = document.getElementById('ugs-announce');
    if (!bar) return;
    const key = 'ugs-announce-' + (bar.dataset.id || '1');
    if (sessionStorage.getItem(key)) {
      bar.style.display = 'none';
      return;
    }
    const closeBtn = bar.querySelector('.announce-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        bar.style.maxHeight = bar.scrollHeight + 'px';
        requestAnimationFrame(function() {
          bar.style.transition = 'max-height 0.4s ease, opacity 0.3s ease, padding 0.4s ease';
          bar.style.maxHeight = '0';
          bar.style.opacity = '0';
          bar.style.paddingTop = '0';
          bar.style.paddingBottom = '0';
        });
        setTimeout(function() { bar.style.display = 'none'; }, 420);
        sessionStorage.setItem(key, '1');
      });
    }
  }

  // ── Mobile Nav Drawer (Phase 1) ─────────────────────────────
  function initMobileNav() {
    const hamburger = document.getElementById('nav-hamburger');
    const drawer    = document.getElementById('nav-drawer');
    const overlay   = document.getElementById('nav-drawer-overlay');
    if (!hamburger || !drawer) return;

    function openDrawer() {
      hamburger.classList.add('open');
      drawer.classList.add('open');
      if (overlay) overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeDrawer() {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', function() {
      drawer.classList.contains('open') ? closeDrawer() : openDrawer();
    });

    if (overlay) overlay.addEventListener('click', closeDrawer);

    const closeBtn = document.getElementById('nav-drawer-close');
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    // Close on link click
    drawer.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', closeDrawer);
    });

    // Drawer search mirrors desktop search
    const drawerSearch = document.getElementById('drawer-search-input');
    const desktopSearch = document.getElementById('site-search');
    if (drawerSearch && desktopSearch) {
      drawerSearch.addEventListener('input', function() {
        desktopSearch.value = this.value;
        desktopSearch.dispatchEvent(new Event('input'));
      });
    }
  }

  // ── Phase 2/3/4 Sidebar Drawer ──────────────────────────────
  function initPhaseDrawer() {
    const toggle  = document.getElementById('phase-sidebar-toggle');
    const sidebar = document.querySelector('.sidebar, .sb');
    const overlay = document.getElementById('phase-drawer-overlay');
    if (!toggle || !sidebar) return;

    function openSidebar() {
      sidebar.classList.add('drawer-open');
      if (overlay) overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeSidebar() {
      sidebar.classList.remove('drawer-open');
      if (overlay) overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function() {
      sidebar.classList.contains('drawer-open') ? closeSidebar() : openSidebar();
    });
    if (overlay) overlay.addEventListener('click', closeSidebar);

    // Close when nav link clicked on mobile
    sidebar.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function() {
        if (window.innerWidth <= 768) closeSidebar();
      });
    });
  }

  // ── Scroll Reveal (all variants) ────────────────────────────
  function initReveal() {
    var selectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .stagger';
    var elements = document.querySelectorAll(selectors);
    if (!elements.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry, idx) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = parseInt(el.dataset.delay || 0);
          setTimeout(function() { el.classList.add('in'); }, delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(function(el) { observer.observe(el); });
  }

  // ── Stat Counter Animation ───────────────────────────────────
  function animateCounter(el) {
    var raw    = el.dataset.target || el.textContent.replace(/[^0-9.KMB+]/g, '');
    var suffix = el.dataset.suffix || el.textContent.replace(/[0-9.,]/g, '').replace(raw, '');
    var isK    = raw.indexOf('K') !== -1;
    var isM    = raw.indexOf('M') !== -1;
    var num    = parseFloat(raw.replace(/[KMB+]/g, ''));
    var duration = 1800;
    var start  = performance.now();

    function update(now) {
      var progress = Math.min((now - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3); // cubic ease out
      var current = num * ease;
      var display;
      if (isM)      display = (current).toFixed(current < 1 ? 1 : 0) + 'M';
      else if (isK) display = (current < 10 ? current.toFixed(1) : Math.round(current)) + 'K';
      else          display = Math.round(current).toString();
      el.textContent = display + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(function(c) { observer.observe(c); });
  }

  // ── Reading Progress Bar ─────────────────────────────────────
  function initReadingProgress() {
    var bar = document.getElementById('reading-progress');
    if (!bar) return;
    function update() {
      var scrollTop  = window.scrollY;
      var docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = pct + '%';
    }
    window.addEventListener('scroll', update, { passive: true });
  }

  // ── Back to Top ──────────────────────────────────────────────
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', function() {
      btn.classList.toggle('visible', window.scrollY > 500);
    }, { passive: true });
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Ticker pause on hover (already in CSS, add keyboard) ────
  function initTicker() {
    var ticker = document.querySelector('.breaking-track');
    if (!ticker) return;
    ticker.setAttribute('tabindex', '0');
    ticker.addEventListener('focus',  function() { ticker.querySelector('.breaking-inner').style.animationPlayState = 'paused'; });
    ticker.addEventListener('blur',   function() { ticker.querySelector('.breaking-inner').style.animationPlayState = ''; });
  }

  // ── Site Search (enhanced) ───────────────────────────────────
  var SEARCH_INDEX = [
    {title:"2Slimey Breaks Through",url:"/articles/2slimey-breaks-through.html",type:"Article"},
    {title:"ØWAY Cypher 2024",url:"/articles/oway-cypher.html",type:"Article"},
    {title:"UGS Hits 92K Followers",url:"/articles/ugs-92k-twitter.html",type:"Article"},
    {title:"Delaware's Underground Wave",url:"/articles/delaware-underground.html",type:"Article"},
    {title:"Freshman List 2025 Process",url:"/articles/freshman-list-2025.html",type:"Article"},
    {title:"Captain Swag — #1 Freshman",url:"/artists/slimzy-real.html",type:"Artist"},
    {title:"HollowTipHero — #2 Freshman",url:"/artists/frost-divz.html",type:"Artist"},
    {title:"Lade — #3 Freshman",url:"/artists/voidkid.html",type:"Artist"},
    {title:"Raininglol — #4 Freshman",url:"/artists/kaoswave.html",type:"Artist"},
    {title:"Talinwya — #5 Freshman",url:"/artists/lunar4.html",type:"Artist"},
    {title:"Ealuhri — #6 Freshman",url:"/artists/solaris.html",type:"Artist"},
    {title:"Ivvys — #7 Freshman",url:"/artists/hellgate.html",type:"Artist"},
    {title:"2Slimey — #8 Freshman",url:"/artists/tidecrest.html",type:"Artist"},
    {title:"Sixbill — #9 Freshman",url:"/artists/snipr.html",type:"Artist"},
    {title:"Matt Proxy — #10 Freshman",url:"/artists/oracle.html",type:"Artist"},
    {title:"Artist Promotions",url:"/promotions.html",type:"Page"},
    {title:"Pricing & Packages",url:"/pricing.html",type:"Page"},
    {title:"Advertise With UGS",url:"/advertise.html",type:"Page"},
    {title:"Press Kit",url:"/press-kit.html",type:"Page"},
    {title:"Merch — Spring Drop",url:"/merch.html",type:"Page"},
    {title:"Contact UGS",url:"/contact.html",type:"Page"},
    {title:"Phase 4 Festival",url:"/phase4/mission-control.html",type:"Page"},
    {title:"Freshman List 2025",url:"/freshman-list.html",type:"Page"},
  ];

  function buildSearchResults(q, container) {
    if (!q || q.length < 2) { container.style.display = 'none'; return; }
    var q_low = q.toLowerCase();
    var results = SEARCH_INDEX.filter(function(i) {
      return i.title.toLowerCase().indexOf(q_low) !== -1 || i.type.toLowerCase().indexOf(q_low) !== -1;
    }).slice(0, 7);
    if (!results.length) { container.style.display = 'none'; return; }
    container.style.display = 'block';
    container.innerHTML = results.map(function(r) {
      return '<a href="' + r.url + '" style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;border-bottom:1px solid var(--border);font-size:12px;color:var(--off);text-decoration:none;transition:background .15s;" onmouseover="this.style.background=\'var(--raised)\'" onmouseout="this.style.background=\'\'">'
        + '<span>' + r.title + '</span>'
        + '<span style="font-family:var(--font-mono);font-size:8px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-left:12px;white-space:nowrap;">' + r.type + '</span>'
        + '</a>';
    }).join('');
  }

  function initSearch() {
    var input   = document.getElementById('site-search');
    var results = document.getElementById('search-results');
    if (!input || !results) return;

    input.addEventListener('input', function() { buildSearchResults(this.value, results); });
    input.addEventListener('focus', function() { if (this.value.length >= 2) results.style.display = 'block'; });
    document.addEventListener('click', function(e) {
      if (!input.contains(e.target) && !results.contains(e.target)) results.style.display = 'none';
    });

    // Keyboard nav in results
    input.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') { results.style.display = 'none'; input.blur(); }
      if (e.key === 'ArrowDown') {
        var first = results.querySelector('a');
        if (first) { e.preventDefault(); first.focus(); }
      }
    });
    results.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowDown') { var n = document.activeElement.nextElementSibling; if (n) { e.preventDefault(); n.focus(); } }
      if (e.key === 'ArrowUp')   { var p = document.activeElement.previousElementSibling; if (p) { e.preventDefault(); p.focus(); } else { e.preventDefault(); input.focus(); } }
      if (e.key === 'Escape')    { results.style.display = 'none'; input.focus(); }
    });
  }

  // ── Init all ─────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    initAnnounceBar();
    initMobileNav();
    initPhaseDrawer();
    initReveal();
    initCounters();
    initReadingProgress();
    initBackToTop();
    initTicker();
    initSearch();
  });

})();
