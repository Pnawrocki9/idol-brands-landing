/**
 * Cookie Consent Manager
 * GDPR-compliant cookie consent implementation
 * Supports multi-language (EN/PL)
 */

class CookieConsent {
    constructor() {
        this.cookieName = 'idol_brands_cookie_consent';
        this.cookieExpiry = 365; // days
        this.translations = {
            en: {
                title: 'Cookie Consent',
                description: 'We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.',
                acceptAll: 'Accept All',
                rejectAll: 'Reject All',
                customize: 'Customize',
                savePreferences: 'Save Preferences',
                necessary: 'Necessary',
                necessaryDesc: 'Essential cookies required for the website to function properly.',
                analytics: 'Analytics',
                analyticsDesc: 'Help us understand how visitors interact with our website.',
                marketing: 'Marketing',
                marketingDesc: 'Used to track visitors across websites for marketing purposes.',
                learnMore: 'Learn more',
                privacyPolicy: 'Privacy Policy'
            },
            pl: {
                title: 'Zgoda na pliki cookie',
                description: 'Używamy plików cookie, aby poprawić jakość przeglądania, dostarczać spersonalizowane treści i analizować ruch. Klikając "Zaakceptuj wszystkie", wyrażasz zgodę na używanie plików cookie.',
                acceptAll: 'Zaakceptuj wszystkie',
                rejectAll: 'Odrzuć wszystkie',
                customize: 'Dostosuj',
                savePreferences: 'Zapisz preferencje',
                necessary: 'Niezbędne',
                necessaryDesc: 'Niezbędne pliki cookie wymagane do prawidłowego działania strony.',
                analytics: 'Analityczne',
                analyticsDesc: 'Pomagają nam zrozumieć, jak odwiedzający korzystają z naszej witryny.',
                marketing: 'Marketingowe',
                marketingDesc: 'Używane do śledzenia odwiedzających w celach marketingowych.',
                learnMore: 'Dowiedz się więcej',
                privacyPolicy: 'Polityka prywatności'
            }
        };
        
        this.init();
    }

    init() {
        // Detect language from HTML lang attribute
        const htmlLang = document.documentElement.lang || 'en';
        this.lang = htmlLang.startsWith('pl') ? 'pl' : 'en';
        
        // Check if user has already made a choice
        const consent = this.getConsent();
        if (!consent) {
            // Show cookie banner after a short delay
            setTimeout(() => this.showBanner(), 500);
        } else {
            // Apply consent preferences
            this.applyConsent(consent);
        }
        
        // Add settings button to open preferences
        this.addSettingsButton();
    }

    showBanner() {
        const banner = this.createBanner();
        document.body.appendChild(banner);
        
        // Animate in
        setTimeout(() => {
            banner.classList.add('cookie-consent-visible');
        }, 100);
    }

    createBanner() {
        const t = this.translations[this.lang];
        const privacyUrl = this.lang === 'pl' ? '/legal/gdpr-pl.html' : '/legal/gdpr.html';
        
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';
        banner.className = 'cookie-consent-banner';
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <div class="cookie-consent-header">
                    <h3>${t.title}</h3>
                </div>
                <div class="cookie-consent-body">
                    <p>${t.description}</p>
                    <p class="cookie-consent-learn-more">
                        <a href="${privacyUrl}" target="_blank">${t.learnMore}</a>
                    </p>
                </div>
                <div class="cookie-consent-actions">
                    <button class="cookie-btn cookie-btn-secondary" data-action="reject">${t.rejectAll}</button>
                    <button class="cookie-btn cookie-btn-secondary" data-action="customize">${t.customize}</button>
                    <button class="cookie-btn cookie-btn-primary" data-action="accept">${t.acceptAll}</button>
                </div>
            </div>
        `;
        
        // Attach event listeners
        banner.querySelector('[data-action="accept"]').addEventListener('click', () => this.acceptAll());
        banner.querySelector('[data-action="reject"]').addEventListener('click', () => this.rejectAll());
        banner.querySelector('[data-action="customize"]').addEventListener('click', () => this.showCustomize());
        
        return banner;
    }

    showCustomize() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) banner.remove();
        
        const modal = this.createCustomizeModal();
        document.body.appendChild(modal);
        
        setTimeout(() => {
            modal.classList.add('cookie-consent-visible');
        }, 100);
    }

    createCustomizeModal() {
        const t = this.translations[this.lang];
        const consent = this.getConsent() || {};
        
        const modal = document.createElement('div');
        modal.id = 'cookie-consent-modal';
        modal.className = 'cookie-consent-modal';
        modal.innerHTML = `
            <div class="cookie-consent-overlay"></div>
            <div class="cookie-consent-dialog">
                <div class="cookie-consent-header">
                    <h3>${t.title}</h3>
                    <button class="cookie-close-btn" aria-label="Close">&times;</button>
                </div>
                <div class="cookie-consent-body">
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <label class="cookie-toggle">
                                <input type="checkbox" checked disabled>
                                <span class="cookie-toggle-slider"></span>
                                <span class="cookie-toggle-label">${t.necessary}</span>
                            </label>
                        </div>
                        <p class="cookie-category-desc">${t.necessaryDesc}</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <label class="cookie-toggle">
                                <input type="checkbox" id="analytics-toggle" ${consent.analytics ? 'checked' : ''}>
                                <span class="cookie-toggle-slider"></span>
                                <span class="cookie-toggle-label">${t.analytics}</span>
                            </label>
                        </div>
                        <p class="cookie-category-desc">${t.analyticsDesc}</p>
                    </div>
                    
                    <div class="cookie-category">
                        <div class="cookie-category-header">
                            <label class="cookie-toggle">
                                <input type="checkbox" id="marketing-toggle" ${consent.marketing ? 'checked' : ''}>
                                <span class="cookie-toggle-slider"></span>
                                <span class="cookie-toggle-label">${t.marketing}</span>
                            </label>
                        </div>
                        <p class="cookie-category-desc">${t.marketingDesc}</p>
                    </div>
                </div>
                <div class="cookie-consent-actions">
                    <button class="cookie-btn cookie-btn-primary" data-action="save">${t.savePreferences}</button>
                </div>
            </div>
        `;
        
        // Attach event listeners
        modal.querySelector('.cookie-close-btn').addEventListener('click', () => modal.remove());
        modal.querySelector('.cookie-consent-overlay').addEventListener('click', () => modal.remove());
        modal.querySelector('[data-action="save"]').addEventListener('click', () => this.saveCustomPreferences());
        
        return modal;
    }

    addSettingsButton() {
        // Add a floating settings button to reopen preferences
        const button = document.createElement('button');
        button.id = 'cookie-settings-btn';
        button.className = 'cookie-settings-btn';
        button.innerHTML = '<i class="fas fa-cookie-bite"></i>';
        button.title = this.lang === 'pl' ? 'Ustawienia cookies' : 'Cookie settings';
        button.addEventListener('click', () => this.showCustomize());
        
        // Only show if user has made a choice
        if (this.getConsent()) {
            document.body.appendChild(button);
        }
    }

    acceptAll() {
        const consent = {
            necessary: true,
            analytics: true,
            marketing: true,
            timestamp: Date.now()
        };
        
        this.saveConsent(consent);
        this.applyConsent(consent);
        this.removeBanner();
        this.addSettingsButton();
    }

    rejectAll() {
        const consent = {
            necessary: true,
            analytics: false,
            marketing: false,
            timestamp: Date.now()
        };
        
        this.saveConsent(consent);
        this.applyConsent(consent);
        this.removeBanner();
        this.addSettingsButton();
    }

    saveCustomPreferences() {
        const analytics = document.getElementById('analytics-toggle').checked;
        const marketing = document.getElementById('marketing-toggle').checked;
        
        const consent = {
            necessary: true,
            analytics: analytics,
            marketing: marketing,
            timestamp: Date.now()
        };
        
        this.saveConsent(consent);
        this.applyConsent(consent);
        
        const modal = document.getElementById('cookie-consent-modal');
        if (modal) modal.remove();
        
        this.addSettingsButton();
    }

    saveConsent(consent) {
        const consentString = JSON.stringify(consent);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + this.cookieExpiry);
        
        document.cookie = `${this.cookieName}=${consentString};expires=${expiryDate.toUTCString()};path=/;SameSite=Lax`;
    }

    getConsent() {
        const cookies = document.cookie.split(';');
        for (let cookie of cookies) {
            const [name, value] = cookie.trim().split('=');
            if (name === this.cookieName) {
                try {
                    return JSON.parse(decodeURIComponent(value));
                } catch (e) {
                    return null;
                }
            }
        }
        return null;
    }

    applyConsent(consent) {
        // Apply consent preferences
        // This is where you would enable/disable various tracking scripts
        
        if (consent.analytics) {
            this.enableAnalytics();
        } else {
            this.disableAnalytics();
        }
        
        if (consent.marketing) {
            this.enableMarketing();
        } else {
            this.disableMarketing();
        }
        
        // Dispatch event for other scripts to listen to
        document.dispatchEvent(new CustomEvent('cookieConsentUpdated', { detail: consent }));
    }

    enableAnalytics() {
        // Example: Enable Google Analytics
        // window.gtag && window.gtag('consent', 'update', {'analytics_storage': 'granted'});
        console.log('Analytics cookies enabled');
    }

    disableAnalytics() {
        // Example: Disable Google Analytics
        // window.gtag && window.gtag('consent', 'update', {'analytics_storage': 'denied'});
        console.log('Analytics cookies disabled');
    }

    enableMarketing() {
        // Example: Enable marketing pixels
        // window.gtag && window.gtag('consent', 'update', {'ad_storage': 'granted'});
        console.log('Marketing cookies enabled');
    }

    disableMarketing() {
        // Example: Disable marketing pixels
        // window.gtag && window.gtag('consent', 'update', {'ad_storage': 'denied'});
        console.log('Marketing cookies disabled');
    }

    removeBanner() {
        const banner = document.getElementById('cookie-consent-banner');
        if (banner) {
            banner.classList.remove('cookie-consent-visible');
            setTimeout(() => banner.remove(), 300);
        }
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new CookieConsent());
} else {
    new CookieConsent();
}
