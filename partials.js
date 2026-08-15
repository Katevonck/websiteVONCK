// ── Header, footer & CTA flottant partagés entre toutes les pages ──
// Source unique pour éviter que la nav / le footer ne divergent d'une page à l'autre.

const SITE_NAV = [
  { href: 'index.html', label: 'Accueil' },
  { href: 'kinesiologie.html', label: 'Kinésiologie' },
  { href: 'tambour.html', label: 'Soins au tambour' },
];

function currentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function renderHeader() {
  const page = currentPage();
  const desktopLinks = SITE_NAV.map(item => {
    const active = item.href === page ? ' active' : '';
    return `<li><a href="${item.href}" class="nav-link${active}">${item.label}</a></li>`;
  }).join('');
  const drawerLinks = SITE_NAV.map(item => {
    const active = item.href === page ? ' active' : '';
    return `<li><a href="${item.href}" class="nav-link${active}"><span class="nav-link-dot"></span>${item.label}</a></li>`;
  }).join('');

  return `
    <nav class="nav container">
      <a href="index.html" class="nav-logo">Katelyne Vonck</a>
      <button class="nav-burger" id="burger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
      <div class="nav-mobile-overlay" id="navOverlay"></div>
      <div class="nav-drawer" id="navLinks">
        <div class="nav-drawer-header">
          <p class="nav-drawer-logo">Katelyne Vonck</p>
          <p class="nav-drawer-tagline">Kinésiologue &amp; Soins vibratoires</p>
          <button class="nav-drawer-close" id="navClose" aria-label="Fermer">
            <span></span><span></span>
          </button>
        </div>
        <ul class="nav-drawer-links">${drawerLinks}</ul>
        <div class="nav-drawer-footer">
          <a href="contact.html#rdv" class="btn btn-primary btn-full nav-drawer-cta">Prendre rendez-vous</a>
          <a href="tel:+32478613975" class="nav-drawer-phone">+32 478 61 39 75</a>
        </div>
      </div>
      <ul class="nav-links-desktop">
        ${desktopLinks}
        <li><a href="contact.html#rdv" class="nav-link nav-cta">Prendre rendez-vous</a></li>
      </ul>
    </nav>
  `;
}

function renderFooter() {
  const navLines = SITE_NAV.map(item => `<li><a href="${item.href}">${item.label}</a></li>`).join('');

  return `
    <div class="container footer-grid">
      <div class="footer-brand">
        <p class="footer-logo">Katelyne Vonck</p>
        <p class="footer-tagline">Kinésiologue &amp; Praticienne en soins vibratoires</p>
        <p>Accompagnement holistique pour retrouver l'équilibre et le bien-être au quotidien pour toute la famille.</p>
        <div class="footer-social">
          <a href="https://www.facebook.com/katelynevonckkinesio/?locale=fr_FR" target="_blank" rel="noopener" aria-label="Facebook" class="social-link">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
          </a>
        </div>
      </div>
      <div class="footer-nav">
        <h4>Navigation</h4>
        <ul>
          ${navLines}
          <li><a href="contact.html#rdv">Prendre rendez-vous</a></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h4>Contact</h4>
        <ul>
          <li>94 rue Monin<br/>6061 Montignies-sur-Sambre, Belgique</li>
          <li><a href="tel:+32478613975">+32 478 61 39 75</a></li>
          <li><a href="mailto:kate.vonck@gmail.com">kate.vonck@gmail.com</a></li>
          <li>Lun – Ven : 16h30 – 20h00</li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom container">
      <p>© 2026 Katelyne Vonck Kinésiologue. Tous droits réservés.</p>
      <p><a href="#">Mentions légales</a> · <a href="#">Politique de confidentialité</a></p>
    </div>
  `;
}

function renderFab() {
  return `<a href="contact.html#rdv" class="fab" aria-label="Prendre rendez-vous">
    <svg viewBox="0 0 24 24" fill="none" width="22" height="22"><rect x="3" y="4" width="18" height="18" rx="2" stroke="white" stroke-width="2"/><path d="M16 2v4M8 2v4M3 10h18" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" stroke="white" stroke-width="2" stroke-linecap="round"/></svg>
  </a>`;
}

const headerEl = document.getElementById('header');
const footerEl = document.getElementById('site-footer');
const fabEl = document.getElementById('site-fab');

if (headerEl) headerEl.innerHTML = renderHeader();
if (footerEl) footerEl.innerHTML = renderFooter();
if (fabEl) fabEl.outerHTML = renderFab();
