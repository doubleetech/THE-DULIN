// Auth JavaScript

let signupChoice = 'email';
let loginChoice = 'email';

// Initialize
function init() {
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('signup.html')) {
        setupSignupForm();
        setupPasswordStrength();
    } else if (currentPage.includes('signup-details.html')) {
        setupDetailsForm();
        setupTermsCheckbox();
    } else if (currentPage.includes('login.html')) {
        setupLoginForm();
    }
}

// Switch choice between email and phone (Sign Up)
function switchChoice(choice) {
    signupChoice = choice;
    const emailGroup = document.getElementById('emailGroup');
    const phoneGroup = document.getElementById('phoneGroup');
    const tabs = document.querySelectorAll('.choice-tab');
    
    tabs.forEach(tab => {
        if (tab.dataset.choice === choice) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    if (choice === 'email') {
        if (emailGroup) emailGroup.style.display = 'block';
        if (phoneGroup) phoneGroup.style.display = 'none';
        // Clear phone field
        const phoneInput = document.getElementById('phone');
        if (phoneInput) phoneInput.value = '';
    } else {
        if (emailGroup) emailGroup.style.display = 'none';
        if (phoneGroup) phoneGroup.style.display = 'block';
        // Clear email field
        const emailInput = document.getElementById('email');
        if (emailInput) emailInput.value = '';
    }
}

// Switch choice between email and phone (Login)
function switchLoginChoice(choice) {
    loginChoice = choice;
    const emailGroup = document.getElementById('loginEmailGroup');
    const phoneGroup = document.getElementById('loginPhoneGroup');
    const tabs = document.querySelectorAll('.choice-tab');
    
    tabs.forEach(tab => {
        if (tab.dataset.choice === choice) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    if (choice === 'email') {
        if (emailGroup) emailGroup.style.display = 'block';
        if (phoneGroup) phoneGroup.style.display = 'none';
        // Clear phone field
        const phoneInput = document.getElementById('loginPhone');
        if (phoneInput) phoneInput.value = '';
    } else {
        if (emailGroup) emailGroup.style.display = 'none';
        if (phoneGroup) phoneGroup.style.display = 'block';
        // Clear email field
        const emailInput = document.getElementById('loginEmail');
        if (emailInput) emailInput.value = '';
    }
}

// Toggle password visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        if (input.type === 'password') {
            input.type = 'text';
        } else {
            input.type = 'password';
        }
    }
}

// Password strength checker
function setupPasswordStrength() {
    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('passwordStrength');
    
    if (passwordInput && strengthBar) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            if (password.length >= 8) strength++;
            if (/[a-z]/.test(password)) strength++;
            if (/[A-Z]/.test(password)) strength++;
            if (/[0-9]/.test(password)) strength++;
            if (/[^a-zA-Z0-9]/.test(password)) strength++;
            
            strengthBar.className = 'password-strength';
            if (password.length > 0) {
                if (strength >= 1 && strength <= 2) {
                    strengthBar.classList.add('weak');
                } else if (strength >= 3 && strength <= 4) {
                    strengthBar.classList.add('medium');
                } else if (strength >= 5) {
                    strengthBar.classList.add('strong');
                }
            }
        });
    }
}

// Setup Sign Up Form
function setupSignupForm() {
    const form = document.getElementById('signupForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let identifier, identifierType;
        
        if (signupChoice === 'email') {
            identifier = document.getElementById('email').value.trim();
            identifierType = 'email';
            
            if (!identifier) {
                showToast('Please enter your email address', 'error');
                return;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(identifier)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }
        } else {
            const countryCode = document.getElementById('countryCode').value;
            const phone = document.getElementById('phone').value.trim();
            
            if (!phone) {
                showToast('Please enter your phone number', 'error');
                return;
            }
            
            identifier = countryCode + phone;
            identifierType = 'phone';
        }
        
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        
        if (password.length < 8) {
            showToast('Password must be at least 8 characters', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showToast('Passwords do not match', 'error');
            return;
        }
        
        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('dulin_users') || '[]');
        const existingUser = users.find(u => u.identifier === identifier);
        
        if (existingUser) {
            showToast('This ' + identifierType + ' is already registered', 'error');
            return;
        }
        
        // Save to localStorage
        const signupData = {
            identifier: identifier,
            identifierType: identifierType,
            password: password
        };
        localStorage.setItem('dulin_signup_temp', JSON.stringify(signupData));
        
        showToast('Step 1 completed!', 'success');
        
        // Redirect to details page
        setTimeout(() => {
            window.location.href = 'signup-details.html';
        }, 1000);
    });
}

// Setup Details Form
function setupDetailsForm() {
    const form = document.getElementById('detailsForm');
    if (!form) return;
    
    // Check if there's signup data
    const signupData = localStorage.getItem('dulin_signup_temp');
    if (!signupData) {
        showToast('Please complete step 1 first', 'error');
        setTimeout(() => {
            window.location.href = 'signup.html';
        }, 2000);
        return;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value.trim();
        const lastName = document.getElementById('lastName').value.trim();
        const birthDate = document.getElementById('birthDate').value;
        const phoneCountryCode = document.getElementById('phoneCountryCode').value;
        const phoneNumber = document.getElementById('phoneNumber').value.trim();
        
        // Validation
        if (!firstName || !lastName || !birthDate || !phoneNumber) {
            showToast('Please fill all required fields', 'error');
            return;
        }
        
        // Get signup data from Step 1
        const tempData = JSON.parse(signupData);
        
        // Complete user data
        const userData = {
            ...tempData,
            firstName: firstName,
            lastName: lastName,
            birthDate: birthDate,
            fullPhone: phoneCountryCode + phoneNumber,
            registeredAt: new Date().toISOString()
        };
        
        // Save user
        const users = JSON.parse(localStorage.getItem('dulin_users') || '[]');
        users.push(userData);
        localStorage.setItem('dulin_users', JSON.stringify(users));
        
        // Clear temp data
        localStorage.removeItem('dulin_signup_temp');
        
        // Show success modal
        showSuccessModal();
    });
}

// Setup Terms Checkbox
function setupTermsCheckbox() {
    const checkbox = document.getElementById('agreeTerms');
    const submitBtn = document.getElementById('submitBtn');
    
    if (checkbox && submitBtn) {
        checkbox.addEventListener('change', function() {
            submitBtn.disabled = !this.checked;
        });
    }
}

// Show Success Modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.classList.add('show');
        
        // Redirect to login after 3 seconds
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    }
}

// Setup Login Form
function setupLoginForm() {
    const form = document.getElementById('loginForm');
    if (!form) {
        console.error('Login form not found');
        return;
    }
    
    console.log('Login form setup initialized');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Login form submitted');
        
        let identifier;
        
        if (loginChoice === 'email') {
            identifier = document.getElementById('loginEmail').value.trim();
            console.log('Email login:', identifier);
        } else {
            const countryCode = document.getElementById('loginCountryCode').value;
            const phone = document.getElementById('loginPhone').value.trim();
            identifier = countryCode + phone;
            console.log('Phone login:', identifier);
        }
        
        const password = document.getElementById('loginPassword').value;
        const rememberMe = document.getElementById('rememberMe').checked;
        
        // Validation
        if (!identifier || !password) {
            showToast('Please enter your credentials', 'error');
            return;
        }
        
        // Check credentials
        const users = JSON.parse(localStorage.getItem('dulin_users') || '[]');
        console.log('Total users:', users.length);
        
        const user = users.find(u => u.identifier === identifier && u.password === password);
        
        if (user) {
            console.log('Login successful for:', user.firstName);
            
            // Login successful
            localStorage.setItem('dulin_user_logged_in', 'true');
            localStorage.setItem('dulin_user_name', user.firstName + ' ' + user.lastName);
            
            if (user.identifierType === 'email') {
                localStorage.setItem('dulin_user_email', user.identifier);
            }
            
            if (rememberMe) {
                localStorage.setItem('dulin_remember_me', 'true');
            }
            
            showToast('Login successful! Welcome back ' + user.firstName + '!', 'success');
            
            // Redirect to homepage
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            console.log('Invalid credentials for:', identifier);
            showToast('Invalid email/phone or password', 'error');
        }
    });
    
    console.log('Login form handler attached');
}

// Go Back
function goBack() {
    window.history.back();
}

// Show Toast Notification
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
        background: ${type === 'success' ? '#166534' : '#dc2626'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 2000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        font-weight: 500;
        max-width: 350px;
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

// Debug: Log when script loads
console.log('Auth.js loaded successfully');