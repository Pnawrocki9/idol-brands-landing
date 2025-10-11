# 🚀 Quick Start - Audyt SEO

## Jednolinijkowe Komendy

```bash
# Pełny audyt SEO
cd /workspace && node scripts/seo/audit-crawler.js

# Audyt wydajności
cd /workspace && node scripts/seo/lighthouse-audit.js

# Zobacz tylko problemy P0 (krytyczne)
cd /workspace && node scripts/seo/audit-crawler.js && grep "P0" seo/findings.csv

# Policz problemy
cd /workspace && node scripts/seo/audit-crawler.js && echo "P0: $(grep -c 'P0' seo/findings.csv) | P1: $(grep -c 'P1' seo/findings.csv) | P2: $(grep -c 'P2' seo/findings.csv)"
```

---

## 📖 Pełna Dokumentacja

Dla szczegółów zobacz:
- **`INSTRUKCJA_SEO_AUDIT.md`** - Kompletny przewodnik (PL)
- **`seo/PLAN.md`** - Plan naprawczy z research
- **`seo/REPORT.md`** - Raport audytu przed/po
- **`scripts/seo/README.md`** - Dokumentacja skryptów

---

## ✅ Aktualne Wyniki

**Issues:** 192 → 94 (-51%)  
**P0:** 57 → 10 (-82%)  
**Pages Optimized:** 24/24 (100%)

---

**Utworzono:** 2025-10-11
