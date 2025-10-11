#!/usr/bin/env node

/**
 * Static Site Generation for Blog Posts
 * Generates static HTML files for all blog posts to improve SEO
 */

const fs = require('fs');
const path = require('path');

// Read CMS data
const cmsDataPath = path.join(__dirname, '..', 'cms-data.json');
let cmsData = {};

try {
  const rawData = fs.readFileSync(cmsDataPath, 'utf-8');
  cmsData = JSON.parse(rawData);
  console.log('✓ Loaded CMS data');
} catch (error) {
  console.error('⚠️  Could not load cms-data.json, blog posts will use default templates');
}

// Parse blog posts
let postsEN = [];
let postsPL = [];

try {
  if (cmsData.blogPostsEN) {
    postsEN = JSON.parse(cmsData.blogPostsEN);
  }
  if (cmsData.blogPostsPL) {
    postsPL = JSON.parse(cmsData.blogPostsPL);
  }
  console.log(`✓ Found ${postsEN.length} English posts and ${postsPL.length} Polish posts`);
} catch (error) {
  console.error('Error parsing blog posts:', error);
}

// Create blog directory if it doesn't exist
const blogDir = path.join(__dirname, '..', 'blog');
if (!fs.existsSync(blogDir)) {
  fs.mkdirSync(blogDir, { recursive: true });
  console.log('✓ Created /blog directory');
}

// Generate slug from title
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 100);
}

// Generate static HTML for a blog post
function generatePostHTML(post, isPolish = false) {
  const lang = isPolish ? 'pl' : 'en';
  const title = post.title || (isPolish ? 'Bez tytułu' : 'Untitled');
  const content = post.content || '';
  const date = post.date || new Date().toISOString().split('T')[0];
  const description = post.metaDescription || (content ? content.substring(0, 155).replace(/<[^>]*>/g, '') + '...' : '');
  const image = post.img || '/images/hero-market.jpg';
  const featuredSnippet = post.featuredSnippet || '';
  
  const homeLink = isPolish ? 'index-pl.html' : 'index.html';
  const aboutLink = isPolish ? 'about-pl.html' : 'about.html';
  const howLink = isPolish ? 'how-it-works-pl.html' : 'how-it-works.html';
  const successLink = isPolish ? 'success-stories-pl.html' : 'success-stories.html';
  const blogLink = isPolish ? 'blog-pl.html' : 'blog.html';
  const loginLink = isPolish ? 'login-pl.html' : 'login.html';
  const docsLink = isPolish ? 'your-documents-pl.html' : 'your-documents.html';
  
  const navLabels = isPolish ? {
    home: 'Strona główna',
    about: 'O nas',
    how: 'Jak to działa',
    success: 'Historie sukcesu',
    blog: 'Blog',
    calc: 'Kalkulator',
    docs: 'Twoje dokumenty',
    admin: 'Admin',
    login: 'Zaloguj się',
    logout: 'Wyloguj się',
    cta: 'Załóż swoją markę'
  } : {
    home: 'Home',
    about: 'About',
    how: 'How It Works',
    success: 'Success Stories',
    blog: 'Blog',
    calc: 'Calculator',
    docs: 'Your Documents',
    admin: 'Admin',
    login: 'Login',
    logout: 'Logout',
    cta: 'Start Your Brand'
  };

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | Idol Brands Blog</title>
    <meta name="description" content="${description}">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="article">
    <meta property="og:site_name" content="Idol Brands">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="${image}">
    ${isPolish ? '<meta property="og:locale" content="pl_PL">' : ''}
    
    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${title}">
    <meta name="twitter:description" content="${description}">
    <meta name="twitter:image" content="${image}">
    
    <!-- Robots meta -->
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
    
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body {
            font-family: 'Inter', sans-serif;
            color: #000;
        }
        .font-display {
            font-family: 'Playfair Display', serif;
        }
        #post-container a {
            color: #2563eb;
            text-decoration: underline;
            font-weight: 500;
            transition: color 0.2s ease;
        }
        #post-container a:hover {
            color: #1e40af;
        }
        .blog-content h1 { font-size: 2em; font-weight: 700; margin: 1em 0 0.5em; }
        .blog-content h2 { font-size: 1.5em; font-weight: 700; margin: 0.9em 0 0.4em; }
        .blog-content h3 { font-size: 1.3em; font-weight: 600; margin: 0.8em 0 0.3em; }
        .blog-content ul, .blog-content ol { margin: 1em 0; padding-left: 2em; }
        .blog-content li { margin: 0.5em 0; }
        .blog-content p { margin: 1em 0; }
    </style>
    
    <!-- Cookie Consent -->
    <link rel="stylesheet" href="/cookie-consent.css">
    <script src="/cookie-consent.js" defer></script>
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": "${title}",
      "description": "${description}",
      "image": "${image}",
      "datePublished": "${date}",
      "dateModified": "${date}",
      "author": { "@type": "Organization", "name": "Idol Brands" },
      "publisher": {
        "@type": "Organization",
        "name": "Idol Brands",
        "logo": { "@type": "ImageObject", "url": "https://www.idolbrands.com/images/hero-market.jpg" }
      }
    }
    </script>
</head>
<body class="bg-white">
    <!-- Navigation Bar -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="/${homeLink}" class="text-2xl font-display font-bold text-black">Idol Brands</a>
                </div>
                <div class="hidden md:flex items-center space-x-8">
                    <a href="/${homeLink}" class="text-black hover:text-gray-600 transition-colors font-medium">${navLabels.home}</a>
                    <a href="/${aboutLink}" class="text-black hover:text-gray-600 transition-colors font-medium">${navLabels.about}</a>
                    <a href="/${howLink}" class="text-black hover:text-gray-600 transition-colors font-medium">${navLabels.how}</a>
                    <a href="/${successLink}" class="text-black hover:text-gray-600 transition-colors font-medium">${navLabels.success}</a>
                    <a href="/${blogLink}" class="text-black hover:text-gray-600 transition-colors font-medium">${navLabels.blog}</a>
                    <a href="/${homeLink}#start" class="bg-black text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition-colors">${navLabels.cta}</a>
                </div>
            </div>
        </div>
    </nav>

    <!-- Blog Post Content -->
    <main class="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <article id="post-container" class="max-w-4xl mx-auto">
            ${post.img ? `<img src="${post.img}" alt="${title}" class="w-full h-auto rounded-xl mb-6" loading="eager">` : ''}
            ${date ? `<p class="text-sm text-gray-500 mb-2">${date}</p>` : ''}
            <h1 class="text-4xl font-display font-bold text-black mb-4">${title}</h1>
            ${featuredSnippet ? `
            <div class="featured-snippet bg-gray-50 border-l-4 border-black p-4 mb-6 rounded">
                <p class="text-base text-gray-800 font-medium">${featuredSnippet}</p>
            </div>
            ` : ''}
            <div class="text-lg text-gray-700 blog-content">
                ${content}
            </div>
            <div class="mt-12 pt-8 border-t border-gray-200">
                <a href="/${blogLink}" class="inline-flex items-center text-black hover:text-gray-600 font-medium">
                    <i class="fas fa-arrow-left mr-2"></i>
                    ${isPolish ? 'Wróć do bloga' : 'Back to Blog'}
                </a>
            </div>
        </article>
    </main>

    <!-- Footer -->
    <footer class="bg-black text-white mt-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div class="space-y-3">
          <h3 class="text-xl font-display font-bold">Idol Brands</h3>
        </div>
        <div>
          <h4 class="font-semibold mb-3">${isPolish ? 'Firma' : 'Company'}</h4>
          <ul class="space-y-2 text-sm text-gray-300">
            <li><a href="/${aboutLink}" class="hover:underline">${navLabels.about}</a></li>
            <li><a href="/${howLink}" class="hover:underline">${navLabels.how}</a></li>
            <li><a href="/${successLink}" class="hover:underline">${navLabels.success}</a></li>
            <li><a href="/${blogLink}" class="hover:underline">${navLabels.blog}</a></li>
          </ul>
        </div>
      </div>
      <div class="border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-400 text-center">
          <span>© ${new Date().getFullYear()} Idol Brands. All rights reserved.</span>
        </div>
      </div>
    </footer>
    
    <script src="/auth.js"></script>
</body>
</html>`;
}

// Generate all blog posts
const generatedPosts = [];

// English posts
postsEN.forEach((post, index) => {
  const slug = generateSlug(post.title || `post-${index}`);
  const filename = `${slug}-en.html`;
  const filepath = path.join(blogDir, filename);
  const html = generatePostHTML(post, false);
  
  fs.writeFileSync(filepath, html, 'utf-8');
  generatedPosts.push({
    url: `https://www.idolbrands.com/blog/${filename}`,
    lang: 'en',
    slug: slug
  });
  console.log(`✓ Generated: /blog/${filename}`);
});

// Polish posts
postsPL.forEach((post, index) => {
  const slug = generateSlug(post.title || `post-${index}`);
  const filename = `${slug}-pl.html`;
  const filepath = path.join(blogDir, filename);
  const html = generatePostHTML(post, true);
  
  fs.writeFileSync(filepath, html, 'utf-8');
  generatedPosts.push({
    url: `https://www.idolbrands.com/blog/${filename}`,
    lang: 'pl',
    slug: slug
  });
  console.log(`✓ Generated: /blog/${filename}`);
});

// Update sitemap.xml
const sitemapPath = path.join(__dirname, '..', 'sitemap.xml');
let sitemap = fs.readFileSync(sitemapPath, 'utf-8');

// Remove old blog post entries if they exist
sitemap = sitemap.replace(/  <!-- GENERATED BLOG POSTS START -->[\s\S]*?<!-- GENERATED BLOG POSTS END -->\n/g, '');

// Generate new sitemap entries
const sitemapEntries = generatedPosts.map(post => `  <url>
    <loc>${post.url}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');

// Insert before closing </urlset>
const sitemapWithPosts = sitemap.replace(
  '</urlset>',
  `  <!-- GENERATED BLOG POSTS START -->
${sitemapEntries}
  <!-- GENERATED BLOG POSTS END -->
</urlset>`
);

fs.writeFileSync(sitemapPath, sitemapWithPosts, 'utf-8');
console.log(`✓ Updated sitemap.xml with ${generatedPosts.length} blog posts`);

// Generate redirects for SEO-friendly URLs
const redirectsPath = path.join(__dirname, '..', '_redirects');
let redirects = '';

if (fs.existsSync(redirectsPath)) {
  redirects = fs.readFileSync(redirectsPath, 'utf-8');
}

// Remove old blog redirects
redirects = redirects.replace(/# GENERATED BLOG REDIRECTS START[\s\S]*?# GENERATED BLOG REDIRECTS END\n/g, '');

// Generate new redirects
const newRedirects = [
  '# GENERATED BLOG REDIRECTS START',
  ...postsEN.map((post, index) => {
    const slug = generateSlug(post.title || `post-${index}`);
    return `/blog/${slug} /blog/${slug}-en.html 200`;
  }),
  ...postsPL.map((post, index) => {
    const slug = generateSlug(post.title || `post-${index}`);
    return `/blog/${slug}-pl /blog/${slug}-pl.html 200`;
  }),
  '# Keep old query-param URLs working',
  ...postsEN.map((post, index) => {
    const slug = generateSlug(post.title || `post-${index}`);
    return `/post.html?index=${index} /blog/${slug}-en.html 301`;
  }),
  ...postsPL.map((post, index) => {
    const slug = generateSlug(post.title || `post-${index}`);
    return `/post-pl.html?index=${index} /blog/${slug}-pl.html 301`;
  }),
  '# GENERATED BLOG REDIRECTS END'
].join('\n');

redirects = newRedirects + '\n' + redirects;
fs.writeFileSync(redirectsPath, redirects, 'utf-8');
console.log('✓ Updated _redirects with SEO-friendly URLs');

console.log('\n✅ Blog static generation complete!');
console.log(`   Generated ${postsEN.length + postsPL.length} static HTML pages`);
console.log(`   Updated sitemap.xml and _redirects`);
console.log('\n🚀 Next steps:');
console.log('   1. Commit and push changes');
console.log('   2. Deploy to Netlify');
console.log('   3. Test in Google Search Console');
