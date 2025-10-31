// Payment OTP JavaScript

let orderData = null;
let countdownTimer = 120; // 2 minutes
let resendTimer = 60; // 1 minute
let countdownInterval = null;
let resendInterval = null;
const correctOTP = '123456'; // Demo OTP

// Initialize
function init() {
    loadOrderData();
    setupOTPInputs();
    startCountdown();
    startResendTimer();
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
    document.getElementById('otpAmount').textContent = `₦${orderData.total.toLocaleString()}`;
    
    // Mask phone number
    if (orderData.contact && orderData.contact.phone) {
        const phone = orderData.contact.phone;
        const masked = phone.slice(0, -2).replace(/\d/g, '*') + phone.slice(-2);
        document.getElementById('phoneNumber').textContent = masked;
    }
}

// Setup OTP inputs
function setupOTPInputs() {
    const inputs = document.querySelectorAll('.otp-input');
    
    inputs.forEach((input, index) => {
        // Handle input
        input.addEventListener('input', function(e) {
            const value = e.target.value;
            
            // Only allow numbers
            if (!/^\d*$/.test(value)) {
                e.target.value = '';
                return;
            }
            
            // Add filled class
            if (value) {
                e.target.classList.add('filled');
                
                // Move to next input
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    // All inputs filled, enable verify button
                    document.getElementById('verifyBtn').disabled = false;
                }
            } else {
                e.target.classList.remove('filled');
            }
        });
        
        // Handle backspace
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Backspace' && !e.target.value && index > 0) {
                inputs[index - 1].focus();
            }
        });
        
        // Handle paste
        input.addEventListener('paste', function(e) {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
            
            pastedData.split('').forEach((char, i) => {
                if (inputs[i]) {
                    inputs[i].value = char;
                    inputs[i].classList.add('filled');
                }
            });
            
            if (pastedData.length === 6) {
                document.getElementById('verifyBtn').disabled = false;
            }
        });
    });
    
    // Focus first input
    inputs[0].focus();
}

// Start countdown timer
function startCountdown() {
    countdownInterval = setInterval(() => {
        countdownTimer--;
        
        const minutes = Math.floor(countdownTimer / 60);
        const seconds = countdownTimer % 60;
        
        document.getElementById('countdown').textContent = 
            `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        if (countdownTimer <= 0) {
            clearInterval(countdownInterval);
            showToast('OTP expired. Please request a new code.', 'error');
            document.getElementById('verifyBtn').disabled = true;
        }
    }, 1000);
}

// Start resend timer
function startResendTimer() {
    const resendBtn = document.getElementById('resendBtn');
    const resendTimerSpan = document.getElementById('resendTimer');
    
    resendInterval = setInterval(() => {
        resendTimer--;
        resendTimerSpan.textContent = `(${resendTimer}s)`;
        
        if (resendTimer <= 0) {
            clearInterval(resendInterval);
            resendBtn.disabled = false;
            resendTimerSpan.textContent = '';
        }
    }, 1000);
}

// Verify OTP
function verifyOTP() {
    const inputs = document.querySelectorAll('.otp-input');
    const otp = Array.from(inputs).map(input => input.value).join('');
    
    if (otp.length !== 6) {
        showToast('Please enter complete OTP', 'error');
        return;
    }
    
    // Show verifying message
    const verifyBtn = document.getElementById('verifyBtn');
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '<span>Verifying...</span>';
    
    // Simulate verification (in real app, send to server)
    setTimeout(() => {
        if (otp === correctOTP) {
            // Success
            showToast('Payment successful!', 'success');
            
            // Save successful payment
            orderData.paymentStatus = 'completed';
            orderData.paymentDate = new Date().toISOString();
            orderData.otp = otp;
            localStorage.setItem('dulin_current_order', JSON.stringify(orderData));
            
            // Redirect to invoice
            setTimeout(() => {
                window.location.href = 'payment-invoice.html';
            }, 1500);
        } else {
            // Failed
            showToast('Invalid OTP. Please try again.', 'error');
            
            // Reset
            verifyBtn.disabled = false;
            verifyBtn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Verify & Complete Payment
            `;
            
            // Clear inputs
            inputs.forEach(input => {
                input.value = '';
                input.classList.remove('filled');
            });
            inputs[0].focus();
            
            lucide.createIcons();
        }
    }, 2000);
}

// Resend OTP
function resendOTP() {
    showToast('New OTP sent!', 'success');
    
    // Reset timers
    resendTimer = 60;
    document.getElementById('resendBtn').disabled = true;
    startResendTimer();
    
    // In demo, the OTP is still 123456
    console.log('Demo OTP: 123456');
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