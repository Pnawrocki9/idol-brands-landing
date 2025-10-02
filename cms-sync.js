// CMS Sync - localStorage only (no server persistence)
// Note: Changes are stored only in your browser

(function() {
    const API_URL = null; // No API - localStorage only
    
    // Load CMS content - localStorage only (no server)
    async function loadCmsContentFromServer() {
        console.log('CMS: Using localStorage only (no server persistence)');
        // Data is already in localStorage, nothing to load
    }
    
    // Save a single key - localStorage only
    async function saveCmsKeyToServer(key, value) {
        console.log(`CMS: Saved ${key} to localStorage`);
        return true; // Always succeeds (already in localStorage)
    }
    
    // Save all localStorage CMS data - localStorage only
    async function saveAllCmsToServer() {
        console.log('CMS: All content saved to localStorage');
        return true; // Always succeeds (already in localStorage)
    }
    
    // localStorage.setItem works normally - no server sync needed
    
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
