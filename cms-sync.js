// CMS Sync - Syncs localStorage changes to server for persistence
// This ensures that CMS changes are published online, not just stored locally

(function() {
    const API_URL = window.location.origin + '/.netlify/functions/cms-content';
    
    // Load CMS content from server on page load
    async function loadCmsContentFromServer() {
        try {
            const response = await fetch(API_URL);
            if (response.ok) {
                const data = await response.json();
                // Populate localStorage with server data
                for (const [key, value] of Object.entries(data)) {
                    localStorage.setItem(key, value);
                }
                console.log('CMS content loaded from server');
            }
        } catch (error) {
            console.warn('Could not load CMS content from server:', error);
        }
    }
    
    // Save all localStorage CMS data to server
    async function saveAllCmsToServer() {
        try {
            const cmsData = {};
            
            // Collect all CMS-related keys from localStorage (EXCLUDING documents - they're too large)
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                // Include all keys except admin credentials, user data, and documents
                // Documents are excluded because Base64-encoded files are too large for GitHub API
                if (key && !key.includes('admin') && !key.includes('loggedIn') && key !== 'users' && key !== 'documents') {
                    const value = localStorage.getItem(key);
                    if (value !== null) {
                        cmsData[key] = value;
                    }
                }
            }
            
            console.log('Publishing CMS data with keys:', Object.keys(cmsData));
            console.log('Documents excluded from sync (too large for GitHub API)');
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cmsData)
            });
            
            if (response.ok) {
                console.log('All CMS content saved to server (documents stored locally only)');
                return true;
            } else {
                console.error('Failed to save CMS content to server');
                return false;
            }
        } catch (error) {
            console.error('Error saving to server:', error);
            return false;
        }
    }
    
    // Load content from server on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadCmsContentFromServer);
    } else {
        loadCmsContentFromServer();
    }
    
    // Expose functions globally for manual sync
    window.cmsSyncToServer = saveAllCmsToServer;
    window.cmsLoadFromServer = loadCmsContentFromServer;
    
    // Add sync button functionality if on admin page
    if (window.location.pathname.includes('admin')) {
        document.addEventListener('DOMContentLoaded', function() {
            // Add a "Publish Changes" button to admin panel
            const publishButton = document.createElement('button');
            publishButton.id = 'publish-cms-changes';
            publishButton.className = 'fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors font-semibold z-50';
            publishButton.innerHTML = '📤 Publikuj Treści Online';
            publishButton.title = 'Publikuje teksty, nagłówki i ustawienia (bez dokumentów)';
            publishButton.onclick = async function() {
                this.disabled = true;
                this.innerHTML = '⏳ Publikowanie...';
                
                const success = await saveAllCmsToServer();
                
                if (success) {
                    this.innerHTML = '✅ Treści opublikowane!';
                    this.className = 'fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold z-50';
                    setTimeout(() => {
                        this.innerHTML = '📤 Publikuj Treści Online';
                        this.className = 'fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors font-semibold z-50';
                        this.disabled = false;
                    }, 3000);
                } else {
                    this.innerHTML = '❌ Błąd publikacji';
                    this.className = 'fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold z-50';
                    setTimeout(() => {
                        this.innerHTML = '📤 Publikuj Treści Online';
                        this.className = 'fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors font-semibold z-50';
                        this.disabled = false;
                    }, 3000);
                }
            };
            document.body.appendChild(publishButton);
        });
    }
})();
