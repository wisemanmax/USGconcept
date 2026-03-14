/* UGS Shared Components — nav, ticker, footer data source. */

(function(){
  'use strict';

  /* ─── Determine path depth (root vs subdirectory) ─── */
  const depth = (() => {
    const p = window.location.pathname;
    const segs = p.split('/').filter(s => s && s.endsWith('.html') === false && s !== '');
    return segs.length; // 0 = root, 1 = /phase2/, etc.
  })();
  const ROOT = depth === 0 ? '' : '../'.repeat(depth);

  /* ─── Nav links ─── */
  const NAV_LINKS = [
    { href: 'index.html',          label: 'Home' },
    { href: 'news.html',           label: 'News' },
    { href: 'freshman-list.html',  label: 'Freshman List', badge: '2025' },
    { href: 'videos.html',         label: 'Videos' },
    { href: 'events.html',         label: 'Events' },
    { href: 'promotions.html',     label: 'Promotions' },
  ];

  /* ─── Phase nav ─── */
  const PHASE_LINKS = [
    { href: 'index.html',                   label: 'Phase 1 — Media Hub' },
    { href: 'phase2/dashboard.html',        label: 'Phase 2 — Analytics' },
    { href: 'phase3/overview.html',         label: 'Phase 3 — Community' },
    { href: 'phase4/mission-control.html',  label: 'Phase 4 — Festival' },
  ];

  /* ─── Breaking ticker items ─── */
  const TICKER = [
    "2Slimey's music video crosses 1.8M views on Underground Sound's Twitter",
    "UGS 2025 Freshman List nominations now open — submit your artist",
    "Underground Sound road to 100K followers — follow @therealugs",
    "ØWAY Cypher out now — watch on YouTube @therealugs",
    "New promotions packages available — Twitter, Instagram, and YouTube",
    "Phase 4 Festival — Wilmington, DE · Nov 2026 — Pre-sale list open",
  ];

  /* ─── Footer columns ─── */
  const FOOTER_COLS = [
    { heading: 'Editorial', links: [
      { href: 'news.html', label: 'Latest News' },
      { href: 'freshman-list.html', label: 'Freshman List', badge: '2025' },
      { href: 'videos.html', label: 'Videos' },
      { href: 'events.html', label: 'Events' },
    ]},
    { heading: 'For Artists', links: [
      { href: 'promotions.html', label: 'Submit Music' },
      { href: 'pricing.html', label: 'Pricing' },
      { href: 'promotions.html', label: 'Twitter Blast' },
      { href: 'promotions.html', label: 'YouTube Feature' },
    ]},
    { heading: 'Platform', links: [
      { href: 'index.html', label: 'Phase 1 — Media Hub', badge: 'LIVE' },
      { href: 'phase2/dashboard.html', label: 'Phase 2 — Analytics' },
      { href: 'phase3/overview.html', label: 'Phase 3 — Community' },
      { href: 'phase4/mission-control.html', label: 'Phase 4 — Festival' },
    ]},
    { heading: 'Company', links: [
      { href: 'press-kit.html', label: 'About UGS' },
      { href: 'advertise.html', label: 'Partnerships' },
      { href: 'advertise.html', label: 'Advertise' },
      { href: 'contact.html', label: 'Contact' },
      { href: 'press-kit.html', label: 'Press Kit' },
    ]},
  ];

  /* ─── Helper: prefix relative hrefs ─── */
  function r(href) {
    if (!href || href.startsWith('http') || href.startsWith('#')) return href;
    return ROOT + href;
  }

  /* ─── Expose public API ─── */
  window.UGS = window.UGS || {};
  window.UGS.ROOT = ROOT;
  window.UGS.NAV_LINKS = NAV_LINKS;
  window.UGS.PHASE_LINKS = PHASE_LINKS;
  window.UGS.TICKER = TICKER;
  window.UGS.FOOTER_COLS = FOOTER_COLS;
  window.UGS.r = r;

  /**
   * UGS.renderNav(containerId)
   * Renders the full primary nav into a container. 
   * Use this on new pages instead of copying nav HTML.
   */
  window.UGS.renderNav = function(containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;
    const currentHref = window.location.pathname.split('/').pop() || 'index.html';
    el.innerHTML = `
      <div class="util-bar">
        <div class="container">
          <div class="util-inner">
            <div class="util-left">
              <span>Underground Sound</span> — Media Hub for the New Global Underground
              &nbsp;|&nbsp; 📍 <span>US-Based</span> &nbsp;|&nbsp; Est. 2020
            </div>
            <div class="util-right">
              <a href="${r('promotions.html')}">Submit Music</a>
              <a href="${r('freshman-list.html')}">2025 Freshman</a>
              <a href="${r('events.html')}">Events</a>
              <a href="https://twitter.com/therealugs" target="_blank">Twitter</a>
              <a href="https://instagram.com/undergroundsound" target="_blank">Instagram</a>
            </div>
          </div>
        </div>
      </div>
      <nav class="primary-nav">
        <div class="container">
          <div class="nav-inner">
            <div class="nav-logo-wrap">
              <a href="${r('index.html')}" style="display:flex;align-items:center;gap:10px;text-decoration:none;">
                <div class="logo-mark"><span>UGS</span></div>
                <div class="logo-text">
                  <span class="top">UNDERGROUND</span>
                  <span class="sub">Sound · Est. 2020</span>
                </div>
              </a>
            </div>
            <ul class="nav-menu">
              ${NAV_LINKS.map(l => `
                <li><a href="${r(l.href)}" class="${l.href === currentHref ? 'active' : ''}">${l.label}${l.badge ? `<span class="nav-badge">${l.badge}</span>` : ''}</a></li>
              `).join('')}
            </ul>
            <div class="nav-actions">
              <div class="nav-search">
                <span class="nav-search-icon">🔍</span>
                <input type="text" placeholder="Search artists, news..." id="ugs-search-input">
              </div>
              <a href="${r('promotions.html')}" class="btn btn-acid" style="padding:10px 20px;font-size:11px;">Submit ↗</a>
            </div>
          </div>
        </div>
      </nav>`;
  };

})();
