# 🚀 Netlify - Wdrożenie CMS (5 minut)

## ✅ Projekt jest gotowy na Netlify!

Wszystkie pliki konfiguracyjne są już na GitHubie.

---

## 📋 Krok po kroku:

### **Krok 1: Utwórz konto Netlify (1 minuta)**

1. Przejdź na: **https://app.netlify.com/signup**
2. Kliknij **"Sign up with GitHub"**
3. Zaloguj się kontem GitHub (Pnawrocki9)
4. Autoryzuj Netlify

---

### **Krok 2: Import projektu (2 minuty)**

1. W Netlify Dashboard kliknij: **"Add new site" → "Import an existing project"**

2. Wybierz **"Deploy with GitHub"**

3. Znajdź i wybierz: **`idol-brands-landing`**

4. **Konfiguracja (WAŻNE!):**
   - **Branch to deploy:** `main`
   - **Build command:** (zostaw puste)
   - **Publish directory:** `.` (kropka - główny katalog)
   - **Functions directory:** `netlify/functions` (powinno się auto-wykryć)

5. Kliknij **"Deploy site"**

6. Poczekaj ~1-2 minuty na deployment

---

### **Krok 3: Dodaj GitHub Token (2 minuty)**

**WAŻNE! Bez tego CMS nie będzie zapisywał danych!**

1. **W Netlify Dashboard:**
   - Przejdź do: **Site settings** → **Environment variables**
   - Lub: **Site configuration** → **Environment variables**

2. **Dodaj zmienną:**
   - Kliknij **"Add a variable"** lub **"Add variable"**
   - **Key:** `GITHUB_TOKEN`
   - **Value:** (wklej swój GitHub token - ten sam co wcześniej)
   - **Scopes:** zaznacz **"All scopes"** lub wybierz production + deploy previews
   - Kliknij **"Create variable"** lub **"Save"**

3. **Redeploy:**
   - Wróć do **Deploys**
   - Kliknij **"Trigger deploy" → "Deploy site"**
   - Poczekaj ~1 minutę

---

## ✅ Gotowe! Testuj CMS

### **Twój URL Netlify:**
```
https://[nazwa-strony].netlify.app
```
(Netlify wygeneruje automatycznie, np. `idol-brands-landing.netlify.app`)

### **Test CMS:**

1. **Otwórz panel admin:**
   ```
   https://[twoja-nazwa].netlify.app/admin.html
   ```

2. **Zaloguj się:**
   - Login: `admin`
   - Hasło: `idoladmin2025`

3. **Znajdź przycisk:**
   - Prawy dolny róg: **"📤 Publikuj Zmiany Online"**

4. **Edytuj i publikuj:**
   - Zmień jakiś tekst (np. sekcja "O Nas PL")
   - Kliknij **"Save About Content (PL)"**
   - Kliknij **"📤 Publikuj Zmiany Online"**
   - Powinieneś zobaczyć: "✅ Opublikowano!"

5. **Sprawdź w GitHub:**
   - https://github.com/Pnawrocki9/idol-brands-landing
   - Powinien pojawić się commit: "Update CMS content"
   - Plik `cms-data.json` z Twoimi zmianami

6. **Sprawdź na stronie (tryb incognito!):**
   ```
   https://[twoja-nazwa].netlify.app/about-pl.html
   ```
   - Twoje zmiany powinny być widoczne! 🎉

---

## 🔧 Jak to działa na Netlify

```
Admin edytuje w CMS
        ↓
Klik "Publikuj Zmiany Online"
        ↓
POST /.netlify/functions/cms-content
        ↓
Netlify Function (Node.js)
        ↓
GitHub API
        ↓
Zapisuje cms-data.json w repo
        ↓
User odwiedza stronę
        ↓
GET /.netlify/functions/cms-content
        ↓
Odczytuje z cms-data.json
        ↓
Wyświetla aktualną treść ✅
```

---

## 🎯 Netlify vs Vercel - Dlaczego Netlify?

| Feature | Netlify | Vercel |
|---------|---------|--------|
| Statyczne pliki | ✅ Łatwe | ⚠️ Wymaga konfiguracji |
| Serverless Functions | ✅ Proste | ⚠️ Skomplikowane |
| Setup | ✅ 5 minut | ❌ 30+ minut |
| Debugging | ✅ Łatwe | ⚠️ Trudne |
| Node.js functions | ✅ Auto-wykrywa | ❌ Wymaga package.json |

**Netlify to po prostu lepszy wybór dla tego projektu!** ✅

---

## 🐛 Rozwiązywanie problemów

### Problem: Błąd publikacji
**Sprawdź:**
1. Czy GitHub token jest dodany w Environment Variables?
2. Czy token ma uprawnienia `repo`?
3. Sprawdź Function logs: Deploys → kliknij deployment → Functions

### Problem: Function nie działa
**Sprawdź:**
1. Czy folder `netlify/functions` jest w repo?
2. Czy plik `netlify.toml` jest w głównym katalogu?
3. Function logs w Netlify

### Problem: Zmiany nie widoczne
**Sprawdź:**
1. Czy kliknąłeś "Publikuj Zmiany Online"?
2. Czy sprawdzasz w trybie incognito?
3. Czy pojawił się commit w GitHub?
4. Sprawdź: `https://[url]/.netlify/functions/cms-content`

---

## ✨ Custom Domain (opcjonalnie)

1. **W Netlify:** Domain settings → Add custom domain
2. **Skonfiguruj DNS** u swojego providera
3. **HTTPS** - Netlify auto-konfiguruje Let's Encrypt

---

## 🎉 Gotowe!

**CMS działa online!**
- ✅ Edytujesz w panelu admin
- ✅ Publikujesz na serwer
- ✅ Wszyscy widzą zmiany
- ✅ Historia w Git

**Powodzenia z Netlify!** 🚀
