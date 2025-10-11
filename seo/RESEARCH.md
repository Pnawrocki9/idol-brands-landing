# Research SEO - Najlepsze Praktyki 2024-2025

## Źródła i Data Dostępu

Data researchu: **2025-10-11**

## 1. Google Search Central - Podstawy SEO

### Indeksacja i Crawlability

**Źródło**: [Google Search Central - How Search Works](https://developers.google.com/search/docs/fundamentals/how-search-works)
**Data publikacji**: 2024

#### Kluczowe zalecenia:
- **robots.txt**: Musi być dostępny w katalogu głównym i nie blokować ważnych zasobów (CSS, JS)
- **sitemap.xml**: Powinien zawierać tylko URL-e, które zwracają status 200, być aktualny i nie przekraczać 50MB/50k URL-i
- **Canonical URLs**: Każda strona powinna mieć ustawiony rel="canonical" wskazujący na preferowaną wersję

### Meta Tagi i Semantyka

**Źródło**: [Google Search Central - Special tags](https://developers.google.com/search/docs/crawling-indexing/special-tags)
**Data publikacji**: 2024

#### Zalecenia:
- **Title**: 50-60 znaków, unikalny dla każdej strony, zawierający główne słowa kluczowe
- **Meta Description**: 120-160 znaków, przekonujący opis zachęcający do kliknięcia
- **Meta Robots**: `index, follow` dla stron do indeksacji, `noindex` dla stron prywatnych/technicznych

## 2. Core Web Vitals (2024-2025)

**Źródło**: [Web.dev - Core Web Vitals](https://web.dev/articles/vitals)
**Ostatnia aktualizacja**: Marzec 2024 (INP zastąpił FID)

### Kluczowe Metryki:

#### LCP (Largest Contentful Paint)
- **Cel**: ≤ 2.5s
- **Wpływ**: Główny wskaźnik wydajności ładowania
- **Optymalizacja**:
  - Preload kluczowych zasobów
  - Optymalizacja obrazów (WebP, AVIF)
  - Server-side rendering lub static generation
  - CDN dla statycznych zasobów

#### CLS (Cumulative Layout Shift)
- **Cel**: ≤ 0.1
- **Wpływ**: Stabilność wizualna
- **Optymalizacja**:
  - Określone wymiary dla obrazów i video
  - Rezerwacja miejsca dla dynamicznych treści
  - Unikanie wstawiania treści powyżej istniejącej

#### INP (Interaction to Next Paint) - NOWA METRYKA od marca 2024
- **Cel**: ≤ 200ms
- **Wpływ**: Responsywność interakcji użytkownika
- **Optymalizacja**:
  - Optymalizacja JavaScript (code splitting)
  - Debouncing/throttling event handlerów
  - Web Workers dla heavy operations
  - Lazy loading non-critical JS

**Źródło**: [Chrome Developers - INP](https://web.dev/articles/inp)
**Data publikacji**: Marzec 2024

## 3. Structured Data (Schema.org)

**Źródło**: [Google Search Central - Structured Data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)
**Data publikacji**: 2024

### Zalecane Typy dla Fashion/E-commerce:

#### Organization Schema
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Idol Brands",
  "url": "https://www.idolbrands.com",
  "logo": "https://www.idolbrands.com/logo.png",
  "description": "...",
  "sameAs": [
    "https://instagram.com/...",
    "https://tiktok.com/@..."
  ]
}
```

#### WebSite Schema z Search Action
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.idolbrands.com/#website",
  "url": "https://www.idolbrands.com",
  "name": "Idol Brands"
}
```

#### Article Schema (dla blog posts)
- Wymagane: headline, image, datePublished, dateModified, author
- Zwiększa szanse na rich snippets

#### BreadcrumbList Schema
- Poprawia nawigację w SERP
- Pokazuje hierarchię strony

#### FAQPage Schema
- Rich snippets w wynikach wyszukiwania
- Zwiększa CTR o ~30% (dane Google)

**Źródło**: [Schema.org Documentation](https://schema.org/)

## 4. Wielojęzyczność i Hreflang

**Źródło**: [Google Search Central - Hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions)
**Data publikacji**: 2024

### Implementacja:
```html
<link rel="alternate" hreflang="en" href="https://www.idolbrands.com/page" />
<link rel="alternate" hreflang="pl" href="https://www.idolbrands.com/page-pl" />
<link rel="alternate" hreflang="x-default" href="https://www.idolbrands.com/page" />
```

### Zasady:
- **Bidirectional**: Każda strona musi linkować do wszystkich wersji językowych (włącznie z sobą)
- **x-default**: Wskazuje domyślną wersję dla nieobsługiwanych języków
- **Self-referencing**: Strona musi linkować do siebie samej

## 5. Open Graph i Social Media

**Źródło**: [Open Graph Protocol](https://ogp.me/)

### Minimalne wymagane tagi:
```html
<meta property="og:title" content="..." />
<meta property="og:type" content="website" />
<meta property="og:url" content="https://..." />
<meta property="og:image" content="https://..." />
<meta property="og:description" content="..." />
```

### Twitter Cards:
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
<meta name="twitter:description" content="..." />
<meta name="twitter:image" content="..." />
```

**Wpływ**: Zwiększa CTR z social media o 30-40%

## 6. Wydajność - HTTP Headers i Caching

**Źródło**: [MDN Web Docs - HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)

### Cache-Control dla statycznych stron:
```
Cache-Control: public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400
```

### Dla zasobów statycznych (CSS, JS, images):
```
Cache-Control: public, max-age=31536000, immutable
```

### Security Headers:
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 7. Obrazy i Lazy Loading

**Źródło**: [Web.dev - Image Optimization](https://web.dev/articles/image-optimization)
**Data publikacji**: 2024

### Best Practices:
- **Format**: WebP lub AVIF (fallback do JPEG/PNG)
- **Lazy Loading**: `loading="lazy"` dla obrazów poniżej fold
- **Responsive Images**: `srcset` i `sizes` attributes
- **Dimensje**: Zawsze określać width i height
- **Alt Text**: Opisowy, unikalny dla każdego obrazu

### Przykład:
```html
<img 
  src="image.webp" 
  srcset="image-320.webp 320w, image-640.webp 640w, image-1024.webp 1024w"
  sizes="(max-width: 320px) 280px, (max-width: 640px) 600px, 1024px"
  alt="Descriptive text"
  width="1024"
  height="768"
  loading="lazy"
/>
```

## 8. Robots Meta i Indeksacja

**Źródło**: [Google Search Central - Robots Meta Tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag)

### Zalecenia:
- **Strony publiczne**: `<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">`
- **Strony prywatne**: `<meta name="robots" content="noindex, nofollow">`
- **Legal pages**: `<meta name="robots" content="noindex, follow">` + rel="nofollow" na linkach

## 9. Internal Linking

**Źródło**: [Moz - Internal Linking](https://moz.com/learn/seo/internal-link)

### Best Practices:
- **Anchor Text**: Opisowy, zawierający słowa kluczowe
- **Breadcrumbs**: Na wszystkich stronach poza home
- **Related Content**: Linkowanie do powiązanych stron
- **Footer Navigation**: Linkowanie do kluczowych stron
- **Głębokość**: Żadna strona nie powinna być głębsza niż 3 kliki od home

## 10. Mobile-First Indexing

**Źródło**: [Google Search Central - Mobile-First Indexing](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing)

### Wymagania:
- **Viewport Meta Tag**: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- **Responsive Design**: Pełna funkcjonalność na mobile
- **Touch Targets**: Min. 48x48px
- **Font Sizes**: Min. 16px dla body text
- **Tap Targets**: Min. 8px spacing

## Podsumowanie Priorytetów

### P0 (Krytyczne - Must Have):
1. Meta description na wszystkich stronach
2. Canonical URLs
3. Mobile viewport
4. Valid HTML
5. HTTPS (już zaimplementowane)

### P1 (Wysokie - Should Have):
1. Open Graph tags
2. Schema.org (Organization, WebSite, Article)
3. Hreflang dla wielojęzyczności
4. Optymalizacja obrazów (WebP, lazy loading)
5. Core Web Vitals < progów

### P2 (Średnie - Nice to Have):
1. Twitter Cards
2. Breadcrumbs Schema
3. FAQ Schema (jeśli applicable)
4. Internal linking optimization
5. Security headers

## Bibliografia

1. Google Search Central (2024) - https://developers.google.com/search
2. Web.dev Core Web Vitals (2024) - https://web.dev/articles/vitals
3. Schema.org Documentation - https://schema.org/
4. Open Graph Protocol - https://ogp.me/
5. MDN Web Docs - https://developer.mozilla.org/
6. Moz SEO Learning Center - https://moz.com/learn/seo
