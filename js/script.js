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


// Keep compatibility with existing cart code
const productImages = {
    "Smart Watch": "./IMG_9535.jpeg",
    "Wireless Earbuds": "./IMG_9536.webp",
    "Home Gadget": "./IMG_9537.jpeg"
};


// =========================
// CART
// =========================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );
}


// ADD TO CART
function addToCart(name, price) {

    let productPrice =
        Number(price) ||
        products[name]?.price ||
        0;

    let existingProduct =
        cart.find(item => item.name === name);


    if (existingProduct) {

        existingProduct.quantity =
            (existingProduct.quantity || 1) + 1;

    } else {

        cart.push({

            name: name,

            price: productPrice,

            image:
                products[name]?.image ||
                productImages[name] ||
                "",

            quantity: 1

        });
    }


    saveCart();

    alert(name + " added to cart 🛒");
}


// SHOW CART
function showCart() {

    let cartBox =
        document.getElementById("cart-items");

    let totalBox =
        document.getElementById("total");


    if (!cartBox) return;


    if (cart.length === 0) {

        cartBox.innerHTML =
            "<p>Your cart is empty.</p>";

        if (totalBox) {
            totalBox.innerHTML =
                "Total: £0.00";
        }

        return;
    }


    let total = 0;

    cartBox.innerHTML = "";


    cart.forEach((item, index) => {

        if (!item.quantity) {
            item.quantity = 1;
        }


        let price =
            Number(item.price) || 0;


        total +=
            price * item.quantity;


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

                <p>
                    £${price.toFixed(2)}
                </p>


                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>


                <button
                    onclick="removeItem(${index})">
                    Remove
                </button>

            </div>

        </div>

        `;
    });


    saveCart();


    if (totalBox) {

        totalBox.innerHTML =
            "Total: £" +
            total.toFixed(2);

    }
}


// INCREASE QUANTITY
function increaseQuantity(index) {

    cart[index].quantity =
        (cart[index].quantity || 1) + 1;

    saveCart();

    showCart();
}


// DECREASE QUANTITY
function decreaseQuantity(index) {

    let quantity =
        cart[index].quantity || 1;


    if (quantity > 1) {

        cart[index].quantity =
            quantity - 1;

    }

    saveCart();

    showCart();
}


// REMOVE CART ITEM
function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    showCart();
}


// CLEAR CART
function clearCart() {

    cart = [];

    localStorage.removeItem("cart");

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
        searchBox.value.toLowerCase();


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
// WISHLIST
// =========================

let wishlist =
    JSON.parse(
        localStorage.getItem("wishlist")
    ) || [];


// ADD TO WISHLIST
function addToWishlist(name) {

    if (!wishlist.includes(name)) {

        wishlist.push(name);

        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );

        alert(
            name +
            " added to wishlist ❤️"
        );

    } else {

        alert(
            name +
            " is already in your wishlist ❤️"
        );
    }
}


// SHOW WISHLIST
function showWishlist() {

    let box =
        document.getElementById(
            "wishlist-items"
        );


    if (!box) return;


    if (wishlist.length === 0) {

        box.innerHTML =
            "<p>Your wishlist is empty.</p>";

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

            <button
                onclick="addWishlistItemToCart('${name}')">
                Add To Cart 🛒
            </button>

            <button
                onclick="removeFromWishlist(${index})">
                Remove ❤️
            </button>

        </div>

        `;
    });
}


// WISHLIST → CART
function addWishlistItemToCart(name) {

    let product = products[name];

    if (!product) return;


    addToCart(
        name,
        product.price
    );
}


// REMOVE FROM WISHLIST
function removeFromWishlist(index) {

    wishlist.splice(index, 1);

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    showWishlist();
}



// =========================
// CHECKOUT TOTAL
// =========================

function showCheckoutTotal() {

    let checkoutTotal =
        document.getElementById(
            "checkout-total"
        );


    if (!checkoutTotal) return;


    let total = 0;


    cart.forEach(item => {

        let price =
            Number(item.price) || 0;

        let quantity =
            item.quantity || 1;


        total +=
            price * quantity;

    });


    checkoutTotal.innerHTML =
        "Total: £" +
        total.toFixed(2);
}



// =========================
// CHECKOUT ITEMS
// =========================

function showCheckoutItems() {

    let checkoutItems =
        document.getElementById(
            "checkout-items"
        );


    if (!checkoutItems) return;


    if (cart.length === 0) {

        checkoutItems.innerHTML =
            "<p>Your order is empty.</p>";

        return;
    }


    checkoutItems.innerHTML = "";


    cart.forEach(item => {

        let quantity =
            item.quantity || 1;

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

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Quantity: ${quantity}
                </p>

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
    document.getElementById(
        "checkout-form"
    );


if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;
            }


            cart = [];

            localStorage.removeItem(
                "cart"
            );


            window.location.href =
                "success.html";

        }
    );
}



// =========================
// START WEBSITE
// =========================

showCart();

showWishlist();

showCheckoutTotal();

showCheckoutItems();
// =========================
// CART + WISHLIST COUNTERS
// =========================

function updateHeaderCounters() {

    // Total cart quantity
    let cartCount = cart.reduce((total, item) => {
        return total + (item.quantity || 1);
    }, 0);

    // Wishlist total
    let wishlistCount = wishlist.length;

    // Update all counters on page
    document.querySelectorAll(".cart-count").forEach(counter => {
        counter.textContent = cartCount;
    });

    document.querySelectorAll(".wishlist-count").forEach(counter => {
        counter.textContent = wishlistCount;
    });
}

updateHeaderCounters();
