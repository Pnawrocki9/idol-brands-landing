# Cookie Consent Backend & Dashboard

## 📋 Przegląd

System zbierania i analizy zgód użytkowników na pliki cookie z pełnym dashboard'em statystyk.

## 🎯 Funkcjonalności

### Backend (Netlify Function)
- ✅ Automatyczne zbieranie zgód użytkowników
- ✅ Przechowywanie danych w `cookie-consents.json`
- ✅ API do pobierania statystyk
- ✅ Śledzenie języka, czasu, URL i referera
- ✅ Automatyczne obliczanie statystyk

### Dashboard
- ✅ Przegląd głównych statystyk
- ✅ Wykresy wizualizujące dane
- ✅ Tabela ostatnich zgód
- ✅ Podział na języki (EN/PL)
- ✅ Auto-refresh co 30 sekund

## 📁 Struktura plików

```
/
├── netlify/functions/
│   └── cookie-consents.js        # Netlify Function
├── cookie-consent.js              # Zmodyfikowany - wysyła dane do backendu
├── cookie-consent-dashboard.html  # Dashboard HTML
├── cookie-consent-dashboard.js    # Dashboard JavaScript
└── cookie-consents.json           # Przechowywanie danych
```

## 🚀 Jak używać

### 1. Dostęp do Dashboard'u

Otwórz w przeglądarce:
```
https://twoja-domena.netlify.app/cookie-consent-dashboard.html
```

Lub lokalnie:
```
http://localhost:8888/cookie-consent-dashboard.html
```

### 2. Automatyczne zbieranie

System automatycznie zbiera zgody gdy użytkownik:
- Kliknie "Accept All"
- Kliknie "Reject All"  
- Zapisze niestandardowe preferencje

### 3. API Endpoints

#### GET - Pobierz statystyki
```javascript
fetch('/.netlify/functions/cookie-consents')
  .then(res => res.json())
  .then(data => console.log(data));
```

Zwraca:
```json
{
  "stats": {
    "total": 150,
    "accepted": 100,
    "rejected": 30,
    "customized": 20,
    "analytics": 120,
    "marketing": 100,
    "byLanguage": { "en": 80, "pl": 70 },
    "byDate": { "2025-10-05": 25 }
  },
  "recentConsents": [...]
}
```

#### POST - Zapisz zgodę (automatyczne)
```javascript
fetch('/.netlify/functions/cookie-consents', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    necessary: true,
    analytics: true,
    marketing: false,
    language: 'pl',
    url: window.location.href
  })
});
```

## 📊 Statystyki zbierane

Dla każdej zgody zapisujemy:
- ✅ Typ zgody (accepted/rejected/customized)
- ✅ Zgoda na analytics cookies
- ✅ Zgoda na marketing cookies
- ✅ Język interfejsu (en/pl)
- ✅ Czas zgody (timestamp)
- ✅ URL strony
- ✅ Referer
- ✅ IP użytkownika (anonimizowane)
- ✅ User Agent

## 🎨 Dashboard Features

### Karty statystyk
- **Total Consents** - Wszystkie zgody
- **Accepted All** - Zaakceptowali wszystko
- **Rejected All** - Odrzucili wszystko
- **Customized** - Niestandardowe preferencje

### Wykresy
- **Pie Chart** - Podział Analytics vs Marketing
- **Bar Chart** - Dystrybucja językowa

### Tabela
- 20 ostatnich zgód
- Szczegóły każdej zgody
- Czytelne etykiety i kolory

## 🔧 Konfiguracja

### Zmienne środowiskowe (Netlify)

```bash
GITHUB_TOKEN=ghp_your_token_here
GITHUB_REPO=Pnawrocki9/idol-brands-landing
```

### Lokalne testowanie

```bash
# Zainstaluj Netlify CLI
npm install -g netlify-cli

# Uruchom lokalnie
netlify dev

# Otwórz dashboard
open http://localhost:8888/cookie-consent-dashboard.html
```

## 📈 Przykładowe dane

Po zebraniu zgód dashboard wyświetli:
- Procent użytkowników akceptujących cookies
- Najpopularniejszy język
- Trend zgód w czasie
- Preferencje użytkowników

## 🔒 Bezpieczeństwo

- ✅ CORS włączony dla API
- ✅ Walidacja danych wejściowych
- ✅ Bezpieczne przechowywanie w GitHub
- ✅ Brak zapisywania wrażliwych danych
- ✅ GDPR compliant

## 🐛 Troubleshooting

### Dashboard nie ładuje danych
1. Sprawdź czy Netlify Function jest wdrożona
2. Sprawdź console w przeglądarce (F12)
3. Sprawdź czy `GITHUB_TOKEN` jest ustawiony

### Zgody nie zapisują się
1. Sprawdź czy `cookie-consents.json` istnieje
2. Sprawdź uprawnienia GitHub token
3. Sprawdź logi Netlify Functions

## 📝 Maintenance

### Czyszczenie starych danych

Możesz ręcznie edytować `cookie-consents.json` lub dodać endpoint do czyszczenia:

```json
{
  "consents": [],
  "stats": { "total": 0, ... }
}
```

### Eksport danych

Dane można łatwo wyeksportować:
1. Pobierz `cookie-consents.json` z repozytorium
2. Przetwórz w Excel/Google Sheets
3. Generuj raporty

## ✨ Przyszłe usprawnienia

- [ ] Eksport do CSV
- [ ] Więcej wykresów (timeline)
- [ ] Filtrowanie danych
- [ ] Email notifications
- [ ] A/B testing consent UI
- [ ] Heat maps
- [ ] Integracja z Google Analytics

## 📞 Support

Jeśli masz pytania lub problemy, sprawdź:
- Logi Netlify Functions
- Console w przeglądarce
- GitHub Issues

---

Utworzono: 2025-10-05
Autor: Cursor AI
Czas implementacji: ~15 minut
