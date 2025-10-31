// Payment Options JavaScript

let orderData = null;

// Initialize
function init() {
    loadOrderData();
    setupCardFormatting();
    setupFormSubmission();
    lucide.createIcons();
}

// Load order data
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
    document.getElementById('amountToPay').textContent = `₦${orderData.total.toLocaleString()}`;
    document.getElementById('payAmount').textContent = orderData.total.toLocaleString();
    document.getElementById('orderId').textContent = orderData.orderId || 'ORD-' + Date.now();
}

// Setup card number formatting
function setupCardFormatting() {
    const cardNumber = document.getElementById('cardNumber');
    const expiryDate = document.getElementById('expiryDate');
    const cvv = document.getElementById('cvv');
    
    // Format card number (adds spaces every 4 digits)
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
    
    // Format expiry date (MM/YY)
    expiryDate.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
    
    // CVV only numbers
    cvv.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

// Setup form submission
function setupFormSubmission() {
    document.getElementById('cardPaymentForm').addEventListener('submit', handleCardPayment);
}

// Handle card payment
function handleCardPayment(e) {
    e.preventDefault();
    
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    const cardName = document.getElementById('cardName').value;
    
    // Validate card number (simple check)
    if (cardNumber.length < 13 || cardNumber.length > 19) {
        showToast('Invalid card number', 'error');
        return;
    }
    
    // Validate expiry date
    const [month, year] = expiryDate.split('/');
    if (!month || !year || parseInt(month) > 12 || parseInt(month) < 1) {
        showToast('Invalid expiry date', 'error');
        return;
    }
    
    // Validate CVV
    if (cvv.length < 3) {
        showToast('Invalid CVV', 'error');
        return;
    }
    
    // Save card details (in real app, this would be sent to payment processor)
    orderData.cardDetails = {
        lastFour: cardNumber.slice(-4),
        cardName: cardName,
        expiryDate: expiryDate
    };
    localStorage.setItem('dulin_current_order', JSON.stringify(orderData));
    
    // Show processing message
    showToast('Processing payment...', 'info');
    
    // Simulate payment processing and go to OTP page
    setTimeout(() => {
        window.location.href = 'payment-otp.html';
    }, 1500);
}

// Select alternative payment method
function selectMethod(method) {
    if (method === 'bank-transfer') {
        window.location.href = 'bank-transfer.html';
    } else if (method === 'ussd') {
        window.location.href = 'ussd-payment.html';
    }
}

// Go back
function goBack() {
    window.location.href = 'payment-gateway.html';
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