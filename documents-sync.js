// Documents Sync - Separate sync for document files
// Documents are stored separately because they're too large to include in main CMS sync

(function() {
    const DOCUMENTS_API_URL = window.location.origin + '/.netlify/functions/documents';
    
    // Load documents from server on page load
    async function loadDocumentsFromServer() {
        try {
            const response = await fetch(DOCUMENTS_API_URL);
            if (response.ok) {
                const documents = await response.json();
                localStorage.setItem('documents', JSON.stringify(documents));
                console.log('Documents loaded from server:', documents.length, 'files');
                return documents;
            }
        } catch (error) {
            console.warn('Could not load documents from server:', error);
        }
        return null;
    }
    
    // Save documents to server
    async function saveDocumentsToServer() {
        try {
            const documentsStr = localStorage.getItem('documents');
            if (!documentsStr) {
                console.log('No documents to sync');
                return true;
            }
            
            const documents = JSON.parse(documentsStr);
            console.log('Publishing documents to server:', documents.length, 'files');
            
            const response = await fetch(DOCUMENTS_API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(documents)
            });
            
            if (response.ok) {
                console.log('Documents saved to server successfully');
                return true;
            } else {
                console.error('Failed to save documents to server');
                return false;
            }
        } catch (error) {
            console.error('Error saving documents to server:', error);
            return false;
        }
    }
    
    // Load documents from server on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadDocumentsFromServer);
    } else {
        loadDocumentsFromServer();
    }
    
    // Expose functions globally
    window.documentsSync = {
        load: loadDocumentsFromServer,
        save: saveDocumentsToServer
    };
    
    // Add publish button for documents if on admin page
    if (window.location.pathname.includes('admin')) {
        document.addEventListener('DOMContentLoaded', function() {
            // Find the documents section
            const docSection = document.querySelector('#admin-doc-list');
            if (docSection && docSection.parentElement) {
                const publishBtn = document.createElement('button');
                publishBtn.id = 'publish-documents-btn';
                publishBtn.className = 'mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold';
                publishBtn.innerHTML = '📤 Opublikuj dokumenty online';
                publishBtn.onclick = async function() {
                    this.disabled = true;
                    this.innerHTML = '⏳ Publikowanie...';
                    
                    const success = await saveDocumentsToServer();
                    
                    if (success) {
                        this.innerHTML = '✅ Dokumenty opublikowane!';
                        this.className = 'mt-4 bg-green-500 text-white px-6 py-2 rounded-lg font-semibold';
                        setTimeout(() => {
                            this.innerHTML = '📤 Opublikuj dokumenty online';
                            this.className = 'mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold';
                            this.disabled = false;
                        }, 3000);
                    } else {
                        this.innerHTML = '❌ Błąd publikacji';
                        this.className = 'mt-4 bg-red-600 text-white px-6 py-2 rounded-lg font-semibold';
                        setTimeout(() => {
                            this.innerHTML = '📤 Opublikuj dokumenty online';
                            this.className = 'mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold';
                            this.disabled = false;
                        }, 3000);
                    }
                };
                
                // Insert button after the document list
                docSection.parentElement.insertBefore(publishBtn, docSection.nextSibling);
            }
        });
    }
})();
