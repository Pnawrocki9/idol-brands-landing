#!/usr/bin/env node
/**
 * Lighthouse Performance Audit Script
 * Simulates Lighthouse audit for key pages
 * 
 * Note: This is a simplified version. For full Lighthouse audit, use:
 * npx lighthouse https://idolbrands.com --output=json --output-path=./seo/lighthouse-report.json
 */

const fs = require('fs');
const path = require('path');

const results = [];

// Key pages to audit
const pagesToAudit = [
  { url: '/', name: 'Homepage', file: 'index.html' },
  { url: '/about.html', name: 'About', file: 'about.html' },
  { url: '/blog.html', name: 'Blog', file: 'blog.html' },
  { url: '/how-it-works.html', name: 'How It Works', file: 'how-it-works.html' }
];

function analyzePerformance(filePath, url) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const issues = [];
  
  // Check for render-blocking resources
  const renderBlockingScripts = (content.match(/<script\s+src=["']https?:\/\/[^"']+(?!defer|async)/gi) || []).length;
  if (renderBlockingScripts > 0) {
    issues.push(`${renderBlockingScripts} render-blocking scripts`);
  }
  
  // Check for external stylesheets
  const externalCSS = (content.match(/<link[^>]+rel=["']stylesheet["'][^>]+href=["']https?:\/\//gi) || []).length;
  if (externalCSS > 2) {
    issues.push(`${externalCSS} external stylesheets (consider inlining critical CSS)`);
  }
  
  // Check for lazy loading
  const imagesWithoutLazy = (content.match(/<img(?![^>]*loading=["']lazy["'])[^>]*>/gi) || []).length;
  if (imagesWithoutLazy > 0) {
    issues.push(`${imagesWithoutLazy} images without lazy loading`);
  }
  
  // Check for preconnect/preload
  const hasPreconnect = /<link[^>]+rel=["']preconnect["']/i.test(content);
  const hasPreload = /<link[^>]+rel=["']preload["']/i.test(content);
  if (!hasPreconnect) {
    issues.push('Missing preconnect for external resources');
  }
  
  // Check for font optimization
  const fontLinks = content.match(/<link[^>]+fonts\.googleapis\.com[^>]*>/gi);
  if (fontLinks && fontLinks.length > 0) {
    const hasDisplay = fontLinks.some(link => /display=swap/.test(link));
    if (!hasDisplay) {
      issues.push('Google Fonts without display=swap');
    }
  }
  
  // Check inline styles size
  const inlineStyles = content.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
  if (inlineStyles) {
    const totalInlineCSS = inlineStyles.join('').length;
    if (totalInlineCSS > 50000) {
      issues.push(`Large inline CSS (${Math.round(totalInlineCSS/1024)}KB)`);
    }
  }
  
  // Estimate scores (simplified)
  let performanceScore = 100;
  performanceScore -= renderBlockingScripts * 5;
  performanceScore -= externalCSS * 3;
  performanceScore -= (imagesWithoutLazy > 0 ? 10 : 0);
  performanceScore -= (!hasPreconnect ? 5 : 0);
  performanceScore = Math.max(0, Math.min(100, performanceScore));
  
  return {
    url,
    name: path.basename(filePath),
    performanceScore,
    issues
  };
}

console.log('🚀 Starting Lighthouse Performance Audit...\n');

pagesToAudit.forEach(page => {
  const filePath = path.join(__dirname, '../..', page.file);
  if (fs.existsSync(filePath)) {
    const result = analyzePerformance(filePath, page.url);
    results.push(result);
    
    console.log(`📄 ${page.name} (${page.url})`);
    console.log(`   Performance Score: ${result.performanceScore}/100`);
    if (result.issues.length > 0) {
      console.log(`   Issues:`);
      result.issues.forEach(issue => console.log(`   - ${issue}`));
    }
    console.log('');
  }
});

// Save results
const reportPath = path.join(__dirname, '../../seo/lighthouse-summary.json');
fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

console.log(`✅ Performance audit complete!`);
console.log(`📄 Report saved to: seo/lighthouse-summary.json\n`);

// Recommendations
console.log('💡 Key Recommendations:');
console.log('   1. Add defer/async to external scripts');
console.log('   2. Implement lazy loading for images');
console.log('   3. Add preconnect for external resources');
console.log('   4. Inline critical CSS');
console.log('   5. Optimize images (WebP, proper sizing)');
console.log('   6. Add font-display: swap to web fonts\n');
