// =========================
// PRODUCT DATA
// =========================

const products = {
    "Smart Watch": {
        price: 39.99,
        image: "./IMG_9535.jpeg"
    },
    "Wireless Earbuds": {
        price: 24.99,
        image: "./IMG_9536.webp"
    },
    "Home Gadget": {
        price: 29.99,
        image: "./IMG_9537.jpeg"
    }
};

const productImages = {
    "Smart Watch": "./IMG_9535.jpeg",
    "Wireless Earbuds": "./IMG_9536.webp",
    "Home Gadget": "./IMG_9537.jpeg"
};


// =========================
// CART + WISHLIST DATA
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


// =========================
// HEADER COUNTERS
// =========================

function updateHeaderCounters() {

    let cartCount = cart.reduce((total, item) => {
        return total + (Number(item.quantity) || 1);
    }, 0);

    let wishlistCount = wishlist.length;

    document.querySelectorAll(".cart-count").forEach(counter => {
        counter.textContent = cartCount;
    });

    document.querySelectorAll(".wishlist-count").forEach(counter => {
        counter.textContent = wishlistCount;
    });
}


// =========================
// SAVE CART
// =========================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateHeaderCounters();
}


// =========================
// ADD TO CART
// =========================

function addToCart(name, price) {

    let productPrice =
        Number(price) ||
        products[name]?.price ||
        0;

    let existingProduct =
        cart.find(item => item.name === name);

    if (existingProduct) {

        existingProduct.quantity =
            (Number(existingProduct.quantity) || 1) + 1;

    } else {

        cart.push({
            name: name,
            price: productPrice,
            image: products[name]?.image || "",
            quantity: 1
        });
    }

    saveCart();

    alert(name + " added to cart 🛒");
}


// =========================
// SHOW CART
// =========================

function showCart() {

    let cartBox = document.getElementById("cart-items");
    let totalBox = document.getElementById("total");

    if (!cartBox) return;

    if (cart.length === 0) {

        cartBox.innerHTML =
            "<p>Your cart is empty.</p>";

        if (totalBox) {
            totalBox.innerHTML = "Total: £0.00";
        }

        updateHeaderCounters();
        return;
    }

    let total = 0;

    cartBox.innerHTML = "";

    cart.forEach((item, index) => {

        item.quantity =
            Number(item.quantity) || 1;

        let price =
            Number(item.price) || 0;

        total += price * item.quantity;

        let image =
            item.image ||
            products[item.name]?.image ||
            "";

        cartBox.innerHTML += `

        <div class="cart-item">

            <img
                src="${image}"
                alt="${item.name}"
                style="
                    width:80px;
                    height:80px;
                    max-width:80px;
                    object-fit:contain;
                    border-radius:10px;
                "
            >

            <div class="cart-product-info">

                <h3>${item.name}</h3>

                <p>£${price.toFixed(2)}</p>

                <div class="quantity-controls">

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>

                <button onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        </div>
        `;
    });

    saveCart();

    if (totalBox) {
        totalBox.innerHTML =
            "Total: £" + total.toFixed(2);
    }
}


// =========================
// CART QUANTITY
// =========================

function increaseQuantity(index) {

    cart[index].quantity =
        (Number(cart[index].quantity) || 1) + 1;

    saveCart();
    showCart();
}


function decreaseQuantity(index) {

    let quantity =
        Number(cart[index].quantity) || 1;

    if (quantity > 1) {
        cart[index].quantity = quantity - 1;
    }

    saveCart();
    showCart();
}


// =========================
// REMOVE / CLEAR CART
// =========================

function removeItem(index) {

    cart.splice(index, 1);

    saveCart();
    showCart();
}


function clearCart() {

    cart = [];

    localStorage.removeItem("cart");

    updateHeaderCounters();
    showCart();
}


// =========================
// SEARCH
// =========================

function searchProduct() {

    let searchBox =
        document.getElementById("searchBox");

    if (!searchBox) return;

    let input =
        searchBox.value.toLowerCase().trim();

    let productCards =
        document.querySelectorAll(".product-card");

    productCards.forEach(product => {

        let text =
            product.innerText.toLowerCase();

        product.style.display =
            text.includes(input)
                ? "block"
                : "none";
    });
}


// =========================
// ADD TO WISHLIST
// =========================

function addToWishlist(name) {

    // Fresh copy from storage
    wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    if (!wishlist.includes(name)) {

        wishlist.push(name);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        // UPDATE IMMEDIATELY
        updateHeaderCounters();

        alert(name + " added to wishlist ❤️");

    } else {

        updateHeaderCounters();

        alert(name + " is already in your wishlist ❤️");
    }
}


// =========================
// SHOW WISHLIST
// =========================

function showWishlist() {

    let box =
        document.getElementById("wishlist-items");

    if (!box) return;

    wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    if (wishlist.length === 0) {

        box.innerHTML =
            "<p>Your wishlist is empty.</p>";

        updateHeaderCounters();
        return;
    }

    box.innerHTML = "";

    wishlist.forEach((name, index) => {

        let product = products[name];

        if (!product) return;

        box.innerHTML += `

        <div class="product-card">

            <img
                src="${product.image}"
                alt="${name}"
            >

            <h3>${name}</h3>

            <p>
                £${product.price.toFixed(2)}
            </p>

            <button onclick="addWishlistItemToCart('${name}')">
                Add To Cart 🛒
            </button>

            <button onclick="removeFromWishlist(${index})">
                Remove ❤️
            </button>

        </div>
        `;
    });

    updateHeaderCounters();
}


// =========================
// WISHLIST TO CART
// =========================

function addWishlistItemToCart(name) {

    let product = products[name];

    if (!product) return;

    addToCart(name, product.price);
}


// =========================
// REMOVE FROM WISHLIST
// =========================

function removeFromWishlist(index) {

    wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist.splice(index, 1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    updateHeaderCounters();
    showWishlist();
}


// =========================
// CHECKOUT TOTAL
// =========================

function showCheckoutTotal() {

    let checkoutTotal =
        document.getElementById("checkout-total");

    if (!checkoutTotal) return;

    let total = 0;

    cart.forEach(item => {

        let price =
            Number(item.price) || 0;

        let quantity =
            Number(item.quantity) || 1;

        total += price * quantity;
    });

    checkoutTotal.innerHTML =
        "Total: £" + total.toFixed(2);
}


// =========================
// CHECKOUT ITEMS
// =========================

function showCheckoutItems() {

    let checkoutItems =
        document.getElementById("checkout-items");

    if (!checkoutItems) return;

    if (cart.length === 0) {

        checkoutItems.innerHTML =
            "<p>Your order is empty.</p>";

        return;
    }

    checkoutItems.innerHTML = "";

    cart.forEach(item => {

        let quantity =
            Number(item.quantity) || 1;

        let price =
            Number(item.price) || 0;

        let image =
            item.image ||
            products[item.name]?.image ||
            "";

        checkoutItems.innerHTML += `

        <div class="checkout-item">

            <img
                src="${image}"
                alt="${item.name}"
                style="
                    width:65px;
                    height:65px;
                    object-fit:contain;
                    border-radius:8px;
                "
            >

            <div>

                <h3>${item.name}</h3>

                <p>Quantity: ${quantity}</p>

                <p>
                    £${(price * quantity).toFixed(2)}
                </p>

            </div>

        </div>
        `;
    });
}


// =========================
// PLACE ORDER
// =========================

const checkoutForm =
    document.getElementById("checkout-form");

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            if (cart.length === 0) {

                alert("Your cart is empty.");
                return;
            }

            cart = [];

            localStorage.removeItem("cart");

            updateHeaderCounters();

            window.location.href =
                "success.html";
        }
    );
}


// =========================
// START WEBSITE
// =========================

updateHeaderCounters();

showCart();

showWishlist();

showCheckoutTotal();

showCheckoutItems();
