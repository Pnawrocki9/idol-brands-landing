# 📖 Instrukcja: Jak Uruchamiać Audyt SEO

**Wersja:** 1.0  
**Data:** 2025-10-11  
**Dla:** Idol Brands

---

## 🎯 Szybki Start (Quick Reference)

```bash
# Pełny audyt SEO (rekomendowane)
cd /workspace
node scripts/seo/audit-crawler.js

# Audyt wydajności
node scripts/seo/lighthouse-audit.js

# Oba audyty naraz
node scripts/seo/audit-crawler.js && node scripts/seo/lighthouse-audit.js
```

**Wyniki zapisywane są automatycznie:**
- `seo/findings.csv` - lista problemów SEO
- `seo/lighthouse-summary.json` - wyniki wydajności

---

## 📋 Kompletna Instrukcja Krok Po Kroku

### **Krok 1: Przygotowanie**

Upewnij się, że jesteś w głównym katalogu projektu:

```bash
cd /workspace
```

Sprawdź czy skrypty istnieją:

```bash
ls -la scripts/seo/
```

Powinieneś zobaczyć:
- ✅ `audit-crawler.js`
- ✅ `lighthouse-audit.js`
- ✅ `bulk-apply-seo.js`
- ✅ `bulk-apply-all-remaining.js`
- ✅ `README.md`

---

### **Krok 2: Uruchom Audyt SEO**

#### **Opcja A: Podstawowy audyt (zalecane)**

```bash
node scripts/seo/audit-crawler.js
```

**Co sprawdza:**
- ✅ Meta descriptions (150-160 znaków)
- ✅ Title tags (30-60 znaków)
- ✅ Canonical URLs
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ Schema.org structured data
- ✅ H1 tags (unikalność)
- ✅ Lang attributes
- ✅ Image alt texts
- ✅ Render-blocking resources
- ✅ Lazy loading

**Output przykładowy:**
```
🔍 Starting SEO Audit Crawler...

✅ Audit complete! Found 122 issues.
📄 Report saved to: seo/findings.csv

📊 Summary by Priority:
   P0 (Critical): 10
   P1 (High):     78
   P2 (Medium):   34
```

---

#### **Opcja B: Audyt wydajności**

```bash
node scripts/seo/lighthouse-audit.js
```

**Co sprawdza:**
- ⚡ Render-blocking scripts
- 🖼️ External stylesheets
- 📸 Lazy loading images
- 🔗 Preconnect/preload
- 🔤 Font optimization
- 📦 Inline styles size

**Output przykładowy:**
```
🚀 Starting Lighthouse Performance Audit...

📄 Homepage (/)
   Performance Score: 85/100
   Issues:
   - 1 render-blocking scripts
   - Missing preconnect for external resources

📄 About (/about.html)
   Performance Score: 92/100
   Issues:
   - 1 render-blocking scripts

✅ Performance audit complete!
```

---

### **Krok 3: Analiza Wyników**

#### **Wyświetl raport CSV:**

```bash
# Cały raport
cat seo/findings.csv

# Tylko nagłówki
head -1 seo/findings.csv

# Pierwsze 20 problemów
head -21 seo/findings.csv
```

#### **Filtruj według priorytetu:**

```bash
# Tylko krytyczne (P0)
grep "P0" seo/findings.csv

# Krytyczne + wysokie (P0 + P1)
grep -E "P0|P1" seo/findings.csv

# Policz problemy według priorytetu
echo "P0 (Critical):" && grep -c "P0" seo/findings.csv
echo "P1 (High):" && grep -c "P1" seo/findings.csv
echo "P2 (Medium):" && grep -c "P2" seo/findings.csv
```

#### **Filtruj według typu:**

```bash
# Problemy z meta description
grep "meta description" seo/findings.csv

# Problemy z canonical
grep "canonical" seo/findings.csv

# Problemy z Schema.org
grep "Schema.org" seo/findings.csv
```

#### **Filtruj według strony:**

```bash
# Problemy na konkretnej stronie
grep "about.html" seo/findings.csv

# Wszystkie strony z problemami P0
grep "P0" seo/findings.csv | cut -d',' -f2 | sort -u
```

---

### **Krok 4: Napraw Problemy**

#### **Metoda 1: Automatyczna naprawa (jeśli masz nowe strony)**

Edytuj konfigurację w `scripts/seo/bulk-apply-seo.js`:

```javascript
const seoConfig = {
  'nowa-strona.html': {
    title: 'Tytuł Strony (30-60 znaków) | Idol Brands',
    description: 'Opis strony 150-160 znaków...',
    canonical: 'https://www.idolbrands.com/nowa-strona.html',
    alternate: 'nowa-strona-pl.html',
    lang: 'en',
    locale: 'en_US'
  }
  // ... dodaj więcej stron
};
```

Następnie uruchom:

```bash
node scripts/seo/bulk-apply-seo.js
```

#### **Metoda 2: Ręczna naprawa (pojedyncze strony)**

1. Otwórz plik strony do edycji
2. Użyj template z `seo-head-template.html`
3. Zastąp zmienne:
   - `{{TITLE}}` → Twój tytuł (30-60 znaków)
   - `{{DESCRIPTION}}` → Opis (150-160 znaków)
   - `{{URL}}` → Pełny URL canonical
   - `{{LANG}}` → en lub pl
   - `{{LOCALE}}` → en_US lub pl_PL

Przykład:

```html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Twój Tytuł (30-60 znaków) | Idol Brands</title>
    <meta name="description" content="Opis strony 150-160 znaków...">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.idolbrands.com/twoja-strona.html">
    
    <!-- hreflang (jeśli jest wersja PL) -->
    <link rel="alternate" hreflang="en" href="https://www.idolbrands.com/twoja-strona.html">
    <link rel="alternate" hreflang="pl" href="https://www.idolbrands.com/twoja-strona-pl.html">
    <link rel="alternate" hreflang="x-default" href="https://www.idolbrands.com/twoja-strona.html">
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Idol Brands">
    <meta property="og:title" content="Twój Tytuł | Idol Brands">
    <meta property="og:description" content="Opis strony...">
    <meta property="og:url" content="https://www.idolbrands.com/twoja-strona.html">
    <meta property="og:image" content="https://www.idolbrands.com/images/og-home.jpg">
    <meta property="og:locale" content="en_US">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Twój Tytuł | Idol Brands">
    <meta name="twitter:description" content="Opis strony...">
    <meta name="twitter:image" content="https://www.idolbrands.com/images/og-home.jpg">
    
    <!-- Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdn.tailwindcss.com">
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    
    <!-- Reszta head -->
```

---

### **Krok 5: Weryfikacja Po Naprawie**

Uruchom audit ponownie:

```bash
node scripts/seo/audit-crawler.js
```

Porównaj wyniki:

```bash
# Przed naprawą (zapisz backup)
cp seo/findings.csv seo/findings-backup.csv

# Uruchom audit
node scripts/seo/audit-crawler.js

# Porównaj
echo "Przed: $(wc -l < seo/findings-backup.csv) issues"
echo "Po: $(wc -l < seo/findings.csv) issues"
```

---

## 📅 Kiedy Uruchamiać Audyt?

### **Regularnie (Co Tydzień):**

Dodaj do crontab (Linux/Mac):

```bash
# Edytuj crontab
crontab -e

# Dodaj linię (co poniedziałek o 9:00)
0 9 * * 1 cd /workspace && node scripts/seo/audit-crawler.js
```

Lub utwórz reminder w kalendarzu.

---

### **Przed Każdym Deploymentem:**

```bash
# W ramach pre-commit hook
#!/bin/bash
cd /workspace
node scripts/seo/audit-crawler.js

P0_COUNT=$(grep -c "P0" seo/findings.csv || echo "0")
if [ $P0_COUNT -gt 0 ]; then
    echo "⚠️ Found $P0_COUNT critical SEO issues!"
    echo "Review seo/findings.csv before deploying."
    exit 1
fi
```

---

### **Po Każdej Zmianie Treści:**

```bash
# Lokalnie przed commitem
git add .
node scripts/seo/audit-crawler.js

# Sprawdź czy są nowe P0
grep "P0" seo/findings.csv | grep "$(git diff --name-only)"
```

---

## 🔧 Integracja z CI/CD

### **GitHub Actions:**

Utwórz `.github/workflows/seo-audit.yml`:

```yaml
name: SEO Audit

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  seo-audit:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Run SEO Audit
        run: node scripts/seo/audit-crawler.js
      
      - name: Check for P0 issues
        run: |
          P0_COUNT=$(grep -c "P0" seo/findings.csv || echo "0")
          echo "Found $P0_COUNT critical SEO issues"
          
          if [ $P0_COUNT -gt 5 ]; then
            echo "⚠️ Too many critical SEO issues!"
            exit 1
          fi
      
      - name: Upload audit results
        uses: actions/upload-artifact@v3
        with:
          name: seo-audit-report
          path: seo/findings.csv
```

---

### **GitLab CI:**

Dodaj do `.gitlab-ci.yml`:

```yaml
seo-audit:
  stage: test
  image: node:18
  script:
    - npm install
    - node scripts/seo/audit-crawler.js
    - P0_COUNT=$(grep -c "P0" seo/findings.csv || echo "0")
    - echo "Found $P0_COUNT critical SEO issues"
    - if [ $P0_COUNT -gt 5 ]; then exit 1; fi
  artifacts:
    paths:
      - seo/findings.csv
    expire_in: 1 week
  only:
    - main
    - develop
```

---

## 📊 Interpretacja Poziomów Priorytetów

### **🔴 P0 (Critical) - FIX NATYCHMIAST**

**Problemy:**
- Missing meta description
- Missing canonical URL
- Empty canonical href
- Missing title tag
- Title too short (<30 chars)

**Wpływ:** Bezpośrednie negatywne skutki dla SEO i indeksacji

**Akcja:** Napraw w ciągu 24-48 godzin

---

### **🟠 P1 (High) - FIX W 1-2 TYGODNIE**

**Problemy:**
- Missing Open Graph tags
- Missing Twitter Cards
- Missing Schema.org structured data
- Title too long (>60 chars)
- Missing hreflang

**Wpływ:** Średni wpływ na SEO, ogranicza rich snippets i social sharing

**Akcja:** Napraw w najbliższym sprincie

---

### **🟡 P2 (Medium) - OPTYMALIZACJA**

**Problemy:**
- Images without lazy loading
- Render-blocking resources
- Missing preconnect
- Multiple H1 tags
- Images missing alt text

**Wpływ:** Optymalizacja wydajności i dostępności

**Akcja:** Zaplanuj w kolejnym kwartale

---

## 🎯 Best Practices

### **Meta Description:**
- **Długość:** 150-160 znaków
- **Zawiera:** Call-to-action, słowa kluczowe
- **Unikalna:** Każda strona różna

### **Title Tag:**
- **Długość:** 30-60 znaków
- **Format:** `Tytuł Strony | Nazwa Marki`
- **Słowa kluczowe:** Na początku

### **Canonical URL:**
- **Format:** Pełny URL z protokołem
- **Self-referencing:** Każda strona wskazuje na siebie
- **Konsystentny:** Zawsze ten sam format (z/bez trailing slash)

### **hreflang:**
- **Wymagane:** Dla każdej wersji językowej
- **x-default:** Wskazuje domyślną wersję
- **Bidirectional:** EN ↔ PL w obie strony

### **Open Graph:**
- **Obraz:** 1200x630px, <1MB
- **Wszystkie tagi:** title, description, url, image, locale
- **Type:** website (ogólne), article (blog)

---

## 🐛 Troubleshooting

### **Problem: "Module not found"**

```bash
# Rozwiązanie: Zainstaluj dependencies
npm install
```

---

### **Problem: "Permission denied"**

```bash
# Rozwiązanie: Dodaj uprawnienia
chmod +x scripts/seo/*.js
chmod +x scripts/seo/*.sh
```

---

### **Problem: "No files found"**

```bash
# Rozwiązanie: Sprawdź czy jesteś w workspace root
pwd
# Powinno być: /workspace

cd /workspace
```

---

### **Problem: Audit nie wykrywa nowych stron**

```bash
# Rozwiązanie: Sprawdź czy pliki są w głównym katalogu lub podkatalogach
ls -R *.html
```

Skrypt skanuje:
- `/workspace/*.html`
- `/workspace/legal/*.html`
- Nie skanuje: `landing/`, `node_modules/`, plików `.bak`

---

## 📚 Dodatkowe Zasoby

### **Dokumentacja w projekcie:**
- `seo/PLAN.md` - Plan naprawczy z research
- `seo/REPORT.md` - Raport audytu przed/po
- `scripts/seo/README.md` - Dokumentacja skryptów
- `seo-head-template.html` - Template SEO head

### **Źródła zewnętrzne:**
- [Google Search Central](https://developers.google.com/search)
- [Web.dev](https://web.dev/)
- [Schema.org](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)

---

## 📞 Kontakt i Wsparcie

Jeśli masz pytania lub problemy:

1. Przeczytaj `scripts/seo/README.md`
2. Sprawdź `seo/PLAN.md` dla context
3. Przejrzyj `seo/REPORT.md` dla przykładów

---

## ✅ Quick Checklist

Przed deploymentem upewnij się:

- [ ] Uruchomiłem `node scripts/seo/audit-crawler.js`
- [ ] Sprawdziłem `seo/findings.csv`
- [ ] Brak problemów P0 (lub <5)
- [ ] Naprawiłem krytyczne problemy
- [ ] Zweryfikowałem w audycie ponownie
- [ ] Zatwierdzone w code review

---

**Utworzono:** 2025-10-11  
**Ostatnia aktualizacja:** 2025-10-11  
**Wersja:** 1.0  
**Autor:** SEO Audit Team

---

**💡 TIP:** Dodaj tę instrukcję do zakładek i uruchamiaj audit co tydzień!
