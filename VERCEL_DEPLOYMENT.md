# Wdrożenie CMS Idol Brands na Vercel

## 🚀 Instrukcja krok po kroku

### Krok 1: Przygotowanie konta Vercel

1. **Zarejestruj się na Vercel:**
   - Przejdź na: https://vercel.com/signup
   - Zaloguj się przez GitHub (używając konta Pnawrocki9)

2. **Połącz z GitHubem:**
   - Vercel automatycznie wykryje Twoje repozytoria
   - Daj dostęp do repozytorium `idol-brands-landing`

### Krok 2: Import projektu

1. **W Vercel Dashboard:**
   - Kliknij "Add New Project"
   - Wybierz repozytorium `Pnawrocki9/idol-brands-landing`

2. **Konfiguracja projektu:**
   ```
   Framework Preset: Other
   Root Directory: ./
   Build Command: (zostaw puste)
   Output Directory: (zostaw puste)
   Install Command: npm install
   ```

3. **Kliknij "Deploy"** - pierwsze wdrożenie zajmie 1-2 minuty

### Krok 3: Konfiguracja Vercel KV Storage

**WAŻNE:** Bez tego CMS nie będzie zapisywał danych trwale!

1. **W Vercel Dashboard:**
   - Przejdź do swojego projektu
   - Kliknij zakładkę "Storage"
   - Kliknij "Create Database"
   - Wybierz "KV" (Key-Value Store)

2. **Utwórz KV Database:**
   - Nazwa: `idol-brands-cms-storage`
   - Region: wybierz najbliższy (np. Frankfurt dla Europy)
   - Kliknij "Create"

3. **Połącz z projektem:**
   - Po utworzeniu bazy, kliknij "Connect to Project"
   - Wybierz swój projekt `idol-brands-landing`
   - Potwierdź

4. **Zmienne środowiskowe:**
   Vercel automatycznie doda zmienne:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_URL`

### Krok 4: Weryfikacja wdrożenia

1. **Otwórz swój URL Vercel:**
   - Będzie wyglądał jak: `https://idol-brands-landing.vercel.app`
   - Lub: `https://idol-brands-landing-[hash].vercel.app`

2. **Przetestuj CMS:**
   ```
   https://[twoj-url].vercel.app/admin.html
   ```
   - Login: admin
   - Hasło: idoladmin2025

3. **Sprawdź API:**
   ```
   https://[twoj-url].vercel.app/api/cms-content
   ```
   Powinno zwrócić: `{}`

### Krok 5: Pierwsza publikacja treści

1. **W panelu admin:**
   - Zaloguj się
   - Znajdź zielony przycisk "📤 Publikuj Zmiany Online" (prawy dolny róg)
   - Edytuj dowolną sekcję (np. "O Nas")
   - Kliknij "Save"
   - **Kliknij "Publikuj Zmiany Online"**

2. **Sprawdź w trybie incognito:**
   - Otwórz przeglądarkę w trybie incognito
   - Przejdź na: `https://[twoj-url].vercel.app/about-pl.html`
   - **Powinieneś zobaczyć swoje zmiany!** ✅

### Krok 6: Konfiguracja Custom Domain (opcjonalnie)

1. **W Vercel Dashboard:**
   - Zakładka "Settings" → "Domains"
   - Kliknij "Add Domain"
   - Wpisz swoją domenę (np. `idolbrands.com`)

2. **Skonfiguruj DNS:**
   - Vercel pokaże jakie rekordy DNS dodać
   - Dodaj je w swoim providerze domeny

## 📝 Struktura projektu dla Vercel

```
/workspace/
├── api/
│   └── cms-content.js       # Serverless API endpoint
├── vercel.json              # Konfiguracja Vercel
├── package.json             # Zależności Node.js
├── cms-sync.js              # Frontend sync script
├── admin.html               # Panel CMS
├── index.html               # Strona główna
└── ... (inne pliki HTML)
```

## 🔧 Jak działa CMS na Vercel

### Architektura:

```
┌─────────────────┐
│   Browser       │
│   (admin.html)  │
└────────┬────────┘
         │
         │ 1. Edycja → Save → Publikuj
         ↓
┌─────────────────────────────┐
│   cms-sync.js               │
│   POST /api/cms-content     │
└────────┬────────────────────┘
         │
         │ 2. HTTP Request
         ↓
┌──────────────────────────────┐
│   Vercel Serverless Function │
│   /api/cms-content.js        │
└────────┬─────────────────────┘
         │
         │ 3. Zapisz dane
         ↓
┌──────────────────────────────┐
│   Vercel KV Storage          │
│   (Trwałe przechowywanie)    │
└──────────────────────────────┘

User odwiedza stronę
         │
         ↓
┌──────────────────────────────┐
│   about-pl.html              │
│   + cms-sync.js              │
└────────┬─────────────────────┘
         │
         │ 4. GET /api/cms-content
         ↓
┌──────────────────────────────┐
│   Vercel KV Storage          │
│   → Zwraca dane CMS          │
└──────────────────────────────┘
         │
         ↓
   User widzi aktualne treści ✅
```

## ⚠️ Ważne uwagi

### 1. GitHub Pages vs Vercel
- **GitHub Pages:** Tylko statyczne pliki (HTML/CSS/JS) - CMS NIE DZIAŁA
- **Vercel:** Statyczne pliki + Serverless functions - CMS DZIAŁA ✅

**MUSISZ używać Vercel URL** aby CMS działał!

### 2. Automatyczne Deploymenty
Vercel automatycznie wdraża przy każdym pushu do GitHub:
- Push do `main` → Deploy na produkcję
- Push do innego brancha → Deploy preview

### 3. Bezpieczeństwo
⚠️ **ZMIEŃ HASŁO ADMINA** po pierwszym wdrożeniu!
- Przejdź do admin.html → Administrators → Edit → Zmień hasło

### 4. Backup danych
Dane w Vercel KV są bezpieczne, ale możesz robić backupy:
```bash
# GET request do API
curl https://[twoj-url].vercel.app/api/cms-content > backup.json
```

## 🐛 Rozwiązywanie problemów

### Problem 1: "Error saving to server"
**Przyczyna:** Vercel KV nie skonfigurowany
**Rozwiązanie:** 
- Sprawdź Settings → Environment Variables
- Powinny być: KV_REST_API_URL, KV_REST_API_TOKEN
- Jeśli brak → powtórz Krok 3

### Problem 2: Zmiany nie są widoczne
**Rozwiązanie:**
1. Kliknij "Publikuj Zmiany Online"
2. Sprawdź w trybie incognito
3. Sprawdź console (F12) - czy są błędy?
4. Sprawdź czy API działa: `https://[url]/api/cms-content`

### Problem 3: Błąd 404 na /api/cms-content
**Przyczyna:** vercel.json nie został wdrożony
**Rozwiązanie:**
- Sprawdź czy vercel.json jest w repozytorium
- Redeploy projektu w Vercel Dashboard

## 📊 Monitoring

### Logi Vercel:
1. Vercel Dashboard → Twój projekt
2. Zakładka "Deployments"
3. Kliknij na deployment → "View Function Logs"

### Sprawdź status:
```bash
# API endpoint
curl https://[twoj-url].vercel.app/api/cms-content

# Powinno zwrócić JSON z danymi CMS
```

## 🎉 Gotowe!

Po wykonaniu tych kroków:
- ✅ CMS jest wdrożony na Vercel
- ✅ Dane są zapisywane trwale w Vercel KV
- ✅ Zmiany są widoczne dla wszystkich użytkowników
- ✅ Automatyczne deploymenty z GitHub

**Twój CMS działa online!** 🚀

## 📞 Wsparcie

Jeśli coś nie działa:
1. Sprawdź Function Logs w Vercel
2. Sprawdź Console w przeglądarce (F12)
3. Sprawdź czy KV Storage jest połączony
4. Sprawdź dokumentację Vercel: https://vercel.com/docs
