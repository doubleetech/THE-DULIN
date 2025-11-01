// Product Data
const products = [
    { id: 1, name: 'Sofa Couch', price: 132000, rating: 5, image: 'images/sofa.jpg', category: 'Chair', stock: 10 },
    { id: 2, name: 'Single Sofa Chair', price: 100000, rating: 5, image: 'images/spa chair.jpg', category: 'Chair', stock: 15 },
    { id: 3, name: 'Dining Chair', price: 50000, rating: 5, image: 'images/dining chairs.jpg', category: 'Chair', stock: 8 },
    { id: 4, name: 'Bar Chair', price: 34000, rating: 5, image: 'images/barchairs.jpg', category: 'Chair', stock: 5 },
    { id: 5, name: 'Luxury King Bed', price: 250000, rating: 5, image: 'images/bed.jpg', category: 'Beds', stock: 6 },
    { id: 6, name: 'Flower Bedsheet', price: 20000, rating: 4, image: 'images/bedsheet.jpg', category: 'Beds', stock: 12 },
    { id: 7, name: 'Premium Air Fryer', price: 43000, rating: 5, image: 'images/premium_air_fryer.jpg', category: 'Sofa', stock: 7 },
    { id: 8, name: 'Vaccum Cleaner', price: 135900, rating: 5, image: 'images/vaccuum cleaner.jpg', category: 'Lamp', stock: 15 },
];

// State - Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('dulin_cart')) || [];
let currentCategory = 'All';
let searchQuery = '';

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('dulin_cart', JSON.stringify(cart));
}

// Show Toast Notification
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

// Get available stock for a product
function getAvailableStock(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    const inCart = cartItem ? cartItem.quantity : 0;
    return product.stock - inCart;
}

// Check if image exists, fallback to emoji
function getProductImage(product) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const hasImageExtension = imageExtensions.some(ext => product.image.toLowerCase().includes(ext));
    
    if (hasImageExtension) {
        return `<img src="${product.image}" alt="${product.name}" class="product-img" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                <div class="product-emoji-fallback" style="display:none;">${getEmojiForCategory(product.category)}</div>`;
    } else {
        return `<div class="product-emoji-fallback">${product.image}</div>`;
    }
}

// Get emoji based on category
function getEmojiForCategory(category) {
    const emojiMap = {
        'Chair': '🪑',
        'Beds': '🛏️',
        'Sofa': '🛋️',
        'Lamp': '💡'
    };
    return emojiMap[category] || '🪑';
}

// Initialize
function init() {
    renderProducts();
    setupSearchListener();
    updateCart(); // Load cart on page load
    
    setTimeout(() => {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }, 100);
}

// Setup Search Listener
function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value;
            handleSearch();
        });
    }
}

// Handle Search
function handleSearch() {
    if (searchQuery.trim()) {
        const whySection = document.getElementById('whySection');
        const experienceSection = document.getElementById('experienceSection');
        const materialsSection = document.getElementById('materialsSection');
        const testimonialsSection = document.getElementById('testimonialsSection');
        const productsTitle = document.getElementById('productsTitle');
        const categoryFilters = document.getElementById('categoryFilters');
        const viewAll = document.getElementById('viewAll');
        
        if (whySection) whySection.classList.add('hidden');
        if (experienceSection) experienceSection.classList.add('hidden');
        if (materialsSection) materialsSection.classList.add('hidden');
        if (testimonialsSection) testimonialsSection.classList.add('hidden');
        if (productsTitle) productsTitle.classList.add('hidden');
        if (categoryFilters) categoryFilters.classList.add('hidden');
        if (viewAll) viewAll.classList.add('hidden');
        
        const searchResultsHeader = document.getElementById('searchResultsHeader');
        if (searchResultsHeader) {
            searchResultsHeader.classList.add('active');
        }
        
        const filtered = getFilteredProducts();
        const searchResultsText = document.getElementById('searchResultsText');
        if (searchResultsText) {
            searchResultsText.textContent = 
                `Showing ${filtered.length} result${filtered.length !== 1 ? 's' : ''} for "${searchQuery}"`;
        }
    } else {
        clearSearch();
    }
    renderProducts();
}

// Clear Search
function clearSearch() {
    searchQuery = '';
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }
    
    const whySection = document.getElementById('whySection');
    const experienceSection = document.getElementById('experienceSection');
    const materialsSection = document.getElementById('materialsSection');
    const testimonialsSection = document.getElementById('testimonialsSection');
    const productsTitle = document.getElementById('productsTitle');
    const categoryFilters = document.getElementById('categoryFilters');
    const viewAll = document.getElementById('viewAll');
    
    if (whySection) whySection.classList.remove('hidden');
    if (experienceSection) experienceSection.classList.remove('hidden');
    if (materialsSection) materialsSection.classList.remove('hidden');
    if (testimonialsSection) testimonialsSection.classList.remove('hidden');
    if (productsTitle) productsTitle.classList.remove('hidden');
    if (categoryFilters) categoryFilters.classList.remove('hidden');
    if (viewAll) viewAll.classList.remove('hidden');
    
    const searchResultsHeader = document.getElementById('searchResultsHeader');
    if (searchResultsHeader) {
        searchResultsHeader.classList.remove('active');
    }
    
    renderProducts();
}

// Filter Category
function filterCategory(category) {
    currentCategory = category;
    
    const buttons = document.querySelectorAll('.category-btn');
    buttons.forEach(btn => {
        if (btn.textContent === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    renderProducts();
}

// Get Filtered Products
function getFilteredProducts() {
    return products.filter(product => {
        const matchesCategory = currentCategory === 'All' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });
}

// Render Products
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    if (!grid) return;
    
    const filtered = getFilteredProducts();
    
    if (filtered.length === 0) {
        grid.innerHTML = `
            <div class="no-products" style="grid-column: 1 / -1;">
                <p style="font-size: 1.1rem; margin-bottom: 0.5rem;">No products found</p>
                <p style="font-size: 0.9rem;">Try adjusting your search or filter</p>
            </div>
        `;
    } else {
        grid.innerHTML = filtered.map(product => {
            const availableStock = getAvailableStock(product.id);
            const isOutOfStock = availableStock <= 0;
            
            return `
            <div class="product-card ${isOutOfStock ? 'out-of-stock' : ''}">
                <div class="product-image">${getProductImage(product)}</div>
                ${isOutOfStock ? '<div class="stock-badge out">Out of Stock</div>' : ''}
                ${availableStock > 0 && availableStock <= 3 ? `<div class="stock-badge low">Only ${availableStock} left</div>` : ''}
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${Array(5).fill(0).map((_, i) => `
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="${i < product.rating ? '#facc15' : 'none'}" stroke="${i < product.rating ? '#facc15' : '#d1d5db'}" stroke-width="2">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                    `).join('')}
                </div>
                <div class="product-footer">
                    <span class="product-price">₦${product.price.toLocaleString()}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})" ${isOutOfStock ? 'disabled' : ''}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 5v14M5 12h14"/>
                        </svg>
                    </button>
                </div>
            </div>
        `}).join('');
    }
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Add to Cart - FIXED to save to localStorage
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const availableStock = getAvailableStock(productId);
    
    if (availableStock <= 0) {
        showToast('Sorry, this item is out of stock!', 'error');
        return;
    }
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
        showToast(`${product.name} quantity increased!`, 'success');
    } else {
        cart.push({ ...product, quantity: 1 });
        showToast(`${product.name} added to cart!`, 'success');
    }
    
    saveCart(); // SAVE TO LOCALSTORAGE
    updateCart();
    renderProducts();
}

// Update Quantity - FIXED to save to localStorage
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    const newQuantity = item.quantity + change;
    const availableStock = getAvailableStock(productId);
    
    if (change > 0 && availableStock <= 0) {
        showToast('Maximum stock reached!', 'error');
        return;
    }
    
    if (newQuantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    item.quantity = newQuantity;
    saveCart(); // SAVE TO LOCALSTORAGE
    updateCart();
    renderProducts();
    
    if (change > 0) {
        showToast('Quantity increased!', 'info');
    } else {
        showToast('Quantity decreased!', 'info');
    }
}

// Remove from Cart - FIXED to save to localStorage
function removeFromCart(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        cart = cart.filter(item => item.id !== productId);
        showToast(`${item.name} removed from cart!`, 'error');
        saveCart(); // SAVE TO LOCALSTORAGE
        updateCart();
        renderProducts();
    }
}

// Update Cart Display
function updateCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartFooter = document.getElementById('cartFooter');
    const cartBadge = document.getElementById('cartBadge');
    
    if (!cartItemsContainer || !cartFooter || !cartBadge) return;
    
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Update badge
    if (itemCount > 0) {
        cartBadge.textContent = itemCount;
        cartBadge.style.display = 'flex';
    } else {
        cartBadge.style.display = 'none';
    }
    
    // Update cart items
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="cart-empty">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" stroke-width="2" style="margin: 0 auto 1rem;">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <p>Your cart is empty</p>
            </div>
        `;
        cartFooter.style.display = 'none';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">${item.image.includes('.') ? `<img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;">` : item.image}</div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">₦${item.price.toLocaleString()}</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)" title="Decrease quantity">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M5 12h14"/>
                            </svg>
                        </button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)" title="Increase quantity">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M12 5v14M5 12h14"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})" title="Remove from cart">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M18 6L6 18M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        `).join('');
        cartFooter.style.display = 'block';
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) {
            cartTotal.textContent = `₦${total.toLocaleString()}`;
        }
    }
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Toggle Cart
function toggleCart() {
    const overlay = document.getElementById('cartOverlay');
    const sidebar = document.getElementById('cartSidebar');
    
    if (overlay && sidebar) {
        overlay.classList.toggle('active');
        sidebar.classList.toggle('active');
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', init);

if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

// Hero Background Carousel
let currentSlide = 0;
const slides = document.querySelectorAll(".carousel-image");

function showNextSlide() {
    if (slides.length > 0) {
        slides[currentSlide].classList.remove("active");
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add("active");
    }
}

setInterval(showNextSlide, 5000);

// Account Dropdown
function toggleAccountDropdown() {
    const menu = document.getElementById('accountDropdownMenu');
    const btn = document.querySelector('.account-btn');
    
    if (menu && btn) {
        menu.classList.toggle('active');
        btn.classList.toggle('active');
    }
}

document.addEventListener('click', function(event) {
    const wrapper = document.querySelector('.account-dropdown-wrapper');
    const menu = document.getElementById('accountDropdownMenu');
    const btn = document.querySelector('.account-btn');
    
    if (wrapper && !wrapper.contains(event.target)) {
        if (menu) menu.classList.remove('active');
        if (btn) btn.classList.remove('active');
    }
});

function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('dulin_user_logged_in') === 'true';
    const userName = localStorage.getItem('dulin_user_name');
    
    if (isLoggedIn && userName) {
        const signinSection = document.getElementById('dropdownSignin');
        if (signinSection) signinSection.style.display = 'none';
        
        const logoutLink = document.getElementById('logoutLink');
        const logoutDivider = document.getElementById('logoutDivider');
        if (logoutLink) logoutLink.style.display = 'flex';
        if (logoutDivider) logoutDivider.style.display = 'block';
        
        const accountBtn = document.querySelector('.account-btn span');
        if (accountBtn) accountBtn.textContent = userName;
    }
}

function handleLogout(event) {
    event.preventDefault();
    
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('dulin_user_logged_in');
        localStorage.removeItem('dulin_user_name');
        
        if (typeof showToast === 'function') {
            showToast('Logged out successfully', 'info');
        }
        
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }
    return false;
}

window.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});