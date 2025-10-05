// Netlify Function for cookie consent tracking
// Stores consent data in GitHub repository

const fetch = require('node-fetch');

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'Pnawrocki9/idol-brands-landing';
const DATA_FILE_PATH = 'cookie-consents.json';

// Load consent data from GitHub repository
async function loadConsentData() {
    if (!GITHUB_TOKEN) {
        console.log('No GitHub token, using empty data');
        return { consents: [], stats: { total: 0, accepted: 0, rejected: 0, customized: 0 } };
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
            return JSON.parse(content);
        } else {
            console.log('Consent data file not found, creating new');
            return { consents: [], stats: { total: 0, accepted: 0, rejected: 0, customized: 0 } };
        }
    } catch (error) {
        console.error('Error loading from GitHub:', error);
        return { consents: [], stats: { total: 0, accepted: 0, rejected: 0, customized: 0 } };
    }
}

// Save consent data to GitHub repository
async function saveConsentData(data) {
    if (!GITHUB_TOKEN) {
        console.log('No GitHub token configured, skipping save');
        return false;
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
                    message: 'Update cookie consent data',
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

// Calculate statistics from consent data
function calculateStats(consents) {
    const stats = {
        total: consents.length,
        accepted: 0,
        rejected: 0,
        customized: 0,
        analytics: 0,
        marketing: 0,
        byLanguage: { en: 0, pl: 0 },
        byDate: {}
    };

    consents.forEach(consent => {
        // Count consent types
        if (consent.analytics && consent.marketing) {
            stats.accepted++;
        } else if (!consent.analytics && !consent.marketing) {
            stats.rejected++;
        } else {
            stats.customized++;
        }

        // Count cookie categories
        if (consent.analytics) stats.analytics++;
        if (consent.marketing) stats.marketing++;

        // Count by language
        if (consent.language) {
            stats.byLanguage[consent.language] = (stats.byLanguage[consent.language] || 0) + 1;
        }

        // Count by date
        if (consent.timestamp) {
            const date = new Date(consent.timestamp).toISOString().split('T')[0];
            stats.byDate[date] = (stats.byDate[date] || 0) + 1;
        }
    });

    return stats;
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
            // Get consent statistics
            const data = await loadConsentData();
            const stats = calculateStats(data.consents || []);
            
            // Check if full export is requested
            const queryParams = event.queryStringParameters || {};
            const exportAll = queryParams.export === 'all';
            const format = queryParams.format || 'json';
            
            if (exportAll) {
                // Return all consents for audit/export
                const allConsents = (data.consents || []).reverse();
                
                if (format === 'csv') {
                    // Convert to CSV format
                    const csvHeaders = 'Timestamp,Date,Language,Necessary,Analytics,Marketing,Type,URL,Referrer,IP,User Agent\n';
                    const csvRows = allConsents.map(c => {
                        const date = new Date(c.timestamp).toISOString();
                        const type = (c.analytics && c.marketing) ? 'Accepted All' : 
                                   (!c.analytics && !c.marketing) ? 'Rejected All' : 'Customized';
                        return `${c.timestamp},"${date}",${c.language || 'en'},${c.necessary || true},${c.analytics || false},${c.marketing || false},"${type}","${c.url || ''}","${c.referrer || ''}","${c.ip || ''}","${c.userAgent || ''}"`;
                    }).join('\n');
                    
                    return {
                        statusCode: 200,
                        headers: {
                            ...headers,
                            'Content-Type': 'text/csv',
                            'Content-Disposition': `attachment; filename="cookie-consents-${Date.now()}.csv"`
                        },
                        body: csvHeaders + csvRows
                    };
                } else {
                    // Return JSON format with all data
                    return {
                        statusCode: 200,
                        headers,
                        body: JSON.stringify({
                            stats: stats,
                            totalConsents: allConsents.length,
                            consents: allConsents,
                            exportDate: new Date().toISOString()
                        }, null, 2)
                    };
                }
            }
            
            // Default: return stats and recent consents only
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({
                    stats: stats,
                    recentConsents: (data.consents || []).slice(-20).reverse() // Last 20 consents
                })
            };
        } else if (event.httpMethod === 'POST') {
            // Record new consent
            const consentData = JSON.parse(event.body);
            
            // Validate consent data
            if (!consentData || typeof consentData !== 'object') {
                return {
                    statusCode: 400,
                    headers,
                    body: JSON.stringify({ error: 'Invalid consent data' })
                };
            }

            // Load existing data
            const data = await loadConsentData();
            
            // Add new consent with metadata
            const newConsent = {
                ...consentData,
                timestamp: Date.now(),
                ip: event.headers['x-forwarded-for'] || event.headers['client-ip'] || 'unknown',
                userAgent: event.headers['user-agent'] || 'unknown'
            };
            
            data.consents = data.consents || [];
            data.consents.push(newConsent);
            
            // Update statistics
            data.stats = calculateStats(data.consents);
            
            // Save updated data
            await saveConsentData(data);
            
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ success: true, message: 'Consent recorded successfully' })
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
