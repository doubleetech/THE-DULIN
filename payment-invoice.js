// Payment Invoice JavaScript

let orderData = null;

// Initialize
function init() {
    loadOrderData();
    displayInvoiceDetails();
    clearCartAndOrder();
    lucide.createIcons();
}

// Load order data
function loadOrderData() {
    const savedOrderData = localStorage.getItem('dulin_current_order');
    
    if (!savedOrderData) {
        window.location.href = 'index.html';
        return;
    }
    
    orderData = JSON.parse(savedOrderData);
}

// Display invoice details
function displayInvoiceDetails() {
    if (!orderData) return;
    
    // Order ID
    document.getElementById('orderId').textContent = orderData.orderId || 'ORD-' + Date.now();
    
    // Invoice Date
    const date = new Date();
    document.getElementById('invoiceDate').textContent = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Customer Info
    if (orderData.contact) {
        const fullName = `${orderData.shipping?.firstName || ''} ${orderData.shipping?.lastName || ''}`.trim();
        document.getElementById('customerName').textContent = fullName || 'Customer';
        document.getElementById('customerEmail').textContent = orderData.contact.email || '';
        document.getElementById('customerPhone').textContent = orderData.contact.phone || '';
    }
    
    // Shipping Address
    if (orderData.shipping) {
        const address = `${orderData.shipping.address || ''}, ${orderData.shipping.apartment || ''}`.trim();
        document.getElementById('shippingAddress').textContent = address;
        document.getElementById('shippingCity').textContent = 
            `${orderData.shipping.city || ''}, ${orderData.shipping.state || ''} ${orderData.shipping.zipCode || ''}`.trim();
    }
    
    // Order Items
    displayOrderItems();
    
    // Payment Summary
    const subtotal = orderData.pricing?.subtotal || orderData.subtotal || 0;
    const delivery = orderData.pricing?.deliveryFee || orderData.deliveryFee || 0;
    const total = orderData.pricing?.total || orderData.total || 0;
    
    document.getElementById('summarySubtotal').textContent = `₦${subtotal.toLocaleString()}`;
    document.getElementById('summaryDelivery').textContent = `₦${delivery.toLocaleString()}`;
    document.getElementById('summaryTotal').textContent = `₦${total.toLocaleString()}`;
    
    // Payment Method
    if (orderData.cardDetails) {
        document.getElementById('paymentMethod').textContent = 'Card Payment';
        document.getElementById('paymentDetail').textContent = `•••• •••• •••• ${orderData.cardDetails.lastFour}`;
    } else if (orderData.selectedGateway) {
        const gatewayNames = {
            'paystack': 'Paystack',
            'flutterwave': 'Flutterwave',
            'bank-transfer': 'Bank Transfer',
            'pay-on-delivery': 'Pay on Delivery',
            'ussd': 'USSD Payment',
            'mobile-money': 'Mobile Money'
        };
        document.getElementById('paymentMethod').textContent = gatewayNames[orderData.selectedGateway] || 'Payment Gateway';
    }
    
    // Delivery Method
    const deliveryMethods = {
        'standard': 'Standard Delivery (5-7 days)',
        'express': 'Express Delivery (2-3 days)',
        'next-day': 'Next Day Delivery'
    };
    document.getElementById('deliveryMethod').textContent = deliveryMethods[orderData.delivery] || 'Standard Delivery';
    
    // Estimated Delivery
    const estimatedDays = {
        'standard': '5-7 business days',
        'express': '2-3 business days',
        'next-day': '1 business day'
    };
    document.getElementById('estimatedDelivery').textContent = estimatedDays[orderData.delivery] || '5-7 business days';
}

// Display order items
function displayOrderItems() {
    const tbody = document.getElementById('itemsTableBody');
    
    if (!orderData.items || orderData.items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No items found</td></tr>';
        return;
    }
    
    tbody.innerHTML = orderData.items.map(item => `
        <tr>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>₦${item.price.toLocaleString()}</td>
            <td><strong>₦${(item.price * item.quantity).toLocaleString()}</strong></td>
        </tr>
    `).join('');
}

// Clear cart and order data
function clearCartAndOrder() {
    // Clear cart
    localStorage.removeItem('dulin_cart');
    
    // Save order to history
    const orders = JSON.parse(localStorage.getItem('dulin_orders') || '[]');
    orders.push(orderData);
    localStorage.setItem('dulin_orders', JSON.stringify(orders));
    
    // Clear current order after a delay
    setTimeout(() => {
        localStorage.removeItem('dulin_current_order');
    }, 5000);
}

// Download invoice
function downloadInvoice() {
    // In a real app, this would generate a PDF
    // For demo, we'll use browser print to PDF
    showToast('Use Print > Save as PDF to download', 'info');
    setTimeout(() => {
        window.print();
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
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#166534' : type === 'error' ? '#dc2626' : '#2563eb'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        z-index: 1000;
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

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);