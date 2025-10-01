# Instrukcje Konfiguracji CMS z Persystencją na Serwerze

## Problem Rozwiązany

Wcześniej CMS zapisywał zmiany tylko w localStorage przeglądarki administratora. Oznaczało to, że:
- ❌ Zmiany były widoczne tylko w przeglądarce administratora
- ❌ Odwiedzający stronę widzieli starą zawartość
- ❌ Zmiany znikały po wyczyszczeniu cache przeglądarki

**Teraz CMS automatycznie publikuje zmiany online!** ✅

## Jak to Działa Teraz

1. **Administrator edytuje treść w panelu CMS** → Zmiany zapisują się lokalnie
2. **Kliknięcie przycisku "Publikuj Zmiany Online"** → Treść wysyłana na serwer
3. **Serwer zapisuje dane w pliku `cms-data.json`** → Trwałe przechowywanie
4. **Odwiedzający stronę** → Automatycznie pobierają najnowszą treść z serwera

## Instalacja i Uruchomienie

### Krok 1: Instalacja zależności Node.js

```bash
cd /workspace
npm install
```

### Krok 2: Uruchomienie serwera CMS

**Opcja A: Tryb produkcyjny**
```bash
npm start
```

**Opcja B: Tryb deweloperski (z auto-restartem)**
```bash
npm run dev
```

Serwer uruchomi się na porcie 3000 (lub PORT określony w zmiennej środowiskowej).

### Krok 3: Dostęp do panelu administracyjnego

1. Otwórz przeglądarkę i przejdź do: `http://localhost:3000/admin.html`
2. Zaloguj się (domyślnie: `admin` / `idoladmin2025`)
3. Edytuj treści w CMS
4. **WAŻNE:** Kliknij przycisk **"📤 Publikuj Zmiany Online"** (zielony przycisk w prawym dolnym rogu)

## Nowe Funkcje

### 1. Przycisk "Publikuj Zmiany Online"

W panelu administracyjnym pojawi się zielony przycisk w prawym dolnym rogu:
- 📤 **Publikuj Zmiany Online** - publikuje wszystkie zmiany
- ⏳ **Publikowanie...** - podczas wysyłania
- ✅ **Opublikowano!** - po udanym zapisie
- ❌ **Błąd publikacji** - jeśli wystąpił problem

### 2. Automatyczna Synchronizacja

- Każda zmiana w CMS jest automatycznie wysyłana na serwer (z 500ms opóźnieniem)
- Serwer zapisuje dane w pliku `cms-data.json`
- Wszystkie strony automatycznie ładują najnowszą treść z serwera

### 3. Persystencja Danych

- Dane CMS są przechowywane w pliku `/workspace/cms-data.json`
- Plik jest automatycznie tworzony przy pierwszym zapisie
- Dane przetrwają restart serwera i wyczyszczenie cache przeglądarki

## Struktura Plików

```
/workspace/
├── server.js              # Serwer Express z API dla CMS
├── package.json           # Zależności Node.js
├── cms-sync.js           # Skrypt synchronizacji CMS (frontend)
├── cms-data.json         # Plik z danymi CMS (tworzony automatycznie)
├── admin.html            # Panel administracyjny (z dodanym cms-sync.js)
├── admin-pl.js           # Skrypt zarządzania treścią polską
├── admin-manage.js       # Skrypt zarządzania administratorami
├── index.html            # Strona główna (z cms-sync.js)
├── index-pl.html         # Strona główna PL (z cms-sync.js)
├── about.html            # Strona O Nas (z cms-sync.js)
├── about-pl.html         # Strona O Nas PL (z cms-sync.js)
└── ... (inne pliki HTML z cms-sync.js)
```

## API Endpoints

### GET /api/cms-content
Pobiera wszystkie dane CMS z serwera.

**Odpowiedź:**
```json
{
  "plHeroTitle": "...",
  "plHeroSubtitle": "...",
  "heroTitle": "...",
  ...
}
```

### POST /api/cms-content
Zapisuje wszystkie dane CMS na serwerze.

**Body:**
```json
{
  "plHeroTitle": "...",
  "plHeroSubtitle": "...",
  ...
}
```

### POST /api/cms-content/:key
Zapisuje pojedynczy klucz CMS.

**Body:**
```json
{
  "value": "Nowa wartość"
}
```

## Weryfikacja, że Działa

1. **Otwórz panel admin:** `http://localhost:3000/admin.html`
2. **Zmień tytuł na stronie głównej** (np. "Test CMS")
3. **Kliknij "Publikuj Zmiany Online"**
4. **Otwórz przeglądarkę incognito** (aby nie mieć localStorage)
5. **Przejdź do:** `http://localhost:3000/index-pl.html`
6. **Powinieneś zobaczyć:** "Test CMS" zamiast starego tytułu ✅

## Deployment na Serwer Produkcyjny

### Opcja 1: VPS/Dedicated Server

```bash
# Zainstaluj Node.js na serwerze
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Skopiuj pliki na serwer
scp -r /workspace/* user@your-server.com:/var/www/idol-brands/

# Na serwerze
cd /var/www/idol-brands
npm install
npm start
```

### Opcja 2: PM2 (Process Manager)

```bash
# Zainstaluj PM2
npm install -g pm2

# Uruchom serwer z PM2
pm2 start server.js --name "idol-brands-cms"

# Automatyczne uruchamianie po restarcie
pm2 startup
pm2 save
```

### Opcja 3: Docker

Stwórz `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t idol-brands-cms .
docker run -d -p 3000:3000 -v $(pwd)/cms-data.json:/app/cms-data.json idol-brands-cms
```

### Opcja 4: Nginx Reverse Proxy

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Backup i Restore

### Backup danych CMS
```bash
cp cms-data.json cms-data-backup-$(date +%Y%m%d).json
```

### Restore danych CMS
```bash
cp cms-data-backup-20241001.json cms-data.json
```

## Rozwiązywanie Problemów

### Problem: Przycisk "Publikuj" nie pojawia się
**Rozwiązanie:** Sprawdź, czy `cms-sync.js` jest załadowany w `admin.html`

### Problem: Zmiany nie są widoczne na stronie
**Rozwiązanie:** 
1. Sprawdź, czy serwer działa (`npm start`)
2. Sprawdź console w przeglądarce pod kątem błędów
3. Upewnij się, że kliknąłeś "Publikuj Zmiany Online"
4. Sprawdź, czy plik `cms-data.json` został utworzony

### Problem: Błąd CORS
**Rozwiązanie:** Serwer ma włączone CORS. Jeśli problem nadal występuje, sprawdź konfigurację w `server.js`

### Problem: Port 3000 zajęty
**Rozwiązanie:** Zmień port:
```bash
PORT=8000 npm start
```

## Bezpieczeństwo

⚠️ **WAŻNE dla produkcji:**

1. **Zmień domyślne hasło administratora** w panelu Admin → Administrators
2. **Włącz HTTPS** (użyj Let's Encrypt)
3. **Ogranicz dostęp do `/admin.html`** w konfiguracji serwera
4. **Regularnie rób backup** pliku `cms-data.json`
5. **Rozważ dodanie uwierzytelniania JWT** dla API endpoints

## Kontakt i Wsparcie

W razie pytań lub problemów, sprawdź:
- Plik `CONTENT_CMS_MAPPING.md` - mapowanie treści CMS
- Console w przeglądarce - komunikaty o błędach
- Log serwera - `console.log` w terminalu gdzie działa `npm start`
