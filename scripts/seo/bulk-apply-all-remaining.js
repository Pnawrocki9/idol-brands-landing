#!/usr/bin/env node
/**
 * Bulk SEO Application - ALL Remaining Pages
 * Applies SEO fixes to all pages with P0 issues
 */

const fs = require('fs');
const path = require('path');

// Complete SEO configurations for ALL remaining pages
const seoConfig = {
  // Legal Pages
  'legal/terms.html': {
    title: 'Terms & Conditions - Idol Brands',
    description: 'Terms and Conditions for using Idol Brands platform. Read our complete terms of service, user agreements, and legal policies for influencer fashion brands.',
    canonical: 'https://www.idolbrands.com/legal/terms.html',
    alternate: 'legal/terms-pl.html',
    lang: 'en',
    locale: 'en_US'
  },
  'legal/terms-pl.html': {
    title: 'Regulamin - Idol Brands',
    description: 'Regulamin korzystania z platformy Idol Brands. Przeczytaj kompletne warunki świadczenia usług, umowy użytkownika i polityki prawne dla marek modowych influencerów.',
    canonical: 'https://www.idolbrands.com/legal/terms-pl.html',
    alternate: 'legal/terms.html',
    lang: 'pl',
    locale: 'pl_PL'
  },
  'legal/cookies.html': {
    title: 'Cookies Policy - Idol Brands',
    description: 'Learn how Idol Brands uses cookies and similar technologies. Complete cookie policy, privacy settings, and data collection information.',
    canonical: 'https://www.idolbrands.com/legal/cookies.html',
    alternate: 'legal/cookies-pl.html',
    lang: 'en',
    locale: 'en_US'
  },
  'legal/cookies-pl.html': {
    title: 'Polityka Cookies - Idol Brands',
    description: 'Dowiedz się, jak Idol Brands wykorzystuje pliki cookie i podobne technologie. Kompletna polityka cookies, ustawienia prywatności i informacje o zbieraniu danych.',
    canonical: 'https://www.idolbrands.com/legal/cookies-pl.html',
    alternate: 'legal/cookies.html',
    lang: 'pl',
    locale: 'pl_PL'
  },
  'legal/gdpr.html': {
    title: 'Privacy Policy (GDPR) - Idol Brands',
    description: 'Idol Brands Privacy Policy and GDPR compliance. Learn how we protect your personal data, privacy rights, and data processing information.',
    canonical: 'https://www.idolbrands.com/legal/gdpr.html',
    alternate: 'legal/gdpr-pl.html',
    lang: 'en',
    locale: 'en_US'
  },
  'legal/gdpr-pl.html': {
    title: 'Polityka Prywatności (RODO) - Idol Brands',
    description: 'Polityka prywatności Idol Brands i zgodność z RODO. Dowiedz się, jak chronimy Twoje dane osobowe, prawa do prywatności i informacje o przetwarzaniu danych.',
    canonical: 'https://www.idolbrands.com/legal/gdpr-pl.html',
    alternate: 'legal/gdpr.html',
    lang: 'pl',
    locale: 'pl_PL'
  },
  // Login Pages
  'login.html': {
    title: 'Login - Access Your Fashion Brand | Idol Brands',
    description: 'Login to your Idol Brands account. Access your fashion brand dashboard, manage products, view analytics, and connect with your audience.',
    canonical: 'https://www.idolbrands.com/login.html',
    alternate: 'login-pl.html',
    lang: 'en',
    locale: 'en_US'
  },
  'login-pl.html': {
    title: 'Logowanie - Dostęp do Twojej Marki Modowej | Idol Brands',
    description: 'Zaloguj się do konta Idol Brands. Uzyskaj dostęp do panelu swojej marki modowej, zarządzaj produktami, przeglądaj analityki i łącz się z publicznością.',
    canonical: 'https://www.idolbrands.com/login-pl.html',
    alternate: 'login.html',
    lang: 'pl',
    locale: 'pl_PL'
  },
  // Post Pages
  'post.html': {
    title: 'Blog Post - Fashion Industry Insights | Idol Brands',
    description: 'Read our latest fashion industry insights and tips for influencers building their own fashion brands.',
    canonical: 'https://www.idolbrands.com/post.html',
    alternate: 'post-pl.html',
    lang: 'en',
    locale: 'en_US'
  },
  'post-pl.html': {
    title: 'Post Bloga - Inspiracje Modowe | Idol Brands',
    description: 'Czytaj nasze najnowsze artykuły i inspiracje dotyczące mody dla influencerów budujących własne marki modowe.',
    canonical: 'https://www.idolbrands.com/post-pl.html',
    alternate: 'post.html',
    lang: 'pl',
    locale: 'pl_PL'
  },
  // Fashion Landing Pages
  'index-fashion.html': {
    title: 'Fashion Collections for Influencers | Idol Brands',
    description: 'Explore exclusive fashion collections designed for influencers. Launch your custom fashion line with Idol Brands comprehensive platform.',
    canonical: 'https://www.idolbrands.com/index-fashion.html',
    alternate: 'index-fashion-pl.html',
    lang: 'en',
    locale: 'en_US'
  },
  'index-fashion-pl.html': {
    title: 'Kolekcje Modowe dla Influencerów | Idol Brands',
    description: 'Odkryj ekskluzywne kolekcje modowe zaprojektowane dla influencerów. Uruchom swoją niestandardową linię mody z kompleksową platformą Idol Brands.',
    canonical: 'https://www.idolbrands.com/index-fashion-pl.html',
    alternate: 'index-fashion.html',
    lang: 'pl',
    locale: 'pl_PL'
  },
  // Admin Pages (noindex recommended but still need basic SEO)
  'admin.html': {
    title: 'Admin Dashboard - Idol Brands',
    description: 'Idol Brands admin dashboard. Manage users, content, and platform settings. Administrator access only.',
    canonical: 'https://www.idolbrands.com/admin.html',
    alternate: null,
    lang: 'en',
    locale: 'en_US',
    noindex: true
  },
  'admin-login.html': {
    title: 'Admin Login - Idol Brands',
    description: 'Administrator login for Idol Brands platform. Secure access for authorized administrators only.',
    canonical: 'https://www.idolbrands.com/admin-login.html',
    alternate: null,
    lang: 'en',
    locale: 'en_US',
    noindex: true
  }
};

function generateSEOHead(config, pageName) {
  const enPath = config.lang === 'en' ? pageName : (config.alternate || pageName);
  const plPath = config.lang === 'pl' ? pageName : (config.alternate || pageName);
  
  const hreflangTags = config.alternate ? `
    <!-- hreflang -->
    <link rel="alternate" hreflang="en" href="https://www.idolbrands.com/${enPath}">
    <link rel="alternate" hreflang="pl" href="https://www.idolbrands.com/${plPath}">
    <link rel="alternate" hreflang="x-default" href="https://www.idolbrands.com/${enPath}">` : '';
  
  const robotsMeta = config.noindex ? `\n    <meta name="robots" content="noindex, nofollow">` : '';
  
  return `    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title}</title>
    <meta name="description" content="${config.description}">${robotsMeta}
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${config.canonical}">${hreflangTags}
    
    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="Idol Brands">
    <meta property="og:title" content="${config.title}">
    <meta property="og:description" content="${config.description}">
    <meta property="og:url" content="${config.canonical}">
    <meta property="og:image" content="https://www.idolbrands.com/images/og-home.jpg">
    <meta property="og:locale" content="${config.locale}">
    
    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${config.title}">
    <meta name="twitter:description" content="${config.description}">
    <meta name="twitter:image" content="https://www.idolbrands.com/images/og-home.jpg">
    
    <!-- Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://cdn.tailwindcss.com">
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">`;
}

console.log('🚀 Starting bulk SEO application for ALL remaining pages...\n');

let processed = 0;
let skipped = 0;
let errors = 0;

Object.keys(seoConfig).forEach(filename => {
  const filePath = path.join(__dirname, '../..', filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${filename} - file not found`);
    skipped++;
    return;
  }
  
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    const config = seoConfig[filename];
    
    // Check if already has complete SEO
    if (content.includes('<link rel="canonical"') && 
        content.includes('og:title') && 
        content.includes('meta name="description"')) {
      console.log(`✅ ${filename} - already has SEO (skipping)`);
      skipped++;
      return;
    }
    
    // Replace head section
    const headRegex = /<head>\s*<meta charset="UTF-8">\s*<meta name="viewport"[^>]*>\s*<title>[^<]*<\/title>/;
    
    if (headRegex.test(content)) {
      const newHead = `<head>\n${generateSEOHead(config, filename)}`;
      content = content.replace(headRegex, newHead);
      
      // Add defer to tailwindcss if present and not already deferred
      if (content.includes('cdn.tailwindcss.com') && !content.includes('cdn.tailwindcss.com" defer')) {
        content = content.replace(
          'src="https://cdn.tailwindcss.com"',
          'src="https://cdn.tailwindcss.com" defer'
        );
      }
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ ${filename} - SEO applied successfully`);
      processed++;
    } else {
      console.log(`⚠️  ${filename} - head structure doesn't match (manual check needed)`);
      skipped++;
    }
  } catch (error) {
    console.log(`❌ ${filename} - Error: ${error.message}`);
    errors++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   ✅ Processed: ${processed}`);
console.log(`   ⏭️  Skipped: ${skipped}`);
console.log(`   ❌ Errors: ${errors}`);
console.log(`   📝 Total: ${processed + skipped + errors}\n`);

if (processed > 0) {
  console.log('✅ Bulk SEO application complete!');
  console.log('💡 Run audit to verify: node scripts/seo/audit-crawler.js\n');
} else {
  console.log('⚠️  No files were processed. Check if files need updates.\n');
}
