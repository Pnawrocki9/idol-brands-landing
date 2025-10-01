// Vercel Serverless Function for CMS content management
// Uses GitHub API to store data in repository

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'Pnawrocki9/idol-brands-landing';
const DATA_FILE_PATH = 'cms-data.json';

// In-memory cache for CMS data (persists during function lifetime)
let cmsCache = null;

// Load CMS data from GitHub repository
async function loadCmsData() {
    if (cmsCache) {
        return cmsCache;
    }

    if (!GITHUB_TOKEN) {
        console.log('No GitHub token, using fallback data');
        return JSON.parse(process.env.CMS_DATA || '{}');
    }

    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`,
            {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        if (response.ok) {
            const fileData = await response.json();
            const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
            cmsCache = JSON.parse(content);
            return cmsCache;
        } else {
            console.log('CMS data file not found in repo, returning empty');
            return {};
        }
    } catch (error) {
        console.error('Error loading from GitHub:', error);
        return JSON.parse(process.env.CMS_DATA || '{}');
    }
}

// Save CMS data to GitHub repository
async function saveCmsData(data) {
    if (!GITHUB_TOKEN) {
        console.log('No GitHub token, data not saved:', data);
        cmsCache = data;
        return;
    }

    try {
        // First, get the current file SHA (required for update)
        const getResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`,
            {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                }
            }
        );

        let sha = null;
        if (getResponse.ok) {
            const fileData = await getResponse.json();
            sha = fileData.sha;
        }

        // Update or create the file
        const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');
        const updateResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Update CMS content',
                    content: content,
                    sha: sha
                })
            }
        );

        if (updateResponse.ok) {
            cmsCache = data;
            console.log('CMS data saved to GitHub successfully');
        } else {
            const error = await updateResponse.json();
            console.error('GitHub API error:', error);
            throw new Error('Failed to save to GitHub');
        }
    } catch (error) {
        console.error('Error saving to GitHub:', error);
        throw error;
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
