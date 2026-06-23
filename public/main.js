// Cart state
let cart = [];

// DOM elements
const productGrid = document.getElementById('product-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartCount = document.getElementById('cart-count');
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');

// Fetch and render products
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Failed to load products:', error);
    }
}

// Render product cards
function renderProducts(products) {
    productGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-image="${product.image}">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');

    // Attach event listeners
    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', addToCart);
    });
}

// Add item to cart
function addToCart(e) {
    const btn = e.target;
    const id = parseInt(btn.dataset.id);
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    const image = btn.dataset.image;

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ id, name, price, image, quantity: 1 });
    }

    updateCart();
    openCart();
}

// Update cart UI
function updateCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p class="item-price">$${item.price.toFixed(2)}</p>
                </div>
                <div class="quantity-controls">
                    <button class="qty-btn" data-id="${item.id}" data-action="decrease">&minus;</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" data-id="${item.id}" data-action="increase">+</button>
                </div>
            </div>
        `).join('');

        // Attach quantity control listeners
        document.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', handleQuantity);
        });
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotal.textContent = `$${total.toFixed(2)}`;

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Handle quantity changes
function handleQuantity(e) {
    const id = parseInt(e.target.dataset.id);
    const action = e.target.dataset.action;
    const item = cart.find(item => item.id === id);

    if (!item) return;

    if (action === 'increase') {
        item.quantity++;
    } else if (action === 'decrease') {
        item.quantity--;
        if (item.quantity <= 0) {
            cart = cart.filter(i => i.id !== id);
        }
    }

    updateCart();
}

// Open cart sidebar
function openCart() {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('active');
}

// Close cart sidebar
function closeCartSidebar() {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('active');
}

// Event listeners
cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartSidebar);
cartOverlay.addEventListener('click', closeCartSidebar);

// Initialize
loadProducts();
