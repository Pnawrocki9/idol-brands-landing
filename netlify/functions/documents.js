// Netlify Function for document storage management
// Uses GitHub API to store document references separately from CMS content

const fetch = require('node-fetch');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'Pnawrocki9/idol-brands-landing';
const DOCUMENTS_FILE_PATH = 'documents-data.json';

// Load documents data from GitHub repository
async function loadDocuments() {
    if (!GITHUB_TOKEN) {
        console.log('No GitHub token');
        return [];
    }

    try {
        const response = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/${DOCUMENTS_FILE_PATH}`,
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
            return JSON.parse(content);
        } else {
            console.log('Documents data file not found');
            return [];
        }
    } catch (error) {
        console.error('Error loading documents from GitHub:', error);
        return [];
    }
}

// Save documents data to GitHub repository
async function saveDocuments(documents) {
    if (!GITHUB_TOKEN) {
        throw new Error('No GitHub token configured');
    }

    try {
        // Get current file SHA
        const getResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/${DOCUMENTS_FILE_PATH}`,
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
        const content = Buffer.from(JSON.stringify(documents, null, 2)).toString('base64');
        const updateResponse = await fetch(
            `https://api.github.com/repos/${GITHUB_REPO}/contents/${DOCUMENTS_FILE_PATH}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Update documents data',
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
        console.error('Error saving documents to GitHub:', error);
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
            // Get all documents
            const documents = await loadDocuments();
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify(documents)
            };
        } else if (event.httpMethod === 'POST') {
            // Save documents
            const documents = JSON.parse(event.body);
            await saveDocuments(documents);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true, message: 'Documents saved successfully' })
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
