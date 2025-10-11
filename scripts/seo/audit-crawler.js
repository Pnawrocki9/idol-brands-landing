#!/usr/bin/env node
/**
 * SEO Audit Crawler - Idol Brands
 * Crawls all HTML pages and generates findings CSV
 */

const fs = require('fs');
const path = require('path');

const findings = [];
let findingId = 1;

function addFinding(url, type, status, priority, description) {
  findings.push({
    id: findingId++,
    url,
    type,
    status,
    priority,
    description
  });
}

// Scan HTML files
function scanDirectory(dir, baseDir = dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules' && file !== 'landing') {
      scanDirectory(fullPath, baseDir);
    } else if (file.endsWith('.html') && !file.endsWith('.bak')) {
      const relativePath = path.relative(baseDir, fullPath);
      analyzeHtmlFile(fullPath, '/' + relativePath.replace(/\\/g, '/'));
    }
  });
}

function analyzeHtmlFile(filePath, url) {
  const content = fs.readFileSync(filePath, 'utf-8');
  
  // Check meta description
  if (!/<meta\s+name=["']description["']/i.test(content)) {
    addFinding(url, 'on-page', 'CRITICAL', 'P0', 'Missing meta description');
  }
  
  // Check title uniqueness and length
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  if (!titleMatch) {
    addFinding(url, 'on-page', 'CRITICAL', 'P0', 'Missing <title> tag');
  } else {
    const titleLength = titleMatch[1].length;
    if (titleLength < 30) {
      addFinding(url, 'on-page', 'WARNING', 'P1', `Title too short (${titleLength} chars)`);
    } else if (titleLength > 60) {
      addFinding(url, 'on-page', 'WARNING', 'P1', `Title too long (${titleLength} chars)`);
    }
  }
  
  // Check canonical
  if (!/<link\s+rel=["']canonical["']/i.test(content)) {
    addFinding(url, 'indexing', 'CRITICAL', 'P0', 'Missing canonical tag');
  } else {
    // Check if canonical is empty
    const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    if (canonicalMatch && !canonicalMatch[1]) {
      addFinding(url, 'indexing', 'CRITICAL', 'P0', 'Empty canonical URL');
    }
  }
  
  // Check Open Graph
  if (!/<meta\s+property=["']og:title["']/i.test(content)) {
    addFinding(url, 'social', 'WARNING', 'P1', 'Missing Open Graph tags');
  }
  
  // Check Twitter Cards
  if (!/<meta\s+name=["']twitter:card["']/i.test(content)) {
    addFinding(url, 'social', 'WARNING', 'P1', 'Missing Twitter Card tags');
  }
  
  // Check Schema.org structured data
  if (!/<script\s+type=["']application\/ld\+json["']/i.test(content)) {
    addFinding(url, 'structured-data', 'WARNING', 'P1', 'Missing Schema.org structured data');
  }
  
  // Check H1 tag
  const h1Matches = content.match(/<h1[^>]*>/gi);
  if (!h1Matches || h1Matches.length === 0) {
    addFinding(url, 'on-page', 'WARNING', 'P1', 'Missing H1 tag');
  } else if (h1Matches.length > 1) {
    addFinding(url, 'on-page', 'WARNING', 'P2', `Multiple H1 tags (${h1Matches.length})`);
  }
  
  // Check lang attribute
  if (!/<html\s+lang=["']/i.test(content)) {
    addFinding(url, 'accessibility', 'WARNING', 'P1', 'Missing lang attribute on <html>');
  }
  
  // Check image alt attributes
  const imgMatches = content.match(/<img[^>]*>/gi);
  if (imgMatches) {
    imgMatches.forEach(img => {
      if (!/alt=["']/i.test(img)) {
        addFinding(url, 'accessibility', 'WARNING', 'P2', 'Image missing alt attribute');
      }
    });
  }
  
  // Check for render-blocking resources
  const externalStylesheets = content.match(/<link[^>]+href=["']https?:\/\/[^"']+\.css["']/gi);
  if (externalStylesheets && externalStylesheets.length > 0) {
    addFinding(url, 'performance', 'INFO', 'P2', `${externalStylesheets.length} external stylesheets (potential render-blocking)`);
  }
  
  // Check for lazy loading on images
  if (imgMatches && imgMatches.some(img => !/loading=["']lazy["']/i.test(img))) {
    addFinding(url, 'performance', 'INFO', 'P2', 'Images not using lazy loading');
  }
}

// Scan sitemap
function checkSitemap() {
  const sitemapPath = path.join(__dirname, '../../sitemap.xml');
  if (!fs.existsSync(sitemapPath)) {
    addFinding('/sitemap.xml', 'indexing', 'CRITICAL', 'P0', 'Sitemap not found');
    return;
  }
  
  const sitemap = fs.readFileSync(sitemapPath, 'utf-8');
  
  // Check for .md files in sitemap
  if (sitemap.includes('.md</loc>')) {
    addFinding('/sitemap.xml', 'indexing', 'CRITICAL', 'P0', 'Sitemap contains .md files (should be HTML)');
  }
  
  // Check for llms.txt
  if (sitemap.includes('llms.txt</loc>')) {
    addFinding('/sitemap.xml', 'indexing', 'WARNING', 'P1', 'Sitemap contains llms.txt (non-standard)');
  }
  
  // Check for lastmod, priority, changefreq
  if (!sitemap.includes('<lastmod>')) {
    addFinding('/sitemap.xml', 'indexing', 'INFO', 'P2', 'Sitemap missing <lastmod> tags');
  }
  if (!sitemap.includes('<priority>')) {
    addFinding('/sitemap.xml', 'indexing', 'INFO', 'P2', 'Sitemap missing <priority> tags');
  }
}

// Check robots.txt
function checkRobots() {
  const robotsPath = path.join(__dirname, '../../robots.txt');
  if (!fs.existsSync(robotsPath)) {
    addFinding('/robots.txt', 'indexing', 'CRITICAL', 'P0', 'robots.txt not found');
    return;
  }
  
  const robots = fs.readFileSync(robotsPath, 'utf-8');
  
  // Check for sitemap reference
  if (!robots.includes('Sitemap:')) {
    addFinding('/robots.txt', 'indexing', 'WARNING', 'P1', 'robots.txt missing Sitemap directive');
  }
}

// Main execution
console.log('🔍 Starting SEO Audit Crawler...\n');

checkRobots();
checkSitemap();
scanDirectory(path.join(__dirname, '../..'));

// Generate CSV
const csvHeader = 'ID,URL,Type,Status,Priority,Description\n';
const csvRows = findings.map(f => 
  `${f.id},"${f.url}","${f.type}","${f.status}","${f.priority}","${f.description}"`
).join('\n');

const csvContent = csvHeader + csvRows;
const outputPath = path.join(__dirname, '../../seo/findings.csv');
fs.writeFileSync(outputPath, csvContent);

console.log(`✅ Audit complete! Found ${findings.length} issues.`);
console.log(`📄 Report saved to: seo/findings.csv\n`);

// Summary by priority
const p0 = findings.filter(f => f.priority === 'P0').length;
const p1 = findings.filter(f => f.priority === 'P1').length;
const p2 = findings.filter(f => f.priority === 'P2').length;

console.log('📊 Summary by Priority:');
console.log(`   P0 (Critical): ${p0}`);
console.log(`   P1 (High):     ${p1}`);
console.log(`   P2 (Medium):   ${p2}\n`);
