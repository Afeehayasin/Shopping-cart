document.addEventListener('DOMContentLoaded', () => {
    const productsContainer = document.getElementById('products');
    const cartContainer = document.getElementById('cart');
    const totalPriceContainer = document.getElementById('total-price');

    let cart = [];
    let products = [];

    // Fetch products from JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data; 
            displayProducts(products);
        })
        .catch(error => console.error('Error fetching products:', error)); 

    function displayProducts(products) {
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>Price: ₹${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            `;
            productsContainer.appendChild(productDiv);
        });
    }

    window.addToCart = function(id) {
        const product = products.find(p => p.id === id);
        if (product) {
            cart.push(product);
            displayCart();
        } else {
            console.error('Product not found:', id);
        }
    }

    function displayCart() {
        cartContainer.innerHTML = '';
        let totalPrice = 0;

        cart.forEach((item, index) => {
            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            cartItemDiv.innerHTML = `
                <img src="${item.image_url}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            `;
            cartContainer.appendChild(cartItemDiv);

            totalPrice += item.price;
        });

        totalPriceContainer.innerText = `Total Price: ₹${totalPrice}`;
    }

    window.removeFromCart = function(index) {
        cart.splice(index, 1); // Remove the item from the cart
        displayCart(); // Update the cart display
    }

    
});
