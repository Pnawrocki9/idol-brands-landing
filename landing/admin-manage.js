// Additional administrative management script for Idol Brands admin dashboard.
// This script enables adding, editing, activating/deactivating, deleting and exporting
// administrator accounts. It operates on the admin dashboard only.

document.addEventListener('DOMContentLoaded', function () {
    // Only run on admin dashboard pages with the admin table present.
    const adminsTableBody = document.getElementById('admins-table-body');
    if (!adminsTableBody) return;
    const addAdminUsernameField = document.getElementById('admin-add-username');
    const addAdminPasswordField = document.getElementById('admin-add-password');
    const addAdminBtn = document.getElementById('add-admin-btn');
    const exportAdminsBtn = document.getElementById('export-admins');
    const adminsMsgEl = document.getElementById('admins-msg');

    // Ensure the default admin exists. If no admin list is stored yet, initialize
    // with the built‑in super admin account (username: admin, password: idoladmin2025).
    function ensureDefaultAdmins() {
        try {
            const stored = localStorage.getItem('admins');
            if (!stored) {
                const defaultAdmins = [{ username: 'admin', password: 'idoladmin2025', status: 'active' }];
                localStorage.setItem('admins', JSON.stringify(defaultAdmins));
            }
        } catch (e) {
            const defaultAdmins = [{ username: 'admin', password: 'idoladmin2025', status: 'active' }];
            localStorage.setItem('admins', JSON.stringify(defaultAdmins));
        }
    }

    // Render the admin table from localStorage.
    function loadAdmins() {
        ensureDefaultAdmins();
        let admins = [];
        try {
            const stored = localStorage.getItem('admins');
            if (stored) admins = JSON.parse(stored);
        } catch (e) {
            admins = [];
        }
        adminsTableBody.innerHTML = '';
        if (!admins || admins.length === 0) {
            const tr = document.createElement('tr');
            const td = document.createElement('td');
            td.colSpan = 4;
            td.className = 'px-3 py-2 text-gray-500';
            td.textContent = 'No administrators found.';
            tr.appendChild(td);
            adminsTableBody.appendChild(tr);
            return;
        }
        admins.forEach(function (admin, index) {
            const tr = document.createElement('tr');
            // Username cell with editable input
            const userTd = document.createElement('td');
            userTd.className = 'px-3 py-2';
            const userInput = document.createElement('input');
            userInput.type = 'text';
            userInput.value = admin.username || '';
            userInput.dataset.index = index;
            userInput.dataset.field = 'username';
            userInput.className = 'border border-gray-300 rounded px-2 py-1 w-40';
            userTd.appendChild(userInput);
            tr.appendChild(userTd);
            // Password cell with editable input
            const passTd = document.createElement('td');
            passTd.className = 'px-3 py-2';
            const passInput = document.createElement('input');
            passInput.type = 'text';
            passInput.value = admin.password || '';
            passInput.dataset.index = index;
            passInput.dataset.field = 'password';
            passInput.className = 'border border-gray-300 rounded px-2 py-1 w-40';
            passTd.appendChild(passInput);
            tr.appendChild(passTd);
            // Status cell
            const statusTd = document.createElement('td');
            statusTd.className = 'px-3 py-2 capitalize';
            statusTd.textContent = admin.status;
            tr.appendChild(statusTd);
            // Actions cell
            const actionsTd = document.createElement('td');
            actionsTd.className = 'px-3 py-2 whitespace-nowrap';
            // Toggle status button
            const toggleBtn = document.createElement('button');
            toggleBtn.textContent = admin.status === 'inactive' ? 'Activate' : 'Deactivate';
            toggleBtn.dataset.action = 'toggleAdminStatus';
            toggleBtn.dataset.index = index;
            toggleBtn.className = 'text-blue-600 hover:underline mr-3';
            actionsTd.appendChild(toggleBtn);
            // Save credentials button
            const saveBtn = document.createElement('button');
            saveBtn.textContent = 'Save';
            saveBtn.dataset.action = 'saveAdminCred';
            saveBtn.dataset.index = index;
            saveBtn.className = 'text-green-600 hover:underline mr-3';
            actionsTd.appendChild(saveBtn);
            // Delete button (do not allow deleting the built‑in admin)
            if (admin.username !== 'admin') {
                const deleteBtn = document.createElement('button');
                deleteBtn.textContent = 'Delete';
                deleteBtn.dataset.action = 'deleteAdmin';
                deleteBtn.dataset.index = index;
                deleteBtn.className = 'text-red-600 hover:underline';
                actionsTd.appendChild(deleteBtn);
            }
            tr.appendChild(actionsTd);
            adminsTableBody.appendChild(tr);
        });
    }

    // Create a new admin with the provided credentials
    function addAdmin() {
        const username = addAdminUsernameField.value.trim();
        const password = addAdminPasswordField.value.trim();
        if (!username || !password) {
            alert('Please enter both username and password.');
            return;
        }
        let admins = [];
        try {
            admins = JSON.parse(localStorage.getItem('admins')) || [];
        } catch (e) {
            admins = [];
        }
        // Prevent duplicates
        const exists = admins.some(function (a) { return a.username === username; });
        if (exists) {
            alert('An administrator with this username already exists.');
            return;
        }
        admins.push({ username: username, password: password, status: 'active' });
        localStorage.setItem('admins', JSON.stringify(admins));
        addAdminUsernameField.value = '';
        addAdminPasswordField.value = '';
        loadAdmins();
        if (adminsMsgEl) {
            adminsMsgEl.textContent = 'Admin added.';
            adminsMsgEl.classList.remove('hidden');
            setTimeout(() => adminsMsgEl.classList.add('hidden'), 2000);
        }
    }

    // Toggle admin active/inactive status; ensure at least one active admin remains
    function toggleAdminStatus(index) {
        let admins = [];
        try {
            admins = JSON.parse(localStorage.getItem('admins')) || [];
        } catch (e) {
            admins = [];
        }
        const admin = admins[index];
        if (!admin) return;
        if (admin.status === 'inactive') {
            admin.status = 'active';
        } else {
            const activeCount = admins.filter(function (a) { return a.status === 'active'; }).length;
            if (activeCount <= 1) {
                alert('Cannot deactivate the last active administrator.');
                return;
            }
            admin.status = 'inactive';
        }
        localStorage.setItem('admins', JSON.stringify(admins));
        loadAdmins();
        if (adminsMsgEl) {
            adminsMsgEl.textContent = 'Admin status updated.';
            adminsMsgEl.classList.remove('hidden');
            setTimeout(() => adminsMsgEl.classList.add('hidden'), 2000);
        }
    }

    // Save edited username/password for a given admin
    function saveAdminCredentials(index) {
        let admins = [];
        try {
            admins = JSON.parse(localStorage.getItem('admins')) || [];
        } catch (e) {
            admins = [];
        }
        const admin = admins[index];
        if (!admin) return;
        const usernameInput = adminsTableBody.querySelector(`input[data-field="username"][data-index="${index}"]`);
        const passwordInput = adminsTableBody.querySelector(`input[data-field="password"][data-index="${index}"]`);
        if (usernameInput) admin.username = usernameInput.value.trim();
        if (passwordInput) admin.password = passwordInput.value.trim();
        if (!admin.username) {
            alert('Username cannot be empty.');
            return;
        }
        localStorage.setItem('admins', JSON.stringify(admins));
        loadAdmins();
        if (adminsMsgEl) {
            adminsMsgEl.textContent = 'Admin credentials updated.';
            adminsMsgEl.classList.remove('hidden');
            setTimeout(() => adminsMsgEl.classList.add('hidden'), 2000);
        }
    }

    // Delete an admin; keep built‑in admin undeletable
    function deleteAdmin(index) {
        let admins = [];
        try {
            admins = JSON.parse(localStorage.getItem('admins')) || [];
        } catch (e) {
            admins = [];
        }
        const admin = admins[index];
        if (!admin) return;
        if (admin.username === 'admin') {
            alert('The default administrator cannot be deleted.');
            return;
        }
        admins.splice(index, 1);
        localStorage.setItem('admins', JSON.stringify(admins));
        loadAdmins();
        if (adminsMsgEl) {
            adminsMsgEl.textContent = 'Admin removed.';
            adminsMsgEl.classList.remove('hidden');
            setTimeout(() => adminsMsgEl.classList.add('hidden'), 2000);
        }
    }

    // Export admin list to a CSV file that can be opened in Excel
    function exportAdminsToCSV() {
        let admins = [];
        try {
            admins = JSON.parse(localStorage.getItem('admins')) || [];
        } catch (e) {
            admins = [];
        }
        if (!admins || admins.length === 0) {
            alert('There are no administrators to export.');
            return;
        }
        let csv = 'Username,Password,Status\n';
        admins.forEach(function (a) {
            const line = [a.username, a.password, a.status];
            csv += line.map(function (item) {
                const str = String(item || '').replace(/\"/g, '""');
                // If the field contains a comma or quote, wrap it in quotes.
                return (str.includes(',') || str.includes('"')) ? '"' + str + '"' : str;
            }).join(',') + '\n';
        });
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'admins.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Event delegation for actions in the admin table
    adminsTableBody.addEventListener('click', function (e) {
        const action = e.target.dataset.action;
        const index = parseInt(e.target.dataset.index, 10);
        if (isNaN(index)) return;
        if (action === 'toggleAdminStatus') {
            toggleAdminStatus(index);
        } else if (action === 'saveAdminCred') {
            saveAdminCredentials(index);
        } else if (action === 'deleteAdmin') {
            deleteAdmin(index);
        }
    });

    // Bind add and export buttons
    if (addAdminBtn) {
        addAdminBtn.addEventListener('click', addAdmin);
    }
    if (exportAdminsBtn) {
        exportAdminsBtn.addEventListener('click', exportAdminsToCSV);
    }

    // Initial render
    loadAdmins();
});