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

function logout() {
  localStorage.removeItem('loggedIn');
  // redirect to home page after logout
  window.location.href = 'index.html';
}

function updateNav() {
  const calcLink = document.getElementById('nav-calculator');
  const docLink = document.getElementById('nav-documents');
  const loginLink = document.getElementById('nav-login');
  const logoutLink = document.getElementById('nav-logout');
  const calcSection = document.getElementById('calculator-section');

    if (isLoggedIn()) {
        // show documents and logout links
        if (docLink) docLink.style.display = '';
        if (logoutLink) logoutLink.style.display = '';
        if (loginLink) loginLink.style.display = 'none';
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
        // reveal calculator section if present
        if (calcSection) calcSection.classList.remove('hidden');
    } else {
        // hide documents and logout links
        if (docLink) docLink.style.display = 'none';
        if (logoutLink) logoutLink.style.display = 'none';
        if (loginLink) loginLink.style.display = '';
        // point calculator link to login page
        if (calcLink) calcLink.setAttribute('href', 'login.html');
        // hide calculator section if present
        if (calcSection) calcSection.classList.add('hidden');
    }
}

// Run on every page load to adjust navigation and calculator state.
document.addEventListener('DOMContentLoaded', updateNav);