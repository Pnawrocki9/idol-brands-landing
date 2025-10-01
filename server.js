const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.static('.'));

// Store for CMS content - will be persisted to JSON file
const CMS_DATA_FILE = path.join(__dirname, 'cms-data.json');

// Load CMS data from file
async function loadCmsData() {
    try {
        const data = await fs.readFile(CMS_DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // If file doesn't exist, return empty object
        return {};
    }
}

// Save CMS data to file
async function saveCmsData(data) {
    await fs.writeFile(CMS_DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
}

// API endpoint to get all CMS content
app.get('/api/cms-content', async (req, res) => {
    try {
        const data = await loadCmsData();
        res.json(data);
    } catch (error) {
        console.error('Error loading CMS data:', error);
        res.status(500).json({ error: 'Failed to load CMS data' });
    }
});

// API endpoint to save CMS content
app.post('/api/cms-content', async (req, res) => {
    try {
        const data = req.body;
        await saveCmsData(data);
        
        // Also update HTML files with the new content
        await updateHtmlFiles(data);
        
        res.json({ success: true, message: 'Content saved successfully' });
    } catch (error) {
        console.error('Error saving CMS data:', error);
        res.status(500).json({ error: 'Failed to save CMS data' });
    }
});

// API endpoint to save a single key-value pair
app.post('/api/cms-content/:key', async (req, res) => {
    try {
        const { key } = req.params;
        const { value } = req.body;
        
        const data = await loadCmsData();
        data[key] = value;
        await saveCmsData(data);
        
        // Update HTML files with the new content
        await updateHtmlFiles(data);
        
        res.json({ success: true, message: 'Content saved successfully' });
    } catch (error) {
        console.error('Error saving CMS data:', error);
        res.status(500).json({ error: 'Failed to save CMS data' });
    }
});

// Update HTML files with CMS content
async function updateHtmlFiles(cmsData) {
    const htmlFiles = [
        'index.html',
        'index-pl.html',
        'about.html',
        'about-pl.html',
        'how-it-works.html',
        'how-it-works-pl.html',
        'success-stories.html',
        'success-stories-pl.html',
        'blog.html',
        'blog-pl.html',
        'login.html',
        'login-pl.html',
        'your-documents.html',
        'your-documents-pl.html'
    ];
    
    for (const file of htmlFiles) {
        const filePath = path.join(__dirname, file);
        try {
            let html = await fs.readFile(filePath, 'utf-8');
            
            // Inject CMS data into HTML
            html = injectCmsData(html, cmsData);
            
            await fs.writeFile(filePath, html, 'utf-8');
        } catch (error) {
            console.error(`Error updating ${file}:`, error);
        }
    }
}

// Inject CMS data into HTML
function injectCmsData(html, cmsData) {
    // Create a script tag that will set the CMS data in localStorage
    const cmsDataScript = `
    <script>
        // Auto-inject CMS data from server
        (function() {
            const cmsData = ${JSON.stringify(cmsData)};
            for (const [key, value] of Object.entries(cmsData)) {
                localStorage.setItem(key, value);
            }
        })();
    </script>`;
    
    // Insert before closing </head> tag or at the beginning of <body>
    if (html.includes('</head>')) {
        html = html.replace('</head>', `${cmsDataScript}\n</head>`);
    } else if (html.includes('<body')) {
        html = html.replace('<body', `${cmsDataScript}\n<body`);
    }
    
    return html;
}

app.listen(PORT, () => {
    console.log(`CMS Server running on http://localhost:${PORT}`);
    console.log('CMS content will be persisted and published automatically.');
});
