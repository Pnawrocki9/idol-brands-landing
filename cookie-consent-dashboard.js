/**
 * Cookie Consent Dashboard JavaScript
 * Fetches and displays cookie consent analytics
 */

// Global state
let currentConsents = [];
let showingAllConsents = false;
let showDetailedInfo = false;

// Load dashboard data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadDashboard();
});

async function loadDashboard() {
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error');
    const dashboardEl = document.getElementById('dashboard');

    // Show loading state
    loadingEl.style.display = 'block';
    errorEl.style.display = 'none';
    dashboardEl.style.display = 'none';

    try {
        const response = await fetch('/.netlify/functions/cookie-consents');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        // Hide loading, show dashboard
        loadingEl.style.display = 'none';
        dashboardEl.style.display = 'block';

        // Update statistics
        updateStats(data.stats);
        
        // Update charts
        updatePieChart(data.stats);
        updateLanguageChart(data.stats.byLanguage);
        
        // Store consents globally
        currentConsents = data.recentConsents || [];
        
        // Update recent consents table
        updateConsentsTable(currentConsents);

    } catch (error) {
        console.error('Error loading dashboard:', error);
        loadingEl.style.display = 'none';
        errorEl.style.display = 'block';
        errorEl.textContent = `Error loading dashboard: ${error.message}. Please make sure the Netlify function is deployed.`;
    }
}

function updateStats(stats) {
    // Update main statistics
    document.getElementById('total-consents').textContent = stats.total || 0;
    document.getElementById('accepted-consents').textContent = stats.accepted || 0;
    document.getElementById('rejected-consents').textContent = stats.rejected || 0;
    document.getElementById('customized-consents').textContent = stats.customized || 0;

    // Calculate and update percentages
    const total = stats.total || 1; // Avoid division by zero
    const acceptedPercent = ((stats.accepted || 0) / total * 100).toFixed(1);
    const rejectedPercent = ((stats.rejected || 0) / total * 100).toFixed(1);
    const customizedPercent = ((stats.customized || 0) / total * 100).toFixed(1);

    document.getElementById('accepted-percent').textContent = `${acceptedPercent}% of total`;
    document.getElementById('rejected-percent').textContent = `${rejectedPercent}% of total`;
    document.getElementById('customized-percent').textContent = `${customizedPercent}% of total`;

    // Update cookie type counts
    document.getElementById('analytics-count').textContent = stats.analytics || 0;
    document.getElementById('marketing-count').textContent = stats.marketing || 0;
}

function updatePieChart(stats) {
    const canvas = document.getElementById('pieChart');
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const total = stats.total || 1;
    const analytics = stats.analytics || 0;
    const marketing = stats.marketing || 0;
    
    // Calculate percentages
    const analyticsPercent = analytics / total;
    const marketingPercent = marketing / total;
    
    // Draw pie chart
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 80;
    
    let currentAngle = -Math.PI / 2; // Start at top
    
    // Analytics slice
    if (analyticsPercent > 0) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + (analyticsPercent * 2 * Math.PI));
        ctx.closePath();
        ctx.fillStyle = '#667eea';
        ctx.fill();
        currentAngle += analyticsPercent * 2 * Math.PI;
    }
    
    // Marketing slice
    if (marketingPercent > 0) {
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + (marketingPercent * 2 * Math.PI));
        ctx.closePath();
        ctx.fillStyle = '#764ba2';
        ctx.fill();
    }

    // Draw center circle for donut effect
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    
    // Draw total in center
    ctx.fillStyle = '#333';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total, centerX, centerY);
    ctx.font = '12px Arial';
    ctx.fillText('consents', centerX, centerY + 20);
}

function updateLanguageChart(byLanguage) {
    const chartEl = document.getElementById('language-chart');
    chartEl.innerHTML = '';

    const languages = Object.keys(byLanguage);
    if (languages.length === 0) {
        chartEl.innerHTML = '<p style="text-align: center; color: #999;">No data available</p>';
        return;
    }

    const maxValue = Math.max(...Object.values(byLanguage), 1);

    languages.forEach(lang => {
        const value = byLanguage[lang];
        const percentage = (value / maxValue) * 100;
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${percentage}%`;
        bar.innerHTML = `
            <div class="bar-value">${value}</div>
            <div class="bar-label">${lang.toUpperCase()}</div>
        `;
        
        chartEl.appendChild(bar);
    });
}

function updateConsentsTable(consents) {
    const tbody = document.getElementById('consents-tbody');
    const thead = document.getElementById('consents-thead');
    tbody.innerHTML = '';

    if (consents.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #999;">No consents recorded yet</td></tr>';
        return;
    }

    // Update table headers based on detail view
    if (showDetailedInfo) {
        thead.innerHTML = `
            <tr>
                <th>Date & Time</th>
                <th>Language</th>
                <th>Analytics</th>
                <th>Marketing</th>
                <th>Type</th>
                <th>URL</th>
                <th>Referrer</th>
                <th>IP</th>
            </tr>
        `;
    } else {
        thead.innerHTML = `
            <tr>
                <th>Date & Time</th>
                <th>Language</th>
                <th>Analytics</th>
                <th>Marketing</th>
                <th>Type</th>
            </tr>
        `;
    }

    consents.forEach(consent => {
        const row = document.createElement('tr');
        
        // Format date
        const date = new Date(consent.timestamp);
        const formattedDate = date.toLocaleString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Determine consent type
        let type = '';
        let badgeClass = '';
        if (consent.analytics && consent.marketing) {
            type = 'Accepted All';
            badgeClass = 'badge-success';
        } else if (!consent.analytics && !consent.marketing) {
            type = 'Rejected All';
            badgeClass = 'badge-danger';
        } else {
            type = 'Customized';
            badgeClass = 'badge-warning';
        }

        let rowHTML = `
            <td>${formattedDate}</td>
            <td>${(consent.language || 'en').toUpperCase()}</td>
            <td>${consent.analytics ? '✅' : '❌'}</td>
            <td>${consent.marketing ? '✅' : '❌'}</td>
            <td><span class="badge ${badgeClass}">${type}</span></td>
        `;

        if (showDetailedInfo) {
            const url = consent.url || '-';
            const referrer = consent.referrer || 'direct';
            const ip = consent.ip ? consent.ip.split(',')[0].trim() : '-';
            
            rowHTML += `
                <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${url}">${url}</td>
                <td>${referrer}</td>
                <td>${ip}</td>
            `;
        }

        row.innerHTML = rowHTML;
        tbody.appendChild(row);
    });
}

// Toggle detailed information view
function toggleDetailsView() {
    showDetailedInfo = document.getElementById('show-details-toggle').checked;
    updateConsentsTable(currentConsents);
}

// Export to CSV for audit
async function exportToCSV() {
    try {
        const response = await fetch('/.netlify/functions/cookie-consents?export=all&format=csv');
        
        if (!response.ok) {
            throw new Error('Failed to export data');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cookie-consents-audit-${Date.now()}.csv`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        alert('✅ CSV file downloaded successfully! You can now use it for audit purposes.');
    } catch (error) {
        alert('❌ Error exporting to CSV: ' + error.message);
        console.error('Export error:', error);
    }
}

// Export to JSON
async function exportToJSON() {
    try {
        const response = await fetch('/.netlify/functions/cookie-consents?export=all&format=json');
        
        if (!response.ok) {
            throw new Error('Failed to export data');
        }

        const data = await response.json();
        const jsonStr = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cookie-consents-full-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);

        alert('✅ JSON file downloaded successfully!');
    } catch (error) {
        alert('❌ Error exporting to JSON: ' + error.message);
        console.error('Export error:', error);
    }
}

// View all consents in the table
async function viewAllConsents() {
    if (showingAllConsents) {
        // Switch back to recent view
        loadDashboard();
        showingAllConsents = false;
        document.getElementById('consents-title').textContent = 'Recent Consents (Last 20)';
        return;
    }

    try {
        const response = await fetch('/.netlify/functions/cookie-consents?export=all&format=json');
        
        if (!response.ok) {
            throw new Error('Failed to load all consents');
        }

        const data = await response.json();
        currentConsents = data.consents || [];
        updateConsentsTable(currentConsents);
        
        showingAllConsents = true;
        document.getElementById('consents-title').textContent = `All Consents (${currentConsents.length} total)`;
        
    } catch (error) {
        alert('❌ Error loading all consents: ' + error.message);
        console.error('Load error:', error);
    }
}

// Auto-refresh every 30 seconds
setInterval(() => {
    loadDashboard();
}, 30000);
