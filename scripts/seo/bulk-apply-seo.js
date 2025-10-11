#!/usr/bin/env node
/**
 * Bulk SEO Application Script
 * Applies SEO fixes to all remaining pages
 */

const fs = require('fs');
const path = require('path');

// SEO configurations for each page
const seoConfig = {
  'about.html': {
    title: 'About Us - Fashion Brand Platform for Influencers | Idol Brands',
    description: 'Meet the team behind Idol Brands. Fashion industry veterans with decades of experience in manufacturing, logistics, and technology helping influencers build successful brands.',
    canonical: 'https://www.idolbrands.com/about.html',
    alternate: 'about-pl.html',
    lang: 'en',
    locale: 'en_US'
  },
  'about-pl.html': {
    title: 'O nas - Platforma Marek Modowych dla Influencerów | Idol Brands',
    description: 'Poznaj zespół stojący za Idol Brands. Weterani branży modowej z dziesiątkami lat doświadczenia w produkcji, logistyce i technologii pomagający influencerom budować udane marki.',
    canonical: 'https://www.idolbrands.com/about-pl.html',
    alternate: 'about.html',
    lang: 'pl',
    locale: 'pl_PL'
  },
  'how-it-works.html': {
    title: 'How It Works - Launch Your Fashion Brand | Idol Brands',
    description: 'Learn how Idol Brands helps influencers launch successful fashion brands in just 8 weeks. From design to delivery, we handle everything while you focus on your audience.',
    canonical: 'https://www.idolbrands.com/how-it-works.html',
    alternate: 'how-it-works-pl.html',
    lang: 'en',
    locale: 'en_US'
  },
  'how-it-works-pl.html': {
    title: 'Jak to działa - Uruchom swoją markę modową | Idol Brands',
    description: 'Dowiedz się, jak Idol Brands pomaga influencerom uruchomić udane marki modowe w zaledwie 8 tygodni. Od projektu do dostawy zajmujemy się wszystkim, ty skupiasz się na swojej publiczności.',
    canonical: 'https://www.idolbrands.com/how-it-works-pl.html',
    alternate: 'how-it-works.html',
    lang: 'pl',
    locale: 'pl_PL'
  },
  'success-stories.html': {
    title: 'Success Stories - Real Influencer Fashion Brands | Idol Brands',
    description: 'Discover how influencers are building million-dollar fashion brands with Idol Brands. Real success stories, proven results, and insights from our partners.',
    canonical: 'https://www.idolbrands.com/success-stories.html',
    alternate: 'success-stories-pl.html',
    lang: 'en',
    locale: 'en_US'
  },
  'success-stories-pl.html': {
    title: 'Historie Sukcesu - Prawdziwe marki modowe influencerów | Idol Brands',
    description: 'Odkryj, jak influencerzy budują milionowe marki modowe z Idol Brands. Prawdziwe historie sukcesu, sprawdzone wyniki i spostrzeżenia od naszych partnerów.',
    canonical: 'https://www.idolbrands.com/success-stories-pl.html',
    alternate: 'success-stories.html',
    lang: 'pl',
    locale: 'pl_PL'
  },
  'your-documents.html': {
    title: 'Your Documents - Brand Assets & Resources | Idol Brands',
    description: 'Access your brand documents, design assets, contracts, and resources. Everything you need to manage your fashion brand in one secure place.',
    canonical: 'https://www.idolbrands.com/your-documents.html',
    alternate: 'your-documents-pl.html',
    lang: 'en',
    locale: 'en_US'
  },
  'your-documents-pl.html': {
    title: 'Twoje Dokumenty - Zasoby i Materiały Marki | Idol Brands',
    description: 'Uzyskaj dostęp do dokumentów marki, zasobów projektowych, umów i zasobów. Wszystko czego potrzebujesz do zarządzania swoją marką modową w jednym bezpiecznym miejscu.',
    canonical: 'https://www.idolbrands.com/your-documents-pl.html',
    alternate: 'your-documents.html',
    lang: 'pl',
    locale: 'pl_PL'
  }
};

function generateSEOHead(config, pageName) {
  const enPath = config.lang === 'en' ? pageName : config.alternate;
  const plPath = config.lang === 'pl' ? pageName : config.alternate;
  
  return `    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.title}</title>
    <meta name="description" content="${config.description}">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="${config.canonical}">
    
    <!-- hreflang -->
    <link rel="alternate" hreflang="en" href="https://www.idolbrands.com/${enPath}">
    <link rel="alternate" hreflang="pl" href="https://www.idolbrands.com/${plPath}">
    <link rel="alternate" hreflang="x-default" href="https://www.idolbrands.com/${enPath}">
    
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

console.log('🚀 Starting bulk SEO application...\n');

let processed = 0;
let skipped = 0;

Object.keys(seoConfig).forEach(filename => {
  const filePath = path.join(__dirname, '../..', filename);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${filename} - file not found`);
    skipped++;
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf-8');
  const config = seoConfig[filename];
  
  // Check if already has canonical (skip if fully processed)
  if (content.includes('<link rel="canonical"') && content.includes('og:title')) {
    console.log(`✅ ${filename} - already has SEO (skipping)`);
    skipped++;
    return;
  }
  
  // Simple replacement of head section
  const headRegex = /<head>\s*<meta charset="UTF-8">\s*<meta name="viewport"[^>]*>\s*<title>[^<]*<\/title>/;
  
  if (headRegex.test(content)) {
    const newHead = `<head>\n${generateSEOHead(config, filename)}`;
    content = content.replace(headRegex, newHead);
    
    // Add defer to tailwindcss if not present
    if (!content.includes('cdn.tailwindcss.com" defer')) {
      content = content.replace(
        'src="https://cdn.tailwindcss.com"',
        'src="https://cdn.tailwindcss.com" defer'
      );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ ${filename} - SEO applied successfully`);
    processed++;
  } else {
    console.log(`⚠️  ${filename} - head structure doesn't match (manual update needed)`);
    skipped++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`   Processed: ${processed}`);
console.log(`   Skipped: ${skipped}`);
console.log(`   Total: ${processed + skipped}\n`);
console.log('✅ Bulk SEO application complete!\n');
