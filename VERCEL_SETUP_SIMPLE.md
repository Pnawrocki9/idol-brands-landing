# 🚀 Vercel - Prosta Konfiguracja (bez KV)

## ✅ Nowe rozwiązanie: CMS zapisuje dane w GitHub

Zamiast Vercel KV, CMS teraz zapisuje dane bezpośrednio w repozytorium GitHub (`cms-data.json`).

**Zalety:**
- ✅ Prostsze (nie potrzeba KV)
- ✅ Dane w repozytorium (łatwy backup)
- ✅ Historia zmian w Git
- ✅ Darmowe

---

## 📋 Konfiguracja (3 kroki)

### Krok 1: Utwórz GitHub Personal Access Token

1. **Przejdź do GitHub Settings:**
   ```
   https://github.com/settings/tokens
   ```

2. **Kliknij: "Generate new token" → "Generate new token (classic)"**

3. **Wypełnij:**
   - **Note:** `Vercel CMS Access`
   - **Expiration:** 90 days (lub No expiration)
   - **Zaznacz uprawnienia:**
     - ✅ `repo` (wszystkie pod repo)

4. **Kliknij "Generate token"**

5. **SKOPIUJ TOKEN** (pokazuje się tylko raz!)
   - Będzie wyglądał jak: `ghp_xxxxxxxxxxxxxxxxxxxx`

---

### Krok 2: Dodaj token do Vercel

1. **W Vercel Dashboard:**
   - Twój projekt `idol-brands-landing`
   - Zakładka **"Settings"** → **"Environment Variables"**

2. **Dodaj zmienną:**
   - **Key:** `GITHUB_TOKEN`
   - **Value:** (wklej skopiowany token)
   - **Environments:** zaznacz **Production** i **Preview**
   - Kliknij **"Save"**

3. **Opcjonalnie - dodaj nazwę repo** (jeśli inna niż domyślna):
   - **Key:** `GITHUB_REPO`
   - **Value:** `Pnawrocki9/idol-brands-landing`
   - **Environments:** Production i Preview
   - Kliknij **"Save"**

---

### Krok 3: Redeploy projektu

1. **W Vercel Dashboard:**
   - Zakładka **"Deployments"**
   - Kliknij na najnowszy deployment
   - Kliknij **"Redeploy"**

2. **Poczekaj ~1 minutę** na deployment

---

## ✅ Testowanie

### 1. Otwórz admin panel:
```
https://idol-brands-landing.vercel.app/admin.html
```

### 2. Zaloguj się:
- Login: `admin`
- Hasło: `idoladmin2025`

### 3. Edytuj i publikuj:
- Zmień jakąś treść (np. sekcja "O Nas PL")
- Kliknij **"Save"**
- Kliknij **"📤 Publikuj Zmiany Online"** (prawy dolny róg)

### 4. Sprawdź w GitHub:
- Przejdź do: https://github.com/Pnawrocki9/idol-brands-landing
- Plik `cms-data.json` powinien się pojawić lub zaktualizować
- Zobaczysz nowy commit: "Update CMS content"

### 5. Sprawdź na stronie (tryb incognito):
```
https://idol-brands-landing.vercel.app/about-pl.html
```
- Twoje zmiany powinny być widoczne! ✅

---

## 🔍 Jak to działa?

```
Admin edytuje treść
        ↓
Klik "Publikuj Zmiany Online"
        ↓
POST /api/cms-content
        ↓
Serverless Function
        ↓
GitHub API
        ↓
Zapisuje cms-data.json w repo
        ↓
User odwiedza stronę
        ↓
GET /api/cms-content
        ↓
Odczytuje z cms-data.json
        ↓
Wyświetla aktualną treść ✅
```

---

## 🐛 Rozwiązywanie problemów

### Błąd: "Failed to save to GitHub"

**Sprawdź:**
1. Czy token GitHub jest poprawny?
   - Settings → Environment Variables → GITHUB_TOKEN
2. Czy token ma uprawnienia `repo`?
   - https://github.com/settings/tokens → sprawdź swój token
3. Czy redeploy'owałeś po dodaniu tokena?
   - Deployments → Redeploy

### Zmiany nie są widoczne

**Sprawdź:**
1. Czy kliknąłeś "Publikuj Zmiany Online"?
2. Czy sprawdzasz w trybie incognito?
3. Czy plik cms-data.json pojawił się w GitHub?
   - https://github.com/Pnawrocki9/idol-brands-landing/blob/main/cms-data.json
4. Sprawdź Function Logs w Vercel:
   - Deployments → kliknij deployment → "View Function Logs"

### Przycisk "Publikuj" nie widoczny

**Rozwiązanie:**
1. Odśwież stronę (Ctrl+F5)
2. Sprawdź Console (F12) - czy są błędy?
3. Sprawdź czy jesteś na Vercel URL (nie GitHub Pages)

---

## 📊 Porównanie metod storage

| Metoda | Trwałość | Łatwość | Historia | Koszt |
|--------|----------|---------|----------|-------|
| **GitHub API** | ✅ | ✅ | ✅ (commits) | ✅ Free |
| Vercel KV | ✅ | ⚠️ (setup) | ❌ | 💰 Hobby: Free, potem płatne |
| Environment Vars | ❌ (reset przy deploy) | ✅ | ❌ | ✅ Free |

**Wybraliśmy GitHub API** - najlepsze połączenie funkcjonalności i prostoty!

---

## ✨ Gotowe!

Po wykonaniu tych kroków:
- ✅ CMS zapisuje dane w GitHub
- ✅ Zmiany są widoczne dla wszystkich
- ✅ Masz historię wszystkich zmian w Git
- ✅ Łatwy backup (pobierz cms-data.json)

**CMS działa online!** 🎉
