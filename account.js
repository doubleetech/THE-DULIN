// Account JavaScript

// Initialize
function init() {
    checkAuth();
    loadUserData();
    loadAccountStats();
    lucide.createIcons();
}

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = localStorage.getItem('dulin_user_logged_in');
    
    if (!isLoggedIn) {
        window.location.href = 'login.html';
    }
}

// Load user data
function loadUserData() {
    const userName = localStorage.getItem('dulin_user_name') || 'User';
    const userEmail = localStorage.getItem('dulin_user_email') || '';
    
    // Update page elements
    const userNameEl = document.getElementById('userName');
    const accountNameEl = document.getElementById('accountName');
    const userInitialsEl = document.getElementById('userInitials');
    
    if (userNameEl) {
        userNameEl.textContent = userName.split(' ')[0]; // First name only
    }
    
    if (accountNameEl) {
        accountNameEl.textContent = userName;
    }
    
    if (userInitialsEl) {
        const names = userName.split(' ');
        const initials = names.map(n => n[0]).join('').substring(0, 2).toUpperCase();
        userInitialsEl.textContent = initials;
    }
}

// Load account statistics
function loadAccountStats() {
    // Get orders from localStorage
    const orders = JSON.parse(localStorage.getItem('dulin_orders') || '[]');
    const wishlist = JSON.parse(localStorage.getItem('dulin_wishlist') || '[]');
    
    // Count pending orders
    const pendingOrders = orders.filter(order => {
        return order.status !== 'delivered' && order.status !== 'cancelled';
    }).length;
    
    // Update stats
    const totalOrdersEl = document.getElementById('totalOrders');
    const pendingOrdersEl = document.getElementById('pendingOrders');
    const wishlistCountEl = document.getElementById('wishlistCount');
    
    if (totalOrdersEl) totalOrdersEl.textContent = orders.length;
    if (pendingOrdersEl) pendingOrdersEl.textContent = pendingOrders;
    if (wishlistCountEl) wishlistCountEl.textContent = wishlist.length;
}

// Handle logout
function handleLogout(event) {
    if (event) event.preventDefault();
    
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('dulin_user_logged_in');
        localStorage.removeItem('dulin_user_name');
        localStorage.removeItem('dulin_user_email');
        localStorage.removeItem('dulin_remember_me');
        
        showToast('Logged out successfully', 'info');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Show toast notification
function showToast(message, type = 'success') {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#166534' : type === 'error' ? '#dc2626' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 2000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 500;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.style.transform = 'translateX(0)', 100);
    
    setTimeout(() => {
        toast.style.transform = 'translateX(400px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Toggle account dropdown
function toggleAccountDropdown() {
    const menu = document.getElementById('accountDropdownMenu');
    const btn = document.querySelector('.account-btn');
    
    if (menu && btn) {
        menu.classList.toggle('active');
        btn.classList.toggle('active');
    }
}

// Close dropdown when clicking outside
document.addEventListener('click', function(event) {
    const wrapper = document.querySelector('.account-dropdown-wrapper');
    const menu = document.getElementById('accountDropdownMenu');
    const btn = document.querySelector('.account-btn');
    
    if (wrapper && !wrapper.contains(event.target)) {
        if (menu) menu.classList.remove('active');
        if (btn) btn.classList.remove('active');
    }
});

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);