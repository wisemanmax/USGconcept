(function () {
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;

  function initPanelNav() {
    const shell = document.querySelector('.app-shell, .shell');
    const sidebar = document.querySelector('.sidebar, .sb');
    const header = document.querySelector('.top-header, .top-bar, .hd');
    if (!shell || !sidebar || !header) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'menu-toggle';
    toggle.setAttribute('aria-label', 'Toggle menu');
    toggle.textContent = '☰';
    header.prepend(toggle);

    const close = () => shell.classList.remove('sidebar-open');
    toggle.addEventListener('click', () => shell.classList.toggle('sidebar-open'));

    document.addEventListener('click', (e) => {
      if (!isMobile() || !shell.classList.contains('sidebar-open')) return;
      if (sidebar.contains(e.target) || header.contains(e.target)) return;
      close();
    });

    sidebar.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
    window.addEventListener('resize', () => {
      if (!isMobile()) close();
    });
  }

  function initPhase1Nav() {
    const primaryNav = document.querySelector('.primary-nav');
    const navInner = document.querySelector('.nav-inner');
    const menu = document.querySelector('.nav-menu');
    if (!primaryNav || !navInner || !menu) return;

    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'mobile-nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation');
    toggle.textContent = '☰';
    navInner.insertBefore(toggle, menu);

    const close = () => primaryNav.classList.remove('mobile-open');
    toggle.addEventListener('click', () => primaryNav.classList.toggle('mobile-open'));

    document.addEventListener('click', (e) => {
      if (!window.matchMedia('(max-width: 640px)').matches || !primaryNav.classList.contains('mobile-open')) return;
      if (primaryNav.contains(e.target)) return;
      close();
    });

    primaryNav.querySelectorAll('.nav-menu a').forEach((a) => a.addEventListener('click', close));
    window.addEventListener('resize', () => {
      if (!window.matchMedia('(max-width: 640px)').matches) close();
    });
  }

  initPanelNav();
  initPhase1Nav();
})();
