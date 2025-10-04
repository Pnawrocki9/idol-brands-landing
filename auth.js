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
  // Redirect to home page after logout, preserving language preference
  // Check if current page is Polish version and redirect accordingly
  const currentPage = window.location.pathname;
  if (currentPage.includes('-pl.html') || currentPage.endsWith('/index-pl.html')) {
    window.location.href = 'index-pl.html';
  } else {
    window.location.href = 'index.html';
  }
}

// Update visibility of Success Stories navigation links based on admin settings
function updateSuccessStoriesVisibility() {
  // Check if Success Stories should be visible (default is true if not set)
  const showSuccessStories = localStorage.getItem('showSuccessStories') !== 'false';
  
  // Find all Success Stories links in desktop and mobile navigation
  // We need to find them by href since they don't have specific IDs
  const allLinks = document.querySelectorAll('a[href*="success-stories"]');
  
  allLinks.forEach(link => {
    // Check if the link is inside an <li> element (e.g., in footer)
    const parentLi = link.closest('li');
    const elementToHide = parentLi || link;
    
    if (showSuccessStories) {
      elementToHide.style.display = '';
    } else {
      elementToHide.style.display = 'none';
    }
  });
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

  // Handle Success Stories visibility based on admin settings
  updateSuccessStoriesVisibility();

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
        // original target (index.html#calculator-section or index-pl.html#calculator-section)
        // Determine the correct index page based on current page language
        const currentPage = window.location.pathname;
        const isPolish = currentPage.includes('-pl.html');
        const targetIndex = isPolish ? 'index-pl.html#calculator-section' : 'index.html#calculator-section';
        
        if (calcLink) {
            calcLink.setAttribute('href', targetIndex);
        }
        if (calcLinkMobile) {
            calcLinkMobile.setAttribute('href', targetIndex);
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
        // point calculator link to login page (maintain language preference)
        const currentPage = window.location.pathname;
        const isPolish = currentPage.includes('-pl.html');
        const loginPage = isPolish ? 'login-pl.html' : 'login.html';
        if (calcLink) calcLink.setAttribute('href', loginPage);
        if (calcLinkMobile) calcLinkMobile.setAttribute('href', loginPage);
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
  // Handle both desktop and mobile calculator links
  const calcLink = document.getElementById('nav-calculator');
  const calcLinkMobile = document.getElementById('nav-calculator-mobile');
  
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
  
  if (calcLinkMobile && !calcLinkMobile.dataset.handler) {
    calcLinkMobile.dataset.handler = 'true';
    calcLinkMobile.addEventListener('click', function (e) {
      const href = calcLinkMobile.getAttribute('href');
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
      // Always navigate to the login page via assignment (maintain language preference)
      e.preventDefault();
      const currentPage = window.location.pathname;
      const isPolish = currentPage.includes('-pl.html');
      window.location.href = isPolish ? 'login-pl.html' : 'login.html';
    });
  }
  
  const loginLinkMobile = document.getElementById('nav-login-mobile');
  if (loginLinkMobile && !loginLinkMobile.dataset.handler) {
    loginLinkMobile.dataset.handler = 'true';
    loginLinkMobile.addEventListener('click', function (e) {
      // Always navigate to the login page via assignment (maintain language preference)
      e.preventDefault();
      const currentPage = window.location.pathname;
      const isPolish = currentPage.includes('-pl.html');
      window.location.href = isPolish ? 'login-pl.html' : 'login.html';
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
  
  const adminLinkMobile = document.getElementById('nav-admin-mobile');
  if (adminLinkMobile && !adminLinkMobile.dataset.handler) {
    adminLinkMobile.dataset.handler = 'true';
    adminLinkMobile.addEventListener('click', function (e) {
      // Navigate to the admin dashboard regardless of default anchor behaviour.
      e.preventDefault();
      window.location.href = 'admin.html';
    });
  }
}

// Handle hash navigation after page load. If the URL contains a hash (e.g.,
// #calculator-section), ensure the target element is visible and scroll to it.
// This fixes the issue where navigating from a subpage to index.html#calculator-section
// wouldn't scroll properly because the calculator section was initially hidden.
function handleHashNavigation() {
  const hash = window.location.hash;
  if (hash) {
    // Remove the '#' to get the element ID
    const targetId = hash.substring(1);
    const target = document.getElementById(targetId);
    
    if (target) {
      // Ensure the target is visible (remove 'hidden' class if present)
      target.classList.remove('hidden');
      
      // Scroll to the target after a short delay to ensure rendering is complete
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }
}

// Run on every page load to adjust navigation and calculator state.
document.addEventListener('DOMContentLoaded', function () {
  updateNav();
  attachNavHandlers();
  setupMobileMenu();
  loadFooter();
  handleHashNavigation();
});