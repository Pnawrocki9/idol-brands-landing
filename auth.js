// Simple client-side authentication helpers for Idol Brands landing pages.
//
// This script manages login state using `localStorage`. When a user logs in
// (see login.html), we set `loggedIn` to 'true'. Pages can call
// `isLoggedIn()` to check if the user is authenticated and adjust UI
// accordingly. The navigation and calculator visibility are toggled in
// `updateNav()` based on this state. A real application would implement
// server‑side authentication and secure credential handling; this demo uses
// a fixed credential and localStorage for simplicity.

function isLoggedIn() {
  return localStorage.getItem('loggedIn') === 'true';
}

// Check if the current user is logged in as administrator.  Admins have
// additional privileges such as editing site content and managing documents.
// We store a separate flag in localStorage to distinguish admin sessions.
function isAdmin() {
  return localStorage.getItem('adminLoggedIn') === 'true';
}

function logout() {
  // Clear both regular and admin login flags on logout.  This ensures
  // administrators are fully logged out and cannot access the admin dashboard.
  localStorage.removeItem('loggedIn');
  localStorage.removeItem('adminLoggedIn');
  // redirect to home page after logout
  window.location.href = 'index.html';
}

function updateNav() {
  const calcLink = document.getElementById('nav-calculator');
  const docLink = document.getElementById('nav-documents');
  const loginLink = document.getElementById('nav-login');
  const logoutLink = document.getElementById('nav-logout');
  const adminLink = document.getElementById('nav-admin');
  const calcSection = document.getElementById('calculator-section');

  // Mobile equivalents – these mirror the desktop nav items but live in the
  // collapsible mobile menu.  They may not exist on every page, so check
  // individually.  The IDs match their desktop counterparts with a "-mobile"
  // suffix.  updateNav() will hide/show and adjust hrefs for both sets.
  const calcLinkMobile = document.getElementById('nav-calculator-mobile');
  const docLinkMobile = document.getElementById('nav-documents-mobile');
  const loginLinkMobile = document.getElementById('nav-login-mobile');
  const logoutLinkMobile = document.getElementById('nav-logout-mobile');
  const adminLinkMobile = document.getElementById('nav-admin-mobile');

    if (isLoggedIn()) {
        // show documents and logout links
        if (docLink) docLink.style.display = '';
        if (docLinkMobile) docLinkMobile.style.display = '';
        if (logoutLink) logoutLink.style.display = '';
        if (logoutLinkMobile) logoutLinkMobile.style.display = '';
        if (loginLink) loginLink.style.display = 'none';
        if (loginLinkMobile) loginLinkMobile.style.display = 'none';
        // show admin link only if adminLoggedIn
        if (adminLink) {
          adminLink.style.display = isAdmin() ? '' : 'none';
        }
        if (adminLinkMobile) {
          adminLinkMobile.style.display = isAdmin() ? '' : 'none';
        }
        // Allow calculator link to anchor to the calculator section. Preserve the
        // original target (index.html#calculator-section or #calculator-section)
        if (calcLink) {
            // store original href on first run
            if (!calcLink.dataset.original) {
                calcLink.dataset.original = calcLink.getAttribute('href');
            }
            const original = calcLink.dataset.original;
            if (original && original.includes('index.html')) {
                calcLink.setAttribute('href', 'index.html#calculator-section');
            } else {
                calcLink.setAttribute('href', '#calculator-section');
            }
        }
        if (calcLinkMobile) {
            if (!calcLinkMobile.dataset.original) {
                calcLinkMobile.dataset.original = calcLinkMobile.getAttribute('href');
            }
            const original = calcLinkMobile.dataset.original;
            if (original && original.includes('index.html')) {
                calcLinkMobile.setAttribute('href', 'index.html#calculator-section');
            } else {
                calcLinkMobile.setAttribute('href', '#calculator-section');
            }
        }
        // reveal calculator section if present
        if (calcSection) calcSection.classList.remove('hidden');
    } else {
        // hide documents and logout links
        if (docLink) docLink.style.display = 'none';
        if (docLinkMobile) docLinkMobile.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'none';
        if (logoutLinkMobile) logoutLinkMobile.style.display = 'none';
        if (loginLink) loginLink.style.display = '';
        if (loginLinkMobile) loginLinkMobile.style.display = '';
        if (adminLink) adminLink.style.display = 'none';
        if (adminLinkMobile) adminLinkMobile.style.display = 'none';
        // point calculator link to login page
        if (calcLink) calcLink.setAttribute('href', 'login.html');
        if (calcLinkMobile) calcLinkMobile.setAttribute('href', 'login.html');
        // hide calculator section if present
        if (calcSection) calcSection.classList.add('hidden');
    }
}

// Set up the responsive mobile menu.  This attaches handlers to the
// hamburger button and manages the open/close state.  It also closes
// the menu when a link is clicked or when the Escape key is pressed.
function setupMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu = document.getElementById('mobileMenu');
  const icon = document.getElementById('menuIcon');
  if (!toggle || !menu || !icon) return;
  function openMenu() {
    menu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    toggle.setAttribute('aria-expanded', 'true');
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
    toggle.setAttribute('aria-label', 'Close menu');
  }
  function closeMenu() {
    menu.classList.add('hidden');
    document.body.style.overflow = '';
    toggle.setAttribute('aria-expanded', 'false');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
    toggle.setAttribute('aria-label', 'Open menu');
  }
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? closeMenu() : openMenu();
  });
  // Close when clicking a link inside the menu
  menu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      closeMenu();
    }
  });
  // Close on escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
}

// Load footer content from localStorage and populate footer elements on the page.
function loadFooter() {
  const defaultCompany = 'Time2Show, Inc.';
  const defaultAddress = '';
  const defaultReg = '';
  const defaultEmail = 'contact@idolbrands.com';
  const defaultPhone = '';
  const defaultExtra = 'Live-selling fashion marketplace.';
  const company = localStorage.getItem('footerCompanyName') || defaultCompany;
  const address = localStorage.getItem('footerAddress') || defaultAddress;
  const reg = localStorage.getItem('footerRegistration') || defaultReg;
  const email = localStorage.getItem('footerEmail') || defaultEmail;
  const phone = localStorage.getItem('footerPhone') || defaultPhone;
  const extra = localStorage.getItem('footerExtra') || defaultExtra;
  const instagram = localStorage.getItem('footerInstagram') || '';
  const tiktok = localStorage.getItem('footerTikTok') || '';
  const youtube = localStorage.getItem('footerYouTube') || '';
  const setText = (id, val) => {
    const el = document.getElementById(id);
    if (el && val) el.textContent = val;
  };
  setText('footer-company', company);
  // Also update company name in the secondary footer line if present
  setText('footer-company-bottom', company);
  setText('footer-address', address);
  setText('footer-reg', reg);
  const emailEl = document.getElementById('footer-email');
  if (emailEl) {
    emailEl.textContent = email;
    emailEl.href = 'mailto:' + email;
  }
  setText('footer-phone', phone);
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  setText('footer-extra', extra);
  // Social links
  const igEl = document.getElementById('social-ig');
  const ttEl = document.getElementById('social-tt');
  const ytEl = document.getElementById('social-yt');
  if (igEl && instagram) igEl.href = instagram;
  if (ttEl && tiktok) ttEl.href = tiktok;
  if (ytEl && youtube) ytEl.href = youtube;
}

// Attach click handlers to nav links once. These handlers ensure navigation works
// even if CSS layering or other scripts prevent the default <a> element
// behaviour. The handler is attached only once per element using a dataset flag.
function attachNavHandlers() {
  const calcLink = document.getElementById('nav-calculator');
  if (calcLink && !calcLink.dataset.handler) {
    calcLink.dataset.handler = 'true';
    calcLink.addEventListener('click', function (e) {
      const href = calcLink.getAttribute('href');
      // If href is an in-page anchor (starts with '#'), allow default behaviour
      if (href && !href.startsWith('#')) {
        e.preventDefault();
        window.location.href = href;
      }
    });
  }
  const loginLink = document.getElementById('nav-login');
  if (loginLink && !loginLink.dataset.handler) {
    loginLink.dataset.handler = 'true';
    loginLink.addEventListener('click', function (e) {
      // Always navigate to the login page via assignment to avoid prevented default
      e.preventDefault();
      window.location.href = 'login.html';
    });
  }
  const adminLink = document.getElementById('nav-admin');
  if (adminLink && !adminLink.dataset.handler) {
    adminLink.dataset.handler = 'true';
    adminLink.addEventListener('click', function (e) {
      // Navigate to the admin dashboard regardless of default anchor behaviour.
      e.preventDefault();
      window.location.href = 'admin.html';
    });
  }
}

// Run on every page load to adjust navigation and calculator state.
document.addEventListener('DOMContentLoaded', function () {
  updateNav();
  attachNavHandlers();
  setupMobileMenu();
  loadFooter();
});