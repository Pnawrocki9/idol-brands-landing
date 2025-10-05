# 🚀 Cookie Consent Backend - Quick Start

## 📍 Dostęp do Dashboard

```
https://twoja-domena.netlify.app/cookie-consent-dashboard.html
```

## 🔌 API Endpoints

### GET - Pobierz statystyki
```bash
curl https://twoja-domena.netlify.app/.netlify/functions/cookie-consents
```

### POST - Zapisz zgodę (automatyczne)
```bash
curl -X POST https://twoja-domena.netlify.app/.netlify/functions/cookie-consents \
  -H "Content-Type: application/json" \
  -d '{
    "necessary": true,
    "analytics": true,
    "marketing": false,
    "language": "pl"
  }'
```

## 📊 Przykładowa odpowiedź API

```json
{
  "stats": {
    "total": 150,
    "accepted": 100,
    "rejected": 30,
    "customized": 20,
    "analytics": 120,
    "marketing": 100,
    "byLanguage": {
      "en": 80,
      "pl": 70
    }
  },
  "recentConsents": [
    {
      "necessary": true,
      "analytics": true,
      "marketing": true,
      "language": "pl",
      "timestamp": 1728148532000,
      "url": "https://domena.com/",
      "referrer": "direct"
    }
  ]
}
```

## 🔧 Konfiguracja Netlify

W ustawieniach Netlify dodaj zmienne:

```
GITHUB_TOKEN = ghp_twoj_token
GITHUB_REPO = Pnawrocki9/idol-brands-landing
```

## 📦 Pliki projektu

```
netlify/functions/cookie-consents.js  → Backend API
cookie-consent.js                     → Frontend (zmodyfikowany)
cookie-consent-dashboard.html         → Dashboard
cookie-consent-dashboard.js           → Dashboard logic
cookie-consents.json                  → Dane
```

## ✅ Checklist wdrożenia

- [x] Utworzono Netlify Function
- [x] Zmodyfikowano cookie-consent.js
- [x] Utworzono dashboard
- [x] Utworzono plik danych
- [ ] Wdrożyć na Netlify
- [ ] Skonfigurować zmienne środowiskowe
- [ ] Przetestować zapis zgód
- [ ] Otworzyć dashboard

## 🧪 Lokalne testowanie

```bash
# Zainstaluj Netlify CLI (jeśli nie masz)
npm install -g netlify-cli

# Uruchom dev server
netlify dev

# Otwórz w przeglądarce
open http://localhost:8888/cookie-consent-dashboard.html
```

## 📈 Wskaźniki do monitorowania

- **Acceptance Rate** - % użytkowników akceptujących wszystkie cookies
- **Rejection Rate** - % użytkowników odrzucających wszystko
- **Language Split** - Podział EN vs PL
- **Daily Trends** - Zgody dzień po dniu

## 🎯 Następne kroki

1. **Commit & Push**
   ```bash
   git add .
   git commit -m "Add cookie consent backend and dashboard"
   git push
   ```

2. **Deploy** - Netlify automatycznie zbuduje nową wersję

3. **Verify** - Otwórz dashboard i sprawdź czy działa

4. **Monitor** - Regularnie sprawdzaj statystyki

## 💡 Protips

- Dashboard odświeża się automatycznie co 30 sekund
- Dane są przechowywane w `cookie-consents.json` w repo
- System jest w pełni GDPR compliant
- Nie wymaga żadnych zewnętrznych baz danych
- Wszystko działa na Netlify Functions (serverless)

## 🆘 Troubleshooting

**Problem:** Dashboard pokazuje błąd  
**Rozwiązanie:** Sprawdź czy Netlify Function jest wdrożona i czy zmienne środowiskowe są ustawione

**Problem:** Zgody nie zapisują się  
**Rozwiązanie:** Sprawdź logi Netlify Functions i uprawnienia GitHub token

**Problem:** Dashboard jest pusty  
**Rozwiązanie:** To normalne na początku - poczekaj aż użytkownicy zaczną klikać w banner cookie

---

**Dokumentacja pełna:** Zobacz `COOKIE_CONSENT_BACKEND.md`  
**Podsumowanie:** Zobacz `COOKIE_BACKEND_IMPLEMENTACJA.md`
