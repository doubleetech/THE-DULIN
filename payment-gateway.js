// Payment Gateway JavaScript

let orderData = null;

// Initialize
function init() {
    loadOrderData();
    lucide.createIcons();
}

// Load order data from localStorage
function loadOrderData() {
    const savedOrderData = localStorage.getItem('dulin_current_order');
    
    if (!savedOrderData) {
        showToast('No order found', 'error');
        setTimeout(() => {
            window.location.href = 'checkout.html';
        }, 2000);
        return;
    }
    
    orderData = JSON.parse(savedOrderData);
    
    // Display order information
    document.getElementById('orderTotal').textContent = `₦${orderData.total.toLocaleString()}`;
    document.getElementById('orderId').textContent = orderData.orderId || 'ORD-' + Date.now();
}

// Select gateway and proceed
function selectGateway(gateway) {
    if (!orderData) {
        showToast('Order data not found', 'error');
        return;
    }
    
    // Save selected gateway
    orderData.selectedGateway = gateway;
    localStorage.setItem('dulin_current_order', JSON.stringify(orderData));
    
    // Route to appropriate page based on gateway
    if (gateway === 'pay-on-delivery') {
        // Skip payment and go directly to success
        showToast('Pay on Delivery selected', 'success');
        setTimeout(() => {
            window.location.href = 'order-success.html';
        }, 1500);
    } else if (gateway === 'bank-transfer') {
        // Show bank details page
        window.location.href = 'bank-transfer.html';
    } else {
        // Go to payment options page for card/online payments
        window.location.href = 'payment-options.html';
    }
}

// Go back to checkout
function goBack() {
    window.location.href = 'checkout.html';
}

// Show toast notification
function showToast(message, type = 'success') {
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);