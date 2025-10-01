// Vercel Serverless Function for CMS content management
// Uses Vercel KV for persistent storage

// Initialize KV storage (will be set up in Vercel dashboard)
let kv;
try {
    // Import Vercel KV if available
    kv = require('@vercel/kv');
} catch (e) {
    // Fallback for local development
    kv = null;
}

// Load CMS data from KV store or fallback storage
async function loadCmsData() {
    if (kv && process.env.KV_REST_API_URL) {
        try {
            const data = await kv.get('cms-data');
            return data || {};
        } catch (error) {
            console.error('KV load error:', error);
            return {};
        }
    }
    // Fallback to environment variable for initial data
    return JSON.parse(process.env.CMS_DATA || '{}');
}

// Save CMS data to KV store
async function saveCmsData(data) {
    if (kv && process.env.KV_REST_API_URL) {
        try {
            await kv.set('cms-data', data);
        } catch (error) {
            console.error('KV save error:', error);
            throw error;
        }
    } else {
        // For local dev or if KV not configured, just log
        console.log('KV not configured. Data would be:', data);
    }
}

module.exports = async (req, res) => {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }
    
    try {
        if (req.method === 'GET') {
            // Get all CMS content
            const data = await loadCmsData();
            res.status(200).json(data);
        } else if (req.method === 'POST') {
            // Save CMS content
            const data = req.body;
            await saveCmsData(data);
            res.status(200).json({ success: true, message: 'Content saved successfully' });
        } else {
            res.status(405).json({ error: 'Method not allowed' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
