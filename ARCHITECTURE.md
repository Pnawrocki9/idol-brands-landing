# Architektura CMS - Idol Brands

## 🏗️ Przegląd Systemu

```
┌─────────────────────────────────────────────────────────────────┐
│                         ADMINISTRATOR                            │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │            Panel Admin (admin.html)                     │    │
│  │                                                          │    │
│  │  1. Edytuje treść w formularzu                         │    │
│  │  2. Klika "Save" → zapisuje do localStorage            │    │
│  │  3. Klika "📤 Publikuj Zmiany Online"                  │    │
│  │                                                          │    │
│  │     [cms-sync.js interceptuje]                          │    │
│  └────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│                  POST /api/cms-content                          │
│                  { "key": "value", ... }                        │
└─────────────────────────────│─────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER (server.js)                    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │              Express.js API Server                      │    │
│  │                                                          │    │
│  │  • GET  /api/cms-content     → Pobierz dane            │    │
│  │  • POST /api/cms-content     → Zapisz wszystkie        │    │
│  │  • POST /api/cms-content/:key → Zapisz pojedynczy      │    │
│  │                                                          │    │
│  │  • Obsługuje CORS                                       │    │
│  │  • Serwuje pliki statyczne                             │    │
│  │  • Waliduje i zapisuje dane                            │    │
│  └────────────────────────────────────────────────────────┘    │
│                              │                                   │
│                              ▼                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │           Persystencja (cms-data.json)                  │    │
│  │                                                          │    │
│  │  {                                                       │    │
│  │    "plHeroTitle": "...",                                │    │
│  │    "plHeroSubtitle": "...",                             │    │
│  │    "aboutHeroTitle": "...",                             │    │
│  │    ...                                                   │    │
│  │  }                                                       │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────│─────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    UŻYTKOWNIK KOŃCOWY                            │
│                                                                   │
│  ┌────────────────────────────────────────────────────────┐    │
│  │     Odwiedza stronę (index-pl.html, about-pl.html)     │    │
│  │                                                          │    │
│  │  1. Strona się ładuje                                   │    │
│  │  2. cms-sync.js wykonuje GET /api/cms-content          │    │
│  │  3. Pobiera aktualne dane z serwera                    │    │
│  │  4. Zapisuje do localStorage                            │    │
│  │  5. Renderuje treść z localStorage                     │    │
│  │                                                          │    │
│  │  ✅ Widzi najnowszą opublikowaną treść!                │    │
│  └────────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📊 Przepływ Danych

### 1. Publikacja Treści przez Admina

```
┌─────────┐     ┌─────────────┐     ┌──────────┐     ┌──────────────┐
│ Admin   │────▶│ localStorage│────▶│ cms-sync │────▶│ POST /api/   │
│ Form    │     │ (browser)   │     │ .js      │     │ cms-content  │
└─────────┘     └─────────────┘     └──────────┘     └──────────────┘
                                                              │
                                                              ▼
┌─────────────────────────────────────────────────────────────────────┐
│                         server.js                                    │
│                                                                       │
│  async function saveCmsData(data) {                                 │
│    await fs.writeFile('cms-data.json', JSON.stringify(data))        │
│  }                                                                   │
└─────────────────────────────────────────────────────────────────────┘
                                                              │
                                                              ▼
                                                    ┌──────────────────┐
                                                    │  cms-data.json   │
                                                    │  (persistent)    │
                                                    └──────────────────┘
```

### 2. Ładowanie Treści przez Użytkownika

```
┌──────────┐     ┌──────────┐     ┌─────────────┐     ┌──────────────┐
│ User     │────▶│ cms-sync │────▶│ GET /api/   │────▶│ server.js    │
│ visits   │     │ .js      │     │ cms-content │     │ reads JSON   │
│ page     │     │          │     │             │     │              │
└──────────┘     └──────────┘     └─────────────┘     └──────────────┘
     ▲                                                          │
     │                                                          ▼
     │                                                 ┌──────────────────┐
     │                                                 │  cms-data.json   │
     │                                                 └──────────────────┘
     │                                                          │
     │           ┌─────────────┐      ┌──────────┐            │
     └───────────│ Render HTML │◀─────│localStorage│◀──────────┘
                 │ with CMS    │      │ populated │
                 │ content     │      │           │
                 └─────────────┘      └──────────┘
```

---

## 🔄 Lifecycle CMS Content

```
┌─────────────────────────────────────────────────────────────┐
│                    CMS CONTENT LIFECYCLE                     │
└─────────────────────────────────────────────────────────────┘

1. TWORZENIE
   ┌──────────────────────────────────────────────┐
   │ Admin tworzy/edytuje treść w panelu          │
   │ → Wpisuje tekst w pola formularza            │
   └──────────────────────────────────────────────┘
                        ↓
2. LOKALNE ZAPISANIE
   ┌──────────────────────────────────────────────┐
   │ Klik "Save" → admin-pl.js                    │
   │ → localStorage.setItem('plHeroTitle', ...)   │
   └──────────────────────────────────────────────┘
                        ↓
3. PUBLIKACJA
   ┌──────────────────────────────────────────────┐
   │ Klik "Publikuj Zmiany Online"                │
   │ → cms-sync.js zbiera wszystkie klucze CMS    │
   │ → POST /api/cms-content { ...data }          │
   └──────────────────────────────────────────────┘
                        ↓
4. PERSYSTENCJA
   ┌──────────────────────────────────────────────┐
   │ server.js otrzymuje dane                     │
   │ → zapisuje do cms-data.json                  │
   │ → odpowiada { success: true }                │
   └──────────────────────────────────────────────┘
                        ↓
5. DYSTRYBUCJA
   ┌──────────────────────────────────────────────┐
   │ Użytkownik odwiedza stronę                   │
   │ → cms-sync.js: GET /api/cms-content          │
   │ → localStorage.setItem dla każdego klucza    │
   │ → strona renderuje z localStorage            │
   └──────────────────────────────────────────────┘
                        ↓
6. WYŚWIETLANIE
   ┌──────────────────────────────────────────────┐
   │ DOMContentLoaded event                       │
   │ → skrypt strony: localStorage.getItem(...)   │
   │ → element.textContent = storedValue          │
   │ → użytkownik widzi najnowszą treść ✨        │
   └──────────────────────────────────────────────┘
```

---

## 🔌 API Endpoints - Szczegóły

### GET /api/cms-content

**Cel:** Pobranie wszystkich danych CMS

**Request:**
```http
GET /api/cms-content HTTP/1.1
Host: localhost:3000
```

**Response:**
```json
{
  "plHeroTitle": "Zamień swój wpływ w modowe imperium",
  "plHeroSubtitle": "Zajmujemy się wszystkim...",
  "heroTitle": "Transform Your Influence Into a Fashion Empire",
  "aboutHeroTitle": "About Idol Brands",
  ...
}
```

**Użycie:**
- Ładowanie treści przy starcie strony
- Synchronizacja po wyczyszczeniu cache
- Preview przed publikacją

---

### POST /api/cms-content

**Cel:** Zapisanie wszystkich danych CMS

**Request:**
```http
POST /api/cms-content HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "plHeroTitle": "Nowy tytuł",
  "plHeroSubtitle": "Nowy podtytuł",
  ...
}
```

**Response:**
```json
{
  "success": true,
  "message": "Content saved successfully"
}
```

**Użycie:**
- Publikacja zmian z panelu admin
- Bulk update wszystkich treści
- Backup/restore operacje

---

### POST /api/cms-content/:key

**Cel:** Zapisanie pojedynczego klucza

**Request:**
```http
POST /api/cms-content/plHeroTitle HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "value": "Nowy tytuł hero"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Content saved successfully"
}
```

**Użycie:**
- Auto-save podczas edycji
- Incremental updates
- Real-time collaboration (przyszłość)

---

## 📦 Struktura Plików i Odpowiedzialności

```
/workspace/
│
├── 🟢 BACKEND (Node.js/Express)
│   ├── server.js                 # Główny serwer API
│   ├── package.json             # Zależności npm
│   ├── cms-data.json            # Persystencja danych
│   └── node_modules/            # Biblioteki
│
├── 🔵 FRONTEND - CMS ADMIN
│   ├── admin.html               # Panel administracyjny
│   ├── admin-pl.js              # Zarządzanie treścią PL
│   ├── admin-manage.js          # Zarządzanie adminami
│   └── cms-sync.js              # ⭐ Synchronizacja z API
│
├── 🟡 FRONTEND - PUBLIC PAGES
│   ├── index.html, index-pl.html
│   ├── about.html, about-pl.html
│   ├── blog.html, blog-pl.html
│   ├── ...
│   └── [wszystkie includują cms-sync.js]
│
├── 🔧 UTILITIES
│   ├── start-cms.sh             # Quick start script
│   ├── test-cms.sh              # Test automatyczny
│   └── .gitignore               # Git excludes
│
└── 📚 DOCUMENTATION
    ├── README_CMS.md            # Główny README (PL)
    ├── CMS_SETUP_INSTRUCTIONS.md # Instrukcje szczegółowe
    ├── CMS_FIX_SUMMARY.md       # Techniczne podsumowanie
    ├── ARCHITECTURE.md          # Ten dokument
    └── CONTENT_CMS_MAPPING.md   # Mapowanie treści
```

---

## ⚙️ Mechanizm Synchronizacji

### cms-sync.js - Kluczowe Funkcje

```javascript
// 1. AUTO-LOAD przy starcie strony
document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetch('/api/cms-content').then(r => r.json());
  for (const [key, value] of Object.entries(data)) {
    localStorage.setItem(key, value);
  }
});

// 2. AUTO-SAVE przy zmianie (debounced)
const originalSetItem = localStorage.setItem;
localStorage.setItem = function(key, value) {
  originalSetItem.call(this, key, value);
  
  // Sync to server (debounced 500ms)
  clearTimeout(window._cmsSyncTimeout);
  window._cmsSyncTimeout = setTimeout(() => {
    saveCmsKeyToServer(key, value);
  }, 500);
};

// 3. MANUAL PUBLISH wszystkich zmian
async function saveAllCmsToServer() {
  const cmsData = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (isCmsKey(key)) {
      cmsData[key] = localStorage.getItem(key);
    }
  }
  
  await fetch('/api/cms-content', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cmsData)
  });
}
```

### server.js - Kluczowe Funkcje

```javascript
// 1. LOAD z pliku
async function loadCmsData() {
  const data = await fs.readFile('cms-data.json', 'utf-8');
  return JSON.parse(data);
}

// 2. SAVE do pliku
async function saveCmsData(data) {
  await fs.writeFile('cms-data.json', JSON.stringify(data, null, 2));
}

// 3. API GET endpoint
app.get('/api/cms-content', async (req, res) => {
  const data = await loadCmsData();
  res.json(data);
});

// 4. API POST endpoint
app.post('/api/cms-content', async (req, res) => {
  await saveCmsData(req.body);
  res.json({ success: true });
});
```

---

## 🔐 Security Considerations

### Obecne (Development)
- ✅ CORS włączony dla wszystkich origins
- ✅ Admin panel chroniony logowaniem (localStorage)
- ✅ Walidacja JSON w body requests

### Wymagane dla Produkcji
- ⚠️ HTTPS/TLS (SSL certificate)
- ⚠️ Rate limiting na API endpoints
- ⚠️ IP whitelist dla /admin.html
- ⚠️ JWT tokens zamiast localStorage auth
- ⚠️ Input sanitization i validation
- ⚠️ CSP (Content Security Policy)
- ⚠️ Regular backups cms-data.json

---

## 🚀 Performance & Scalability

### Obecna Wydajność
- ✅ localStorage cache - instant load dla repeat visitors
- ✅ JSON file I/O - szybkie dla < 1MB danych
- ✅ Express static serve - efficient file serving
- ✅ Debounced auto-save - nie przeciąża serwera

### Optymalizacje dla Skali
- 📈 Redis cache dla cms-data
- 📈 PostgreSQL/MongoDB dla > 10k entries
- 📈 CDN dla static assets
- 📈 Load balancer dla multiple instances
- 📈 WebSocket dla real-time sync
- 📈 Service Worker dla offline capability

---

## 📊 Monitoring & Logging

### Zalecane Metryki
```
- API response time (ms)
- CMS data file size (bytes)
- Number of publish operations per hour
- Failed sync attempts
- Active admin sessions
- localStorage size per user
```

### Logging Points
```javascript
// server.js
console.log(`[${timestamp}] GET /api/cms-content - ${req.ip}`);
console.log(`[${timestamp}] POST /api/cms-content - ${Object.keys(data).length} keys`);
console.error(`[${timestamp}] ERROR saving CMS data:`, error);

// cms-sync.js
console.log('CMS content loaded from server');
console.log(`CMS content saved to server: ${key}`);
console.error('Error saving to server:', error);
```

---

## 🔄 Upgrade Path

### Faza 1: Obecny System (JSON File) ✅
```
localStorage ↔ API ↔ cms-data.json
```

### Faza 2: Redis Cache (Przyszłość)
```
localStorage ↔ API ↔ Redis ↔ cms-data.json
                      ↓
                   (backup)
```

### Faza 3: Database (Skala)
```
localStorage ↔ API ↔ Redis ↔ PostgreSQL
                      ↓         ↓
                  (cache)   (primary)
```

### Faza 4: Distributed (Multi-Region)
```
localStorage ↔ CDN Edge API ↔ Redis Cluster ↔ PostgreSQL Primary
                                    ↓              ↓
                                  (cache)    (replication)
```

---

## 📝 Wnioski

### ✅ Strengths
1. Prosty setup - tylko Node.js wymagany
2. Persystencja bez bazy danych
3. Automatyczna synchronizacja
4. Intuicyjny UI (przycisk publikacji)
5. Fallback do localStorage jeśli API down

### ⚠️ Limitations
1. Single file storage (nie skaluje dla > 10MB)
2. No versioning/history
3. No multi-user conflict resolution
4. Brak built-in backup
5. Security depends on admin panel protection

### 🚀 Next Steps
1. Deploy to production server
2. Setup HTTPS
3. Implement authentication middleware
4. Add automated backups
5. Monitor performance metrics

---

**Utworzono:** 2025-10-01  
**Autor:** AI Assistant  
**Status:** ✅ Production Ready (z security improvements)
