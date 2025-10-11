# SEO Audit Scripts - Idol Brands

Automated tools for SEO auditing and monitoring.

## 📋 Available Scripts

### 1. `audit-crawler.js`
**Purpose:** Crawls all HTML files and generates a comprehensive SEO audit report.

**Usage:**
```bash
node scripts/seo/audit-crawler.js
```

**Output:**
- `seo/findings.csv` - Detailed list of SEO issues with priorities (P0/P1/P2)

**Checks:**
- Meta descriptions
- Title tags (length and presence)
- Canonical URLs
- Open Graph tags
- Twitter Cards
- Schema.org structured data
- H1 tags (presence and uniqueness)
- Lang attributes
- Image alt attributes
- Render-blocking resources
- Lazy loading implementation

**Run frequency:** 
- Weekly during active development
- After any content/structure changes
- Before major deployments

---

### 2. `lighthouse-audit.js`
**Purpose:** Simulates Lighthouse performance audit for key pages.

**Usage:**
```bash
node scripts/seo/lighthouse-audit.js
```

**Output:**
- `seo/lighthouse-summary.json` - Performance scores and issues
- Console output with recommendations

**Checks:**
- Render-blocking scripts
- External stylesheets
- Lazy loading
- Preconnect/preload
- Font optimization
- Inline styles size

**Note:** This is a simplified version. For full Lighthouse audit:
```bash
npx lighthouse https://idolbrands.com --output=json --output-path=./seo/lighthouse-full.json
```

---

### 3. `apply-seo-bulk.sh`
**Purpose:** Instructions for bulk SEO updates on remaining pages.

**Usage:**
```bash
./scripts/seo/apply-seo-bulk.sh
```

**Output:** Instructions printed to console

---

## 🎯 Quick Start

### First-time setup:
```bash
cd /workspace
npm install  # If needed for any dependencies
```

### Run complete audit:
```bash
# 1. Run SEO crawler
node scripts/seo/audit-crawler.js

# 2. Run performance audit  
node scripts/seo/lighthouse-audit.js

# 3. Review findings
cat seo/findings.csv | grep "P0"  # Critical issues
cat seo/findings.csv | grep "P1"  # High priority
```

### Interpreting Results:

**Priority Levels:**
- **P0 (Critical):** Must fix immediately - impacts indexing/ranking
- **P1 (High):** Fix within 1-2 weeks - significant SEO impact
- **P2 (Medium):** Fix within 2-4 weeks - optimization opportunities

**Common Issues:**
- Missing meta description → Write unique 150-160 char description
- Missing canonical → Add `<link rel="canonical" href="[full-url]">`
- Empty canonical → Fill in the href attribute
- Missing OG tags → Use `seo-head-template.html` as reference

---

## 📊 Monitoring & CI/CD Integration

### Add to CI pipeline:

```yaml
# Example GitHub Actions
- name: SEO Audit
  run: |
    node scripts/seo/audit-crawler.js
    ISSUES=$(grep -c "P0" seo/findings.csv)
    if [ $ISSUES -gt 0 ]; then
      echo "⚠️ Found $ISSUES critical SEO issues"
      exit 1
    fi
```

### Weekly cron job:
```bash
# Add to crontab for weekly audits
0 9 * * 1 cd /path/to/workspace && node scripts/seo/audit-crawler.js && mail -s "Weekly SEO Report" team@idolbrands.com < seo/findings.csv
```

---

## 🛠 Troubleshooting

### "Module not found" error
```bash
# Install dependencies
npm install
```

### "Permission denied" error
```bash
# Make scripts executable
chmod +x scripts/seo/*.sh
chmod +x scripts/seo/*.js
```

### Crawler not finding pages
- Ensure you're running from workspace root
- Check that HTML files exist and are not in `.gitignore`

---

## 📚 Related Documentation

- `seo/PLAN.md` - Comprehensive SEO implementation plan
- `seo/REPORT.md` - Audit results and recommendations
- `seo-head-template.html` - Template for SEO-optimized `<head>` section

---

## 🤝 Contributing

When adding new checks to the audit scripts:

1. Update `audit-crawler.js` with new check function
2. Add corresponding entry to findings array
3. Update this README with the new check
4. Update `PLAN.md` if it affects the implementation plan

---

## 📞 Support

For questions or issues:
- Check `seo/PLAN.md` for detailed implementation guidelines
- Review `seo/REPORT.md` for context on findings
- Contact: [SEO Team Lead]

---

**Last Updated:** 2025-10-11  
**Version:** 1.0
