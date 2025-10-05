// Netlify Function for CMS content management
// Uses GitHub API to store data in repository

const fetch = require('node-fetch');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'Pnawrocki9/idol-brands-landing';
const DATA_FILE_PATH = 'cms-data.json';

// In-memory cache to reduce GitHub API calls on warm instances
let cachedData = null;
let cachedAt = 0;
let lastEtag = null;
const CACHE_TTL_MS = parseInt(process.env.CMS_CACHE_TTL_MS || '60000', 10);

// Load CMS data from GitHub repository
async function loadCmsData() {
    if (!GITHUB_TOKEN) {
        console.log('No GitHub token');
        return {};
    }

    try {
        // Serve from cache if still fresh
        if (cachedData && Date.now() - cachedAt < CACHE_TTL_MS) {
            return cachedData;
        }

        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/${DATA_FILE_PATH}`,
            {
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    ...(lastEtag ? { 'If-None-Match': lastEtag } : {})
                }
            }
        );

        if (response.status === 304 && cachedData) {
            // Not modified, refresh cache timestamp and return
            cachedAt = Date.now();
            return cachedData;
        }

        if (response.ok) {
            const fileData = await response.json();
            const content = Buffer.from(fileData.content, 'base64').toString('utf-8');
            const parsed = JSON.parse(content);
            cachedData = parsed;
            cachedAt = Date.now();
            lastEtag = response.headers.get('etag') || null;
            return parsed;
        } else {
            console.log('CMS data file not found');
            return {};
        }
    } catch (error) {
        console.error('Error loading from GitHub:', error);
        return {};
    }
}

// Save CMS data to GitHub repository
async function saveCmsData(data) {
    if (!GITHUB_TOKEN) {
        throw new Error('No GitHub token configured');
    }

    try {
        // Get current file SHA
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

        // Update or create file
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

        if (!updateResponse.ok) {
            const error = await updateResponse.json();
            throw new Error(`GitHub API error: ${JSON.stringify(error)}`);
        }

        return true;
    } catch (error) {
        console.error('Error saving to GitHub:', error);
        throw error;
    }
}

exports.handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    // Handle preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        if (event.httpMethod === 'GET') {
            // Get all CMS content
            const data = await loadCmsData();
            return {
                statusCode: 200,
                headers: {
                    ...headers,
                    'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=86400'
                },
                body: JSON.stringify(data)
            };
        } else if (event.httpMethod === 'POST') {
            // Save CMS content
            const data = JSON.parse(event.body);
            await saveCmsData(data);
            // Invalidate in-memory cache after write
            cachedData = null;
            cachedAt = 0;
            lastEtag = null;
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true, message: 'Content saved successfully' })
            };
        } else {
            return {
                statusCode: 405,
                headers,
                body: JSON.stringify({ error: 'Method not allowed' })
            };
        }
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: 'Internal server error', message: error.message })
        };
    }
};
