# Dokumentacja Cookie Consent / Cookie Consent Documentation

## 🍪 Przegląd / Overview

### PL
Zaimplementowany został profesjonalny system zgody na pliki cookie zgodny ze standardami GDPR dla wersji polskiej i angielskiej strony Idol Brands. System automatycznie wykrywa język strony i wyświetla odpowiednie tłumaczenia.

### EN
A professional GDPR-compliant cookie consent system has been implemented for both Polish and English versions of the Idol Brands website. The system automatically detects the page language and displays appropriate translations.

---

## 🎯 Funkcjonalności / Features

### 1. **Banner Zgody / Consent Banner**
- Wyświetla się automatycznie przy pierwszej wizycie
- Animowany z dołu ekranu
- Zawiera pełne informacje o plikach cookie
- 3 główne opcje akcji: Zaakceptuj, Odrzuć, Dostosuj

*Automatically displays on first visit, animated from bottom, contains full cookie information, 3 main action options: Accept, Reject, Customize*

### 2. **Panel Dostosowania / Customization Panel**
- Modal z kategoriami plików cookie
- Możliwość wyboru indywidualnych kategorii
- Przełączniki on/off dla każdej kategorii
- Kategorie niezbędne (zawsze włączone)

*Modal with cookie categories, ability to select individual categories, on/off toggles for each category, necessary cookies always enabled*

### 3. **Kategorie Plików Cookie / Cookie Categories**

#### a) **Niezbędne / Necessary** (zawsze aktywne / always active)
- Wymagane do działania strony
- Nie można wyłączyć
- Przechowują preferencje użytkownika

*Required for website operation, cannot be disabled, store user preferences*

#### b) **Analityczne / Analytics** (opcjonalne / optional)
- Google Analytics i podobne
- Śledzenie ruchu na stronie
- Analiza zachowań użytkowników

*Google Analytics and similar, traffic tracking, user behavior analysis*

#### c) **Marketingowe / Marketing** (opcjonalne / optional)
- Reklamy personalizowane
- Remarketing
- Piksele konwersji

*Personalized advertising, remarketing, conversion pixels*

### 4. **Przycisk Ustawień / Settings Button**
- Stały przycisk po lewej stronie ekranu
- Ikona ciasteczka
- Pozwala ponownie otworzyć panel ustawień
- Pojawia się po pierwszej decyzji użytkownika

*Fixed button on left side of screen, cookie icon, allows reopening settings panel, appears after user's first decision*

---

## 💻 Implementacja Techniczna / Technical Implementation

### Pliki / Files

1. **`cookie-consent.js`** - Główna logika systemu
2. **`cookie-consent.css`** - Style i animacje
3. Dodano do wszystkich stron HTML w projekcie

### Sposób Działania / How It Works

```javascript
// 1. Inicjalizacja przy ładowaniu strony
// Initialization on page load
class CookieConsent {
    init() {
        // Wykrywa język z atrybutu HTML lang
        // Detects language from HTML lang attribute
        const htmlLang = document.documentElement.lang;
        this.lang = htmlLang.startsWith('pl') ? 'pl' : 'en';
        
        // Sprawdza czy użytkownik już wybrał opcje
        // Checks if user already made choices
        const consent = this.getConsent();
        if (!consent) {
            this.showBanner(); // Pokaż banner
        } else {
            this.applyConsent(consent); // Zastosuj zapisane ustawienia
        }
    }
}
```

### Przechowywanie Danych / Data Storage

**Cookie Name:** `idol_brands_cookie_consent`

**Format:** JSON
```json
{
    "necessary": true,
    "analytics": true,
    "marketing": false,
    "timestamp": 1696521600000
}
```

**Czas wygaśnięcia / Expiry:** 365 dni / days

**Zasięg / Scope:** Cała domena / Entire domain (`path=/`)

---

## 🔧 Zastosowanie w Praktyce / Practical Application

### Integracja z Google Analytics

```javascript
// W cookie-consent.js / In cookie-consent.js
enableAnalytics() {
    // Włącz Google Analytics
    if (window.gtag) {
        window.gtag('consent', 'update', {
            'analytics_storage': 'granted'
        });
    }
}

disableAnalytics() {
    // Wyłącz Google Analytics
    if (window.gtag) {
        window.gtag('consent', 'update', {
            'analytics_storage': 'denied'
        });
    }
}
```

### Nasłuchiwanie Zmian Zgody / Listening to Consent Changes

```javascript
// Inne skrypty mogą nasłuchiwać zmian
// Other scripts can listen to changes
document.addEventListener('cookieConsentUpdated', (event) => {
    const consent = event.detail;
    
    if (consent.analytics) {
        // Włącz tracking analytics
        // Enable analytics tracking
    }
    
    if (consent.marketing) {
        // Włącz piksele marketingowe
        // Enable marketing pixels
    }
});
```

---

## 🎨 Personalizacja / Customization

### Zmiana Kolorów / Changing Colors

W `cookie-consent.css`:
```css
/* Główny kolor przycisku / Primary button color */
.cookie-btn-primary {
    background: #000000; /* Zmień na swój kolor / Change to your color */
    color: #ffffff;
}

/* Kolor borderu bannera / Banner border color */
.cookie-consent-banner {
    border-top: 3px solid #000000; /* Zmień / Change */
}
```

### Zmiana Tłumaczeń / Changing Translations

W `cookie-consent.js`:
```javascript
this.translations = {
    en: {
        title: 'Cookie Consent', // Zmień tutaj / Change here
        description: '...',
        // itd. / etc.
    },
    pl: {
        title: 'Zgoda na pliki cookie',
        description: '...',
        // itd. / etc.
    }
}
```

---

## 📱 Responsywność / Responsiveness

System jest w pełni responsywny:

- **Desktop:** Banner na dole, modal wyśrodkowany
- **Tablet:** Dostosowane odstępy i rozmiary
- **Mobile:** Pełnoekranowy modal, przyciski pełnej szerokości

*Fully responsive system: Desktop - banner at bottom, centered modal; Tablet - adjusted spacing; Mobile - fullscreen modal, full-width buttons*

---

## ✅ Zgodność z GDPR / GDPR Compliance

### Wymagania Spełnione / Requirements Met:

1. ✅ **Przejrzystość** - Jasny opis użycia cookies
2. ✅ **Zgoda** - Aktywne potwierdzenie przed użyciem
3. ✅ **Granularność** - Wybór kategorii cookies
4. ✅ **Możliwość wycofania** - Przycisk ustawień zawsze dostępny
5. ✅ **Przechowywanie** - Zapisywanie preferencji użytkownika
6. ✅ **Czas trwania** - Ograniczony okres ważności (365 dni)

*Transparency - Clear cookie usage description; Consent - Active confirmation before use; Granularity - Cookie category selection; Withdrawal option - Settings button always available; Storage - User preference saving; Duration - Limited validity period (365 days)*

---

## 🔍 Testowanie / Testing

### Test Podstawowy / Basic Test

1. Otwórz stronę w trybie incognito
2. Powinien pojawić się banner cookie
3. Kliknij "Dostosuj" / "Customize"
4. Wyłącz kategorię Analytics
5. Kliknij "Zapisz preferencje" / "Save Preferences"
6. Odśwież stronę - banner nie powinien się pokazać
7. Kliknij przycisk ustawień (ikona cookie na dole po lewej)
8. Sprawdź czy twoje ustawienia zostały zapisane

*Open page in incognito, banner should appear, click Customize, disable Analytics, click Save, refresh page - banner shouldn't show, click settings button, check if settings saved*

### Test Wielojęzyczności / Multilingual Test

1. Otwórz `index.html` (EN) - tekst po angielsku
2. Otwórz `index-pl.html` (PL) - tekst po polsku
3. Sprawdź poprawność tłumaczeń w obu wersjach

*Open index.html (EN) - English text; Open index-pl.html (PL) - Polish text; Check translation accuracy in both versions*

### Test w Console / Console Test

```javascript
// Sprawdź zapisaną zgodę / Check saved consent
document.cookie.split(';').find(c => c.includes('idol_brands_cookie_consent'));

// Usuń zgodę (test ponownego wyświetlenia) / Delete consent (test redisplay)
document.cookie = 'idol_brands_cookie_consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
location.reload();
```

---

## 🚀 Rozszerzone Funkcje / Advanced Features

### Dodawanie Nowej Kategorii / Adding New Category

1. W `cookie-consent.js`, dodaj tłumaczenia:
```javascript
this.translations = {
    en: {
        // ...
        preferences: 'Preferences',
        preferencesDesc: 'Store your site preferences.'
    },
    pl: {
        // ...
        preferences: 'Preferencje',
        preferencesDesc: 'Zapisują Twoje preferencje.'
    }
}
```

2. Dodaj w `createCustomizeModal()`:
```javascript
<div class="cookie-category">
    <div class="cookie-category-header">
        <label class="cookie-toggle">
            <input type="checkbox" id="preferences-toggle">
            <span class="cookie-toggle-slider"></span>
            <span class="cookie-toggle-label">${t.preferences}</span>
        </label>
    </div>
    <p class="cookie-category-desc">${t.preferencesDesc}</p>
</div>
```

3. Zaktualizuj logikę w `saveCustomPreferences()` i `applyConsent()`

---

## 📊 Statystyki i Monitoring / Statistics and Monitoring

### Śledzenie Wyborów Użytkowników / Tracking User Choices

```javascript
// Przykład integracji z analytics
// Example analytics integration
document.addEventListener('cookieConsentUpdated', (event) => {
    const consent = event.detail;
    
    // Wyślij event do analytics
    // Send event to analytics
    if (window.gtag) {
        gtag('event', 'cookie_consent_update', {
            'necessary': consent.necessary,
            'analytics': consent.analytics,
            'marketing': consent.marketing
        });
    }
});
```

---

## 🛠️ Rozwiązywanie Problemów / Troubleshooting

### Problem: Banner się nie pokazuje
**Rozwiązanie:** 
- Sprawdź konsolę przeglądarki
- Upewnij się, że pliki CSS i JS są załadowane
- Usuń cookie i odśwież stronę

*Solution: Check browser console, ensure CSS/JS files loaded, delete cookie and refresh*

### Problem: Złe tłumaczenia
**Rozwiązanie:**
- Sprawdź atrybut `lang` w tagu `<html>`
- Upewnij się, że jest `lang="pl"` lub `lang="en"`

*Solution: Check lang attribute in html tag, ensure it's lang="pl" or lang="en"*

### Problem: Ustawienia się nie zapisują
**Rozwiązanie:**
- Sprawdź czy cookies są włączone w przeglądarce
- Upewnij się, że ścieżka cookie jest poprawna (`path=/`)

*Solution: Check if cookies enabled in browser, ensure cookie path is correct*

---

## 📋 Lista Zaktualizowanych Plików / Updated Files List

### Pliki Główne / Main Files
- ✅ `cookie-consent.js` (NOWY / NEW)
- ✅ `cookie-consent.css` (NOWY / NEW)

### Strony EN / EN Pages
- ✅ `index.html`
- ✅ `about.html`
- ✅ `blog.html`
- ✅ `how-it-works.html`
- ✅ `login.html`
- ✅ `post.html`
- ✅ `success-stories.html`
- ✅ `your-documents.html`
- ✅ `index-fashion.html`

### Strony PL / PL Pages
- ✅ `index-pl.html`
- ✅ `about-pl.html`
- ✅ `blog-pl.html`
- ✅ `how-it-works-pl.html`
- ✅ `login-pl.html`
- ✅ `post-pl.html`
- ✅ `success-stories-pl.html`
- ✅ `your-documents-pl.html`
- ✅ `index-fashion-pl.html`

### Strony Admin / Admin Pages
- ✅ `admin.html`
- ✅ `admin-login.html`

### Strony Prawne / Legal Pages
- ✅ `legal/cookies.html`
- ✅ `legal/cookies-pl.html`
- ✅ `legal/gdpr.html`
- ✅ `legal/gdpr-pl.html`
- ✅ `legal/terms.html`
- ✅ `legal/terms-pl.html`

---

## 🎓 Best Practices

### 1. **Regularnie Aktualizuj Politykę Cookies**
Upewnij się, że strony `/legal/cookies.html` i `/legal/cookies-pl.html` są aktualne z rzeczywistym użyciem cookies.

*Regularly update cookie policy. Ensure /legal/cookies.html pages are current with actual cookie usage.*

### 2. **Monitoruj Współczynnik Akceptacji**
Śledź ile osób akceptuje poszczególne kategorie, aby zoptymalizować komunikację.

*Monitor acceptance rate. Track category acceptance to optimize communication.*

### 3. **Testuj na Różnych Urządzeniach**
Sprawdź działanie na desktop, tablet i mobile przed wdrożeniem.

*Test on different devices. Check desktop, tablet, and mobile before deployment.*

### 4. **Dokumentuj Zmiany**
Prowadź log zmian w polityce cookies i implementacji technicznej.

*Document changes. Maintain changelog for cookie policy and technical implementation.*

---

## 📞 Wsparcie / Support

Jeśli masz pytania lub problemy z implementacją:
1. Sprawdź konsolę przeglądarki
2. Przejrzyj tę dokumentację
3. Przetestuj w trybie incognito
4. Sprawdź czy wszystkie pliki są załadowane

*If you have questions or implementation issues: Check browser console, review this documentation, test in incognito mode, check if all files are loaded.*

---

## 🔄 Przyszłe Ulepszenia / Future Enhancements

### Możliwe rozszerzenia:
- Integracja z Consent Management Platform (CMP)
- Eksport statystyk zgód
- A/B testing różnych wersji komunikatów
- Dodatkowe języki (DE, FR, ES)
- Integracja z Google Consent Mode v2

*Possible extensions: CMP integration, consent statistics export, A/B testing message versions, additional languages (DE, FR, ES), Google Consent Mode v2 integration*

---

## ✨ Podsumowanie / Summary

System zgody na pliki cookie został w pełni zaimplementowany zgodnie z najlepszymi praktykami rynkowymi i wymogami GDPR. Działa automatycznie, jest responsywny, wielojęzyczny i łatwy w zarządzaniu.

*Cookie consent system fully implemented according to market best practices and GDPR requirements. Works automatically, is responsive, multilingual, and easy to manage.*

**Data implementacji / Implementation date:** 2025-10-05
**Wersja / Version:** 1.0.0
**Status:** ✅ Gotowe do produkcji / Ready for production
