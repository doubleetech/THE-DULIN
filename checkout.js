// Checkout Page JavaScript

let cart = [];
let deliveryFee = 2000;
let discountAmount = 0;

// Promo codes
const promoCodes = {
    'DULIN10': 10, // 10% discount
    'WELCOME': 5,  // 5% discount
    'SAVE20': 20   // 20% discount
};

// Initialize
function init() {
    loadCart();
    displayCartItems();
    setupDeliveryListeners();
    calculateTotals();
    
    // Initialize Lucide icons if available
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
    }
}

// Load cart from localStorage
function loadCart() {
    const savedCart = localStorage.getItem('dulin_cart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            console.error('Error loading cart:', e);
            cart = [];
        }
    }
    
    // If cart is empty, redirect to dulin page
    if (cart.length === 0) {
        showToast('Your cart is empty!', 'error');
        setTimeout(() => {
            window.location.href = 'dulin.html';
        }, 2000);
    }
}

// Display cart items in summary
function displayCartItems() {
    const summaryItems = document.getElementById('summaryItems');
    
    if (!summaryItems) return;
    
    if (cart.length === 0) {
        summaryItems.innerHTML = '<p style="text-align: center; color: #666;">No items in cart</p>';
        return;
    }
    
    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <div class="item-image">
                <img src="${item.image}" alt="${item.name}" onerror="this.src='images/placeholder.svg'">
            </div>
            <div class="item-details">
                <div class="item-name">${item.name}</div>
                <div class="item-quantity">Qty: ${item.quantity}</div>
            </div>
            <div class="item-price">₦${(item.price * item.quantity).toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
        </div>
    `).join('');
}

// Setup delivery method listeners
function setupDeliveryListeners() {
    const deliveryOptions = document.querySelectorAll('input[name="delivery"]');
    deliveryOptions.forEach(option => {
        option.addEventListener('change', function() {
            if (this.value === 'standard') {
                deliveryFee = 2000;
            } else if (this.value === 'express') {
                deliveryFee = 5000;
            } else if (this.value === 'next-day') {
                deliveryFee = 10000;
            }
            calculateTotals();
        });
    });
}

// Calculate totals
function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Calculate discount
    let discount = 0;
    if (discountAmount > 0) {
        discount = (subtotal * discountAmount) / 100;
    }
    
    const total = subtotal + deliveryFee - discount;
    
    // Update UI
    const subtotalEl = document.getElementById('subtotal');
    const deliveryFeeEl = document.getElementById('deliveryFee');
    const totalEl = document.getElementById('total');
    const discountRowEl = document.getElementById('discountRow');
    const discountEl = document.getElementById('discount');
    
    if (subtotalEl) subtotalEl.textContent = `₦${subtotal.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (deliveryFeeEl) deliveryFeeEl.textContent = `₦${deliveryFee.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    if (totalEl) totalEl.textContent = `₦${total.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    
    // Show/hide discount row
    if (discount > 0 && discountRowEl && discountEl) {
        discountRowEl.style.display = 'flex';
        discountEl.textContent = `-₦${discount.toLocaleString('en-NG', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    } else if (discountRowEl) {
        discountRowEl.style.display = 'none';
    }
}

// Apply promo code
function applyPromoCode() {
    const promoInput = document.getElementById('promoCode');
    if (!promoInput) return;
    
    const code = promoInput.value.trim().toUpperCase();
    
    if (!code) {
        showToast('Please enter a promo code', 'error');
        return;
    }
    
    if (promoCodes[code]) {
        discountAmount = promoCodes[code];
        calculateTotals();
        showToast(`Promo code applied! ${discountAmount}% discount`, 'success');
        promoInput.value = '';
        promoInput.disabled = true;
    } else {
        showToast('Invalid promo code', 'error');
    }
}

// Validate form
function validateForm() {
    const requiredFields = [
        { id: 'email', name: 'Email' },
        { id: 'phone', name: 'Phone' },
        { id: 'firstName', name: 'First Name' },
        { id: 'lastName', name: 'Last Name' },
        { id: 'address', name: 'Address' },
        { id: 'city', name: 'City' },
        { id: 'state', name: 'State' }
    ];
    
    for (let field of requiredFields) {
        const input = document.getElementById(field.id);
        if (!input || !input.value.trim()) {
            showToast(`${field.name} is required`, 'error');
            if (input) input.focus();
            return false;
        }
    }
    
    // Validate email
    const emailInput = document.getElementById('email');
    if (emailInput) {
        const email = emailInput.value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showToast('Please enter a valid email address', 'error');
            emailInput.focus();
            return false;
        }
    }
    
    // Validate phone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        const phone = phoneInput.value.trim();
        if (phone.length < 10) {
            showToast('Please enter a valid phone number', 'error');
            phoneInput.focus();
            return false;
        }
    }
    
    return true;
}

// Place order
function placeOrder() {
    if (!validateForm()) {
        return;
    }
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discount = (subtotal * discountAmount) / 100;
    const total = subtotal + deliveryFee - discount;
    
    // Get delivery method
    const deliveryRadio = document.querySelector('input[name="delivery"]:checked');
    const deliveryMethod = deliveryRadio ? deliveryRadio.value : 'standard';
    
    // Get payment method
    const paymentRadio = document.querySelector('input[name="payment"]:checked');
    const paymentMethod = paymentRadio ? paymentRadio.value : 'card';
    
    // Get form data
    const orderData = {
        orderId: 'ORD-' + Date.now(),
        contact: {
            email: document.getElementById('email')?.value || '',
            phone: document.getElementById('phone')?.value || ''
        },
        shipping: {
            firstName: document.getElementById('firstName')?.value || '',
            lastName: document.getElementById('lastName')?.value || '',
            address: document.getElementById('address')?.value || '',
            apartment: document.getElementById('apartment')?.value || '',
            city: document.getElementById('city')?.value || '',
            state: document.getElementById('state')?.value || '',
            zipCode: document.getElementById('zipCode')?.value || ''
        },
        delivery: deliveryMethod,
        payment: paymentMethod,
        orderNotes: document.getElementById('orderNotes')?.value || '',
        items: cart,
        pricing: {
            subtotal: subtotal,
            deliveryFee: deliveryFee,
            discount: discount,
            total: total
        },
        total: total,
        orderDate: new Date().toISOString()
    };
    
    // Save order data for payment flow
    localStorage.setItem('dulin_current_order', JSON.stringify(orderData));
    
    // Show success message
    showToast('Processing order...', 'success');
    
    // Redirect to payment gateway page
    setTimeout(() => {
        window.location.href = 'payment-gateway.html';
    }, 1000);
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
    
    // Add styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#166534' : type === 'error' ? '#dc2626' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-family: system-ui, -apple-system, sans-serif;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 100);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);