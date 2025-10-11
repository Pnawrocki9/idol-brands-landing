# Plan Naprawczy SEO - Idol Brands
**Data utworzenia:** 2025-10-11  
**Status:** Do wdrożenia  
**Branch:** `seo-audit-20251011`

---

## 🎯 Cel

Kompleksowa naprawa i optymalizacja SEO strony Idol Brands zgodnie z najlepszymi praktykami Google 2024-2025, aby:
- Poprawić indeksację i widoczność w wyszukiwarkach
- Osiągnąć Core Web Vitals: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms
- Zaimplementować pełną semantykę (Schema.org, Open Graph)
- Zwiększyć dostępność i użyteczność

---

## 📊 Podsumowanie Audytu

### Znaleziono problemów: **192**
- **P0 (Krytyczne):** 57 problemów
- **P1 (Wysokie):** 101 problemów  
- **P2 (Średnie):** 34 problemy

### Performance Score (symulowany Lighthouse):
- Homepage: **67/100** ⚠️
- About: **87/100**
- Blog: **87/100**
- How It Works: **87/100**

---

## 📚 Research i Źródła (2024-2025)

### 1. **Indeksacja i Crawlability**

**Google Search Central - Sitemap Best Practices (2024)**
- URL: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- Data dostępu: 2025-10-11
- **Kluczowe zalecenia:**
  - Sitemap powinien zawierać tylko kanoniczne URL-e
  - Używaj `<lastmod>`, `<priority>`, `<changefreq>`
  - Nie umieszczaj plików nieindeksowalnych (.md, .txt)
  - Maksymalnie 50,000 URL-i na sitemap

**Google Search Central - Canonical URLs (2024)**
- URL: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- **Kluczowe zalecenia:**
  - Każda strona musi mieć `<link rel="canonical">`
  - Canonical musi wskazywać pełny URL z protokołem
  - Preferuj self-referencing canonicals

**Google Search Central - robots.txt Specification (2024)**
- URL: https://developers.google.com/search/docs/crawling-indexing/robots/intro
- **Kluczowe zalecenia:**
  - Umieść dyrektywy `Sitemap:` na końcu pliku
  - Używaj wzorców zgodnych z RFC 9309
  - Testuj w Search Console

### 2. **On-Page SEO & Metadane**

**Google Search Central - Title Links (Updated 2024)**
- URL: https://developers.google.com/search/docs/appearance/title-link
- **Kluczowe zalecenia:**
  - Tytuł: 30-60 znaków (optymalna długość dla mobile)
  - Unikalny dla każdej strony
  - Zawiera główne słowo kluczowe na początku
  - Nazwa marki na końcu (separator: `-` lub `|`)

**Google Search Central - Meta Descriptions (2024)**
- URL: https://developers.google.com/search/docs/appearance/snippet
- **Kluczowe zalecenia:**
  - Długość: 150-160 znaków
  - Unikalny opis dla każdej strony
  - Zawiera call-to-action
  - Nie jest bezpośrednim czynnikiem rankingowym, ale wpływa na CTR

**Open Graph Protocol (Meta/Facebook, 2024)**
- URL: https://ogp.me/
- **Wymagane tagi:**
  - `og:title`, `og:type`, `og:image`, `og:url`
  - `og:description`, `og:site_name`
  - `og:locale` dla wersji międzynarodowych

**Twitter Cards Documentation (X Corp, 2024)**
- URL: https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards
- **Wymagane tagi:**
  - `twitter:card` (summary_large_image)
  - `twitter:title`, `twitter:description`, `twitter:image`

### 3. **Structured Data & Schema.org**

**Google Search Central - Structured Data Guidelines (2024)**
- URL: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- **Kluczowe zalecenia:**
  - Używaj JSON-LD (preferowane przez Google)
  - Implementuj odpowiednie typy: `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage`
  - Testuj w Rich Results Test: https://search.google.com/test/rich-results

**Schema.org Vocabulary (Version 16.0, 2024)**
- URL: https://schema.org/
- **Rekomendowane typy dla Idol Brands:**
  - `Organization` (homepage)
  - `WebSite` z `SearchAction`
  - `Article` (blog posts)
  - `FAQPage` (strony z Q&A)
  - `Offer` / `Product` (jeśli sprzedaż bezpośrednia)

### 4. **Core Web Vitals & Performance**

**Web.dev - Core Web Vitals (Google, Updated Jan 2024)**
- URL: https://web.dev/articles/vitals
- **Aktualne progi (2024-2025):**
  - **LCP** (Largest Contentful Paint): ≤ 2.5s (dobry)
  - **CLS** (Cumulative Layout Shift): ≤ 0.1 (dobry)
  - **INP** (Interaction to Next Paint): ≤ 200ms (dobry) ← **NOWY, zastąpił FID w marcu 2024**

**Google Search Central - Page Experience (2024)**
- URL: https://developers.google.com/search/docs/appearance/page-experience
- **Kluczowe zalecenia:**
  - CWV to czynnik rankingowy od 2021
  - INP oficjalnie zastąpił FID w marcu 2024
  - Mobile-first indexing: optymalizuj przede wszystkim mobile

**Web.dev - Image Optimization (2024)**
- URL: https://web.dev/articles/fast#optimize_your_images
- **Kluczowe zalecenia:**
  - Używaj nowoczesnych formatów: WebP, AVIF
  - Implementuj `loading="lazy"` dla obrazów below-the-fold
  - Używaj `srcset` i `sizes` dla responsive images
  - Optymalna kompresja: 80-85% jakości

**Web.dev - Eliminate Render-Blocking Resources (2024)**
- URL: https://web.dev/articles/render-blocking-resources
- **Kluczowe zalecenia:**
  - Inline critical CSS
  - Defer non-critical CSS
  - Dodaj `async` lub `defer` do skryptów
  - Preconnect do zewnętrznych zasobów: `<link rel="preconnect">`

**Google Fonts Best Practices (2024)**
- URL: https://web.dev/articles/optimize-webfonts
- **Kluczowe zalecenia:**
  - Używaj `font-display: swap`
  - Preconnect do `fonts.googleapis.com` i `fonts.gstatic.com`
  - Rozważ self-hosting fontów dla lepszej kontroli

### 5. **Międzynarodowość (i18n)**

**Google Search Central - hreflang (2024)**
- URL: https://developers.google.com/search/docs/specialty/international/localized-versions
- **Kluczowe zalecenia:**
  - Używaj `<link rel="alternate" hreflang="x">`
  - Zawsze dodaj self-referencing hreflang
  - Dodaj `x-default` dla domyślnej wersji językowej

### 6. **Dostępność (a11y) wpływająca na SEO**

**WCAG 2.2 Guidelines (W3C, 2023)**
- URL: https://www.w3.org/WAI/WCAG22/quickref/
- **Kluczowe zalecenia:**
  - Alt text dla wszystkich obrazów informacyjnych
  - Proper heading hierarchy (jeden H1, hierarchia H2-H6)
  - `lang` attribute na `<html>`
  - Contrast ratios (AA standard minimum)

---

## 🔧 Plan Napraw - Zadania z Priorytetami

### **P0 - Krytyczne (57 problemów) - Wdrożyć NATYCHMIAST**

| ID | Zadanie | Wpływ | Nakład | Ryzyko | Rollback |
|----|---------|-------|--------|--------|----------|
| P0-1 | **Naprawa sitemap.xml** - usunąć .md i llms.txt, dodać lastmod/priority | Wysoki (indeksacja) | S (30min) | Niskie | Backup sitemap.xml |
| P0-2 | **Dodać meta descriptions** na 26 stronach głównych | Wysoki (CTR w SERP) | M (2h) | Niskie | Git revert |
| P0-3 | **Dodać canonical URLs** na wszystkich stronach | Krytyczny (duplikaty) | M (2h) | Średnie | Git revert, test 301 |
| P0-4 | **Naprawić puste canonical** na blog.html i blog-pl.html | Krytyczny | S (15min) | Niskie | Git revert |

**Uzasadnienie P0:**
- Sitemap z niewłaściwymi plikami → Google indeksuje śmieci
- Brak meta description → niski CTR w wynikach wyszukiwania
- Brak canonicals → ryzyko duplikacji treści i penalty
- Puste canonicals → Google ignoruje stronę lub wybiera losowy canonical

**Testy P0:**
```bash
# Test sitemap
curl https://www.idolbrands.com/sitemap.xml | grep -E '\.md|llms\.txt'
# Oczekiwany wynik: brak outputu

# Test canonical
curl -s https://www.idolbrands.com/about.html | grep -i canonical
# Oczekiwany wynik: <link rel="canonical" href="https://www.idolbrands.com/about.html">
```

---

### **P1 - Wysokie (101 problemów) - Wdrożyć w ciągu 1-2 tygodni**

| ID | Zadanie | Wpływ | Nakład | Ryzyko | Rollback |
|----|---------|-------|--------|--------|----------|
| P1-1 | **Implementacja Open Graph tags** na wszystkich stronach | Wysoki (social sharing) | M (3h) | Niskie | Git revert |
| P1-2 | **Implementacja Twitter Cards** na wszystkich stronach | Średni (social reach) | S (1h) | Niskie | Git revert |
| P1-3 | **Dodać Schema.org structured data** (Organization, WebSite, Article) | Wysoki (rich snippets) | L (5h) | Średnie | Git revert, test w Rich Results |
| P1-4 | **Naprawa długości tytułów** (22-62 chars → 30-60 chars) | Średni (SERP display) | M (2h) | Niskie | Git revert |
| P1-5 | **Implementacja hreflang** dla wersji EN/PL | Wysoki (i18n SEO) | M (2h) | Średnie | Test w Search Console |
| P1-6 | **Dodać preconnect** dla CDN resources | Średni (LCP) | S (30min) | Niskie | Git revert |

**Uzasadnienie P1:**
- Open Graph/Twitter Cards → lepsza widoczność w social media (30-40% więcej kliknięć)
- Schema.org → rich snippets w Google (CTR +20-30%)
- hreflang → właściwa wersja językowa w wynikach wyszukiwania
- preconnect → skrócenie LCP o 100-200ms

**Testy P1:**
```bash
# Test Schema.org
curl -s https://www.idolbrands.com/ | grep -o '<script type="application/ld+json">.*</script>'

# Test w Rich Results Tool
# https://search.google.com/test/rich-results?url=https://www.idolbrands.com/

# Test Open Graph
curl -s https://www.idolbrands.com/about.html | grep 'og:title'
```

---

### **P2 - Średnie (34 problemy) - Wdrożyć w ciągu 2-4 tygodni**

| ID | Zadanie | Wpływ | Nakład | Ryzyko | Rollback |
|----|---------|-------|--------|--------|----------|
| P2-1 | **Lazy loading obrazów** | Średni (LCP, bandwidth) | M (2h) | Niskie | Git revert |
| P2-2 | **Optymalizacja obrazów** (WebP, compresja) | Średni (LCP, CWV) | L (4h) | Średnie | Backup images/ |
| P2-3 | **Defer/async dla skryptów** zewnętrznych | Średni (render-blocking) | M (2h) | Średnie | Test funkcjonalności |
| P2-4 | **Inline critical CSS** | Niski (FCP) | L (6h) | Wysokie | Feature toggle |
| P2-5 | **Dodać srcset/sizes** dla responsive images | Niski (mobile LCP) | L (4h) | Niskie | Git revert |
| P2-6 | **Font-display: swap** dla Google Fonts | Niski (CLS) | S (15min) | Niskie | Git revert |

**Uzasadnienie P2:**
- Lazy loading → oszczędność bandwidth, szybszy initial load
- Optymalizacja obrazów → LCP improvement (25-50%)
- Defer/async → FCP improvement (200-500ms)

**Testy P2:**
```bash
# Test lazy loading
curl -s https://www.idolbrands.com/ | grep '<img' | grep 'loading="lazy"'

# Test WebP
file images/hero-market.webp
# Expected: image/webp

# PageSpeed Insights
# https://pagespeed.web.dev/analysis?url=https://www.idolbrands.com/
```

---

## 📈 Estymacja Wpływu (KPIs)

| Metryka | Przed | Po (szacunek) | Źródło danych |
|---------|-------|---------------|---------------|
| **Organic CTR** | ~2% | ~3.5% (+75%) | Search Console |
| **Lighthouse Performance** | 67 | 90+ (+23 pkt) | Lighthouse CI |
| **LCP (mobile)** | ~3.5s | <2.5s | CrUX / Lighthouse |
| **CLS** | ~0.15 | <0.1 | CrUX / Lighthouse |
| **INP** | ~250ms | <200ms | CrUX / Lighthouse |
| **Indexed Pages** | ? | 100% eligible | Search Console |
| **Rich Results** | 0 | 80%+ pages | Rich Results Test |

---

## 🛠 Szczegółowy Plan Wdrożenia

### **Faza 1: Krytyczne poprawki (P0) - Dzień 1**

#### 1.1 Naprawa sitemap.xml
```xml
<!-- Przed -->
<url><loc>https://www.idolbrands.com/about.md</loc></url>
<url><loc>https://www.idolbrands.com/llms.txt</loc></url>

<!-- Po -->
<url>
  <loc>https://www.idolbrands.com/about.html</loc>
  <lastmod>2025-10-11</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

**Implementacja:**
- Usuń wszystkie `.md` i `.txt` z sitemap
- Dodaj `<lastmod>`, `<priority>`, `<changefreq>`
- Zachowaj tylko `.html` pages
- Submit do Google Search Console

#### 1.2 Meta descriptions
**Komponent:** Utworzyć `<head>` template

```html
<!-- EN version -->
<meta name="description" content="Turn your influence into a fashion empire. Idol Brands handles design, production, and delivery so you can focus on your story. Join 500+ successful influencers.">

<!-- PL version -->
<meta name="description" content="Zamień swój wpływ w modowe imperium. Idol Brands zajmuje się projektowaniem, produkcją i dostawą, abyś mógł skupić się na swojej historii. Dołącz do 500+ influencerów.">
```

**Strony do aktualizacji:**
- index.html, index-pl.html
- about.html, about-pl.html
- how-it-works.html, how-it-works-pl.html
- success-stories.html, success-stories-pl.html
- your-documents.html, your-documents-pl.html
- + wszystkie inne (26 stron)

#### 1.3 Canonical URLs
**Implementacja:** Dodać do każdej strony

```html
<!-- Self-referencing canonical -->
<link rel="canonical" href="https://www.idolbrands.com/about.html">

<!-- PL version -->
<link rel="canonical" href="https://www.idolbrands.com/about-pl.html">
```

**Skrypt pomocniczy:**
```javascript
// Dynamiczny canonical (opcjonalnie)
document.addEventListener('DOMContentLoaded', function() {
  const canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical.href) {
    canonical.href = window.location.origin + window.location.pathname;
  }
});
```

---

### **Faza 2: Wysokie priorytety (P1) - Tydzień 1-2**

#### 2.1 Open Graph & Twitter Cards
**Template:**

```html
<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:site_name" content="Idol Brands">
<meta property="og:title" content="Turn Your Influence Into a Fashion Empire | Idol Brands">
<meta property="og:description" content="We handle everything from design to delivery...">
<meta property="og:url" content="https://www.idolbrands.com/">
<meta property="og:image" content="https://www.idolbrands.com/images/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="en_US">

<!-- Polish version -->
<meta property="og:locale:alternate" content="pl_PL">

<!-- Twitter Cards -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Turn Your Influence Into a Fashion Empire">
<meta name="twitter:description" content="We handle everything from design to delivery...">
<meta name="twitter:image" content="https://www.idolbrands.com/images/og-image.jpg">
```

**TODO:** Utworzyć og-image.jpg (1200x630px)

#### 2.2 Schema.org Structured Data

**Homepage (Organization + WebSite):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Idol Brands",
  "url": "https://www.idolbrands.com",
  "logo": "https://www.idolbrands.com/images/logo.png",
  "description": "The only platform that transforms influencers into fashion brand owners",
  "sameAs": [
    "https://www.instagram.com/idolbrands",
    "https://www.tiktok.com/@idolbrands",
    "https://www.youtube.com/@idolbrands"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "contact@idolbrands.com",
    "contactType": "Customer Service"
  }
}
</script>

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Idol Brands",
  "url": "https://www.idolbrands.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.idolbrands.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
</script>
```

**Blog Posts (Article):**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "image": "https://www.idolbrands.com/images/post-image.jpg",
  "author": {
    "@type": "Organization",
    "name": "Idol Brands"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Idol Brands",
    "logo": {
      "@type": "ImageObject",
      "url": "https://www.idolbrands.com/images/logo.png"
    }
  },
  "datePublished": "2025-10-11",
  "dateModified": "2025-10-11"
}
</script>
```

**Breadcrumbs:**
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [{
    "@type": "ListItem",
    "position": 1,
    "name": "Home",
    "item": "https://www.idolbrands.com/"
  },{
    "@type": "ListItem",
    "position": 2,
    "name": "About",
    "item": "https://www.idolbrands.com/about.html"
  }]
}
</script>
```

#### 2.3 hreflang Implementation

```html
<!-- On English pages -->
<link rel="alternate" hreflang="en" href="https://www.idolbrands.com/" />
<link rel="alternate" hreflang="pl" href="https://www.idolbrands.com/index-pl.html" />
<link rel="alternate" hreflang="x-default" href="https://www.idolbrands.com/" />

<!-- On Polish pages -->
<link rel="alternate" hreflang="en" href="https://www.idolbrands.com/" />
<link rel="alternate" hreflang="pl" href="https://www.idolbrands.com/index-pl.html" />
<link rel="alternate" hreflang="x-default" href="https://www.idolbrands.com/" />
```

**Mapping EN ↔ PL:**
- `/` ↔ `/index-pl.html`
- `/about.html` ↔ `/about-pl.html`
- `/blog.html` ↔ `/blog-pl.html`
- `/how-it-works.html` ↔ `/how-it-works-pl.html`
- itd.

#### 2.4 Preconnect dla zasobów zewnętrznych

```html
<head>
  <!-- Preconnect dla Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Preconnect dla CDN -->
  <link rel="preconnect" href="https://cdn.tailwindcss.com">
  <link rel="preconnect" href="https://cdnjs.cloudflare.com">
  
  <!-- Existing font link with display=swap -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
```

---

### **Faza 3: Optymalizacja wydajności (P2) - Tydzień 2-4**

#### 3.1 Lazy Loading obrazów

```html
<!-- Przed -->
<img src="images/hero-market.jpg" alt="Live selling platform">

<!-- Po -->
<img src="images/hero-market.jpg" alt="Live selling platform" loading="lazy" width="800" height="600">
```

**Wyjątek:** Obrazy above-the-fold (hero images) NIE powinny mieć `loading="lazy"`

#### 3.2 Optymalizacja obrazów

**Skrypt konwersji do WebP:**
```bash
#!/bin/bash
# Convert images to WebP
for img in images/*.{jpg,png}; do
  cwebp -q 85 "$img" -o "${img%.*}.webp"
done
```

**HTML z fallback:**
```html
<picture>
  <source srcset="images/hero-market.webp" type="image/webp">
  <img src="images/hero-market.jpg" alt="Live selling platform" loading="lazy">
</picture>
```

#### 3.3 Defer/Async dla skryptów

```html
<!-- Przed -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Po -->
<script src="https://cdn.tailwindcss.com" defer></script>

<!-- Vanta.js - async z callback -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" defer></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/vanta/0.5.24/vanta.birds.min.js" defer></script>
```

**Uwaga:** Testować dokładnie - Vanta.js wymaga Three.js!

#### 3.4 Font-display: swap

```html
<!-- Już zaimplementowane w URL -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
```

✅ **To już działa poprawnie!**

---

## 🧪 Strategia Testowania

### Przed wdrożeniem (Pre-deployment)
1. ✅ **Walidacja HTML** - https://validator.w3.org/
2. ✅ **Rich Results Test** - https://search.google.com/test/rich-results
3. ✅ **Mobile-Friendly Test** - https://search.google.com/test/mobile-friendly
4. ✅ **PageSpeed Insights** - https://pagespeed.web.dev/
5. ✅ **Lighthouse CI** (local) - `npm run lighthouse`

### Po wdrożeniu (Post-deployment)
1. ✅ **Crawl test** - `npm run seo:audit`
2. ✅ **Sitemap submission** - Google Search Console
3. ✅ **Canonical check** - Sprawdź w network devtools
4. ✅ **hreflang validation** - https://technicalseo.com/tools/hreflang/
5. ✅ **Core Web Vitals monitoring** - Google Search Console (28 dni)

### Monitoring ciągły
- **Google Search Console** - Performance, Coverage, Core Web Vitals
- **Google Analytics** - Organic traffic, engagement
- **Lighthouse CI** (weekly) - Automatyczne testy wydajności

---

## ⚠️ Ryzyka i Mitygacja

| Ryzyko | Prawdopodobieństwo | Wpływ | Mitygacja | Rollback |
|--------|-------------------|-------|-----------|----------|
| Zmiana canonical → temporary drop w indeksacji | Niskie | Średni | Phased rollout, 301 redirects | Git revert + resubmit sitemap |
| Defer/async → broken functionality (Vanta.js) | Średnie | Wysoki | Staging tests, feature flag | Git revert |
| WebP → brak wsparcia IE11 | Bardzo niskie | Niski | Picture element z fallback | N/A (IE11 <0.5% traffic) |
| Lazy loading → CLS issues | Niskie | Średni | Explicit width/height attributes | Disable lazy on hero images |
| Schema.org errors → no rich results | Niskie | Średni | Pre-validate w Rich Results Test | Fix markup |

---

## 📅 Harmonogram Wdrożenia

| Tydzień | Zadania | Oczekiwany Rezultat |
|---------|---------|---------------------|
| **W1 D1-2** | P0: Sitemap, meta, canonicals | 57 krytycznych problemów naprawione |
| **W1 D3-5** | P1: OG/Twitter, Schema.org (partial) | Rich snippets w Google |
| **W2 D1-3** | P1: hreflang, preconnect | Poprawna indeksacja EN/PL |
| **W2 D4-5** | P1: Schema.org (complete) | Pełna implementacja structured data |
| **W3-W4** | P2: Lazy loading, image optimization | LCP < 2.5s |
| **W4-W5** | P2: Defer/async, critical CSS | Performance 90+ |

**Całkowity czas:** 4-5 tygodni  
**Nakład pracy:** ~40-50 godzin  
**Team:** 1 developer + 1 SEO specialist (review)

---

## ✅ Definition of Done (DoD)

### Kryteria akceptacji:

✅ **Indeksacja:**
- [ ] Sitemap zawiera tylko `.html` pages
- [ ] Wszystkie eligible pages mają canonical
- [ ] Brak 4xx/5xx na głównych stronach
- [ ] robots.txt poprawnie skonfigurowany

✅ **On-Page:**
- [ ] Wszystkie strony mają unique meta description (150-160 chars)
- [ ] Wszystkie tytuły 30-60 chars
- [ ] Każda strona ma H1 (tylko jeden)
- [ ] hreflang poprawnie zaimplementowany (EN ↔ PL)

✅ **Structured Data:**
- [ ] Organization schema na homepage
- [ ] WebSite schema z SearchAction
- [ ] Article schema na blog posts
- [ ] Breadcrumbs schema gdzie applicable
- [ ] 100% validation w Rich Results Test

✅ **Performance (Mobile):**
- [ ] LCP ≤ 2.5s
- [ ] CLS ≤ 0.1
- [ ] INP ≤ 200ms
- [ ] Lighthouse Performance ≥ 90

✅ **Social Media:**
- [ ] Open Graph na wszystkich głównych stronach
- [ ] Twitter Cards na wszystkich głównych stronach
- [ ] OG images (1200x630px) utworzone

✅ **Accessibility:**
- [ ] Wszystkie obrazy mają alt text
- [ ] `lang` attribute na `<html>`
- [ ] Proper heading hierarchy

✅ **Deliverables:**
- [ ] PR utworzony i zmerged
- [ ] `seo/REPORT.md` z before/after metrics
- [ ] `seo/findings.csv` zaktualizowany (0 P0 issues)
- [ ] Scripts w `scripts/seo/` działają
- [ ] CI/CD pipeline includes SEO tests

---

## 📞 Kontakt i Ownership

**Owner:** SEO Team  
**Developer:** [TBD]  
**Reviewer:** [TBD]  
**Deadline:** 2025-11-08 (4 tygodnie)

---

## 📚 Załączniki

- `seo/findings.csv` - Szczegółowa lista problemów
- `seo/lighthouse-summary.json` - Performance audit results
- `scripts/seo/audit-crawler.js` - Automated audit script
- `scripts/seo/lighthouse-audit.js` - Performance test script

---

**Dokument utworzony:** 2025-10-11  
**Ostatnia aktualizacja:** 2025-10-11  
**Wersja:** 1.0
