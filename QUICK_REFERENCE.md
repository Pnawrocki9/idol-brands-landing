# 📋 CMS Quick Reference Card

## 🚀 Start/Stop

```bash
# Start server
npm start                    # Production
npm run dev                  # Development (auto-restart)
./start-cms.sh              # Quick start with checks

# Stop server
Ctrl+C                      # In terminal
pkill -f 'node server.js'   # From another terminal

# Change port
PORT=8000 npm start
```

---

## 🔗 URLs

| Page | URL |
|------|-----|
| **Admin Panel** | http://localhost:3000/admin.html |
| **Home (PL)** | http://localhost:3000/index-pl.html |
| **Home (EN)** | http://localhost:3000/index.html |
| **About (PL)** | http://localhost:3000/about-pl.html |
| **About (EN)** | http://localhost:3000/about.html |
| **API Get** | http://localhost:3000/api/cms-content |

---

## 🔑 Login

```
Username: admin
Password: idoladmin2025
```

⚠️ **ZMIEŃ W PRODUKCJI!** Panel Admin → Administrators

---

## 📝 Workflow Publikacji

```
1. Login → admin.html
2. Edytuj treść
3. Klik "Save" (sekcja)
4. Klik "📤 Publikuj Zmiany Online" (prawy dolny róg)
5. Sprawdź w incognito
```

---

## 🧪 Testing

```bash
# Run automatic test
./test-cms.sh

# Manual API test
curl http://localhost:3000/api/cms-content

# Test publish
curl -X POST http://localhost:3000/api/cms-content \
  -H "Content-Type: application/json" \
  -d '{"testKey":"testValue"}'

# Check data file
cat cms-data.json
```

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `server.js` | Backend API server |
| `cms-sync.js` | Frontend sync script |
| `cms-data.json` | Persisted CMS data |
| `admin-pl.js` | Polish content management |
| `package.json` | Dependencies |

---

## 🔧 Common Commands

```bash
# Install dependencies
npm install

# Check server status
lsof -i :3000

# View logs (if running in background)
tail -f logs/server.log

# Backup CMS data
cp cms-data.json cms-data-backup-$(date +%Y%m%d).json

# Restore from backup
cp cms-data-backup-20241001.json cms-data.json

# Clear all CMS data
rm cms-data.json
# (will be recreated empty on next save)
```

---

## 🐛 Quick Fixes

### Zmiany nie są widoczne
```bash
✓ Sprawdź czy serwer działa: curl http://localhost:3000
✓ Kliknij "Publikuj Zmiany Online"
✓ Sprawdź w trybie incognito
✓ Sprawdź console (F12) w przeglądarce
```

### Serwer nie startuje
```bash
✓ Port zajęty? → PORT=8000 npm start
✓ Brak node_modules? → npm install
✓ Node.js zainstalowany? → node --version
```

### Przycisk "Publikuj" nie widoczny
```bash
✓ Odśwież stronę admin.html
✓ Sprawdź console (F12) czy brak błędów
✓ Sprawdź: grep "cms-sync.js" admin.html
```

---

## 📊 API Endpoints

### GET /api/cms-content
```bash
curl http://localhost:3000/api/cms-content
```
**Returns:** `{ "key": "value", ... }`

### POST /api/cms-content
```bash
curl -X POST http://localhost:3000/api/cms-content \
  -H "Content-Type: application/json" \
  -d '{"plHeroTitle":"New Title"}'
```
**Returns:** `{ "success": true, "message": "..." }`

### POST /api/cms-content/:key
```bash
curl -X POST http://localhost:3000/api/cms-content/plHeroTitle \
  -H "Content-Type: application/json" \
  -d '{"value":"New Title"}'
```
**Returns:** `{ "success": true, "message": "..." }`

---

## 🎨 Przycisk Publikacji - Stany

| Icon | Text | Meaning |
|------|------|---------|
| 📤 | "Publikuj Zmiany Online" | Ready to publish |
| ⏳ | "Publikowanie..." | Publishing in progress |
| ✅ | "Opublikowano!" | Success (green) |
| ❌ | "Błąd publikacji" | Error (red) |

---

## 📁 File Structure

```
/workspace/
├── server.js              ← Backend
├── cms-sync.js           ← Frontend sync
├── cms-data.json         ← Data storage
├── admin.html            ← Admin panel
├── *.html                ← Public pages (17 files)
├── package.json          ← Dependencies
└── README_CMS.md         ← Main docs
```

---

## 🔐 Security Checklist (Produkcja)

```
□ Zmień hasło admin
□ Włącz HTTPS
□ IP whitelist dla /admin.html
□ Backup cms-data.json codziennie
□ Rate limiting na API
□ CSP headers
□ Input validation
```

---

## 📖 Documentation

| File | Purpose |
|------|---------|
| `README_CMS.md` | Main guide (Polish) |
| `CMS_SETUP_INSTRUCTIONS.md` | Detailed setup |
| `CMS_FIX_SUMMARY.md` | Technical summary |
| `ARCHITECTURE.md` | System architecture |
| `CONTENT_CMS_MAPPING.md` | Content mapping |
| `QUICK_REFERENCE.md` | This file |

---

## 💡 Tips

1. **Always click "Publikuj Zmiany Online"** after saving changes
2. **Test in incognito** to verify changes are published
3. **Backup cms-data.json** before major changes
4. **Check console (F12)** if something doesn't work
5. **Use ./test-cms.sh** to verify system health

---

## 🆘 Get Help

1. Check console (F12) for errors
2. Check server logs in terminal
3. Run `./test-cms.sh`
4. Read `CMS_SETUP_INSTRUCTIONS.md`
5. Check `ARCHITECTURE.md` for system design

---

## ✅ Quick Verification

After starting server:
```bash
# 1. Server running?
curl http://localhost:3000

# 2. API working?
curl http://localhost:3000/api/cms-content

# 3. Admin accessible?
# Open: http://localhost:3000/admin.html

# 4. All tests pass?
./test-cms.sh
```

All green? **You're good to go!** 🚀

---

**Version:** 1.0  
**Last Updated:** 2025-10-01  
**Print this for your desk!** 📄
