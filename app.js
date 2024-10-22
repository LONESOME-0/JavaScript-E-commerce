// Array to hold products and cart items
let products = [];
let cart = [];

// Get references to the DOM elements
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productImageInput = document.getElementById('productImage');
const productList = document.getElementById('productList');
const cartList = document.getElementById('cartList');
const totalPriceEl = document.getElementById('totalPrice');
const createProductBtn = document.getElementById('createProductBtn');

// Function to create a product
function createProduct() {
    const name = productNameInput.value;
    const price = parseFloat(productPriceInput.value);
    const image = productImageInput.value;

    if (name && price && image) {
        const product = { name, price, image };
        products.push(product);
        displayProducts();
        productNameInput.value = '';
        productPriceInput.value = '';
        productImageInput.value = '';
    } else {
        alert('Please fill all fields');
    }
}

// Function to display products in the dashboard
function displayProducts() {
    productList.innerHTML = '';
    products.forEach((product, index) => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <input type="checkbox" data-index="${index}" onchange="addToCart(${index}, this.checked)">
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)}</p>
            </div>
        `;
        productList.appendChild(productItem);
    });
}

// Function to add or remove products from the cart
function addToCart(productIndex, isChecked) {
    const product = products[productIndex];
    if (isChecked) {
        cart.push(product);
    } else {
        cart = cart.filter(cartItem => cartItem.name !== product.name);
    }
    displayCart();
}

// Function to display cart items
function displayCart() {
    cartList.innerHTML = '';
    cart.forEach((product, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div>
                <h4>${product.name}</h4>
                <p>$${product.price.toFixed(2)}</p>
                <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartList.appendChild(cartItem);
    });
}

// Function to remove item from cart
function removeFromCart(cartIndex) {
    cart.splice(cartIndex, 1);
    displayCart();
    displayProducts();
}

// Function to calculate total price
function calculateTotalPrice() {
    const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);
    totalPriceEl.textContent = totalPrice.toFixed(2);
}

// Event listeners
createProductBtn.addEventListener('click', createProduct);
document.getElementById('calculateTotal').addEventListener('click', calculateTotalPrice);
