// CMS Sync - Syncs localStorage changes to server for persistence
// This ensures that CMS changes are published online, not just stored locally

(function() {
    const API_URL = window.location.origin + '/api/cms-content';
    
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
            // Fallback to localStorage only
        }
    }
    
    // Save a single key to server
    async function saveCmsKeyToServer(key, value) {
        try {
            const response = await fetch(`${API_URL}/${encodeURIComponent(key)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ value })
            });
            
            if (response.ok) {
                console.log(`CMS content saved to server: ${key}`);
                return true;
            } else {
                console.error(`Failed to save CMS content to server: ${key}`);
                return false;
            }
        } catch (error) {
            console.error('Error saving to server:', error);
            return false;
        }
    }
    
    // Save all localStorage CMS data to server
    async function saveAllCmsToServer() {
        try {
            const cmsData = {};
            
            // Collect all CMS-related keys from localStorage
            const cmsKeys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                // Include keys that are CMS-related (exclude admin credentials)
                if (key && !key.includes('admin') && !key.includes('loggedIn') && key !== 'users') {
                    cmsKeys.push(key);
                }
            }
            
            // Build CMS data object
            for (const key of cmsKeys) {
                const value = localStorage.getItem(key);
                if (value !== null) {
                    cmsData[key] = value;
                }
            }
            
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cmsData)
            });
            
            if (response.ok) {
                console.log('All CMS content saved to server');
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
    
    // Override localStorage.setItem to automatically sync to server
    const originalSetItem = localStorage.setItem;
    localStorage.setItem = function(key, value) {
        // Call original setItem
        originalSetItem.call(this, key, value);
        
        // Sync to server if it's a CMS key (not admin-related)
        if (key && !key.includes('admin') && !key.includes('loggedIn') && key !== 'users') {
            // Debounce to avoid too many requests
            clearTimeout(window._cmsSyncTimeout);
            window._cmsSyncTimeout = setTimeout(() => {
                saveCmsKeyToServer(key, value);
            }, 500);
        }
    };
    
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
            publishButton.innerHTML = '📤 Publikuj Zmiany Online';
            publishButton.onclick = async function() {
                this.disabled = true;
                this.innerHTML = '⏳ Publikowanie...';
                
                const success = await saveAllCmsToServer();
                
                if (success) {
                    this.innerHTML = '✅ Opublikowano!';
                    this.className = 'fixed bottom-6 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg font-semibold z-50';
                    setTimeout(() => {
                        this.innerHTML = '📤 Publikuj Zmiany Online';
                        this.className = 'fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors font-semibold z-50';
                        this.disabled = false;
                    }, 3000);
                } else {
                    this.innerHTML = '❌ Błąd publikacji';
                    this.className = 'fixed bottom-6 right-6 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold z-50';
                    setTimeout(() => {
                        this.innerHTML = '📤 Publikuj Zmiany Online';
                        this.className = 'fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-green-700 transition-colors font-semibold z-50';
                        this.disabled = false;
                    }, 3000);
                }
            };
            document.body.appendChild(publishButton);
        });
    }
})();
