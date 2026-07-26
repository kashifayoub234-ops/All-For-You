// ==========================================
// ALL FOR YOU - MAIN JAVASCRIPT
// ==========================================


// ==========================================
// PRODUCT DATA
// ==========================================

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


// ==========================================
// CART + WISHLIST
// ==========================================

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];

let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];


// ==========================================
// HEADER COUNTERS
// ==========================================

function updateHeaderCounters() {

    cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    wishlist =
        JSON.parse(localStorage.getItem("wishlist")) || [];


    const cartCount =
        cart.reduce((total, item) => {

            return total +
                (Number(item.quantity) || 1);

        }, 0);


    const wishlistCount =
        wishlist.length;


    document
        .querySelectorAll(".cart-count")
        .forEach(counter => {

            counter.textContent = cartCount;

        });


    document
        .querySelectorAll(".wishlist-count")
        .forEach(counter => {

            counter.textContent = wishlistCount;

        });

}


// ==========================================
// SAVE CART
// ==========================================

function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateHeaderCounters();

}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(name, price) {

    cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    const productPrice =
        Number(price) ||
        products[name]?.price ||
        0;


    const existingProduct =
        cart.find(item => item.name === name);


    if (existingProduct) {

        existingProduct.quantity =
            (Number(existingProduct.quantity) || 1) + 1;

    } else {

        cart.push({

            name: name,

            price: productPrice,

            image:
                products[name]?.image || "",

            quantity: 1

        });

    }


    saveCart();

    alert(name + " added to cart 🛒");

}


// ==========================================
// SHOW CART
// ==========================================

function showCart() {

    const cartBox =
        document.getElementById("cart-items");

    const totalBox =
        document.getElementById("total");


    if (!cartBox) return;


    cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (cart.length === 0) {

        cartBox.innerHTML =
            "<p>Your cart is empty.</p>";


        if (totalBox) {

            totalBox.textContent =
                "Total: £0.00";

        }


        updateHeaderCounters();

        return;

    }


    let total = 0;

    cartBox.innerHTML = "";


    cart.forEach((item, index) => {

        const quantity =
            Number(item.quantity) || 1;

        const price =
            Number(item.price) || 0;


        total += price * quantity;


        const image =
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

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        £${price.toFixed(2)}
                    </p>


                    <div class="quantity-controls">

                        <button
                            type="button"
                            onclick="decreaseQuantity(${index})">
                            −
                        </button>

                        <span>
                            ${quantity}
                        </span>

                        <button
                            type="button"
                            onclick="increaseQuantity(${index})">
                            +
                        </button>

                    </div>


                    <button
                        type="button"
                        onclick="removeItem(${index})">

                        Remove

                    </button>

                </div>

            </div>

        `;

    });


    if (totalBox) {

        totalBox.textContent =
            "Total: £" +
            total.toFixed(2);

    }


    updateHeaderCounters();

}


// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQuantity(index) {

    cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (!cart[index]) return;


    cart[index].quantity =
        (Number(cart[index].quantity) || 1) + 1;


    saveCart();

    showCart();

}


// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(index) {

    cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    if (!cart[index]) return;


    const quantity =
        Number(cart[index].quantity) || 1;


    if (quantity > 1) {

        cart[index].quantity =
            quantity - 1;

    }


    saveCart();

    showCart();

}


// ==========================================
// REMOVE CART ITEM
// ==========================================

function removeItem(index) {

    cart =
        JSON.parse(localStorage.getItem("cart")) || [];


    cart.splice(index, 1);


    saveCart();

    showCart();

}


// ==========================================
// CLEAR CART
// ==========================================

function clearCart() {

    cart = [];

    localStorage.removeItem("cart");

    updateHeaderCounters();

    showCart();

}


// ==========================================
// ADD TO WISHLIST
// ==========================================

function addToWishlist(name) {

    wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    if (!wishlist.includes(name)) {

        wishlist.push(name);


        localStorage.setItem(
            "wishlist",
            JSON.stringify(wishlist)
        );


        updateHeaderCounters();


        alert(
            name +
            " added to wishlist ❤️"
        );

    } else {

        updateHeaderCounters();


        alert(
            name +
            " is already in your wishlist ❤️"
        );

    }

}


// ==========================================
// SHOW WISHLIST
// ==========================================

function showWishlist() {

    const box =
        document.getElementById(
            "wishlist-items"
        );


    if (!box) return;


    wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    if (wishlist.length === 0) {

        box.innerHTML =
            "<p>Your wishlist is empty.</p>";


        updateHeaderCounters();

        return;

    }


    box.innerHTML = "";


    wishlist.forEach((name, index) => {

        const product =
            products[name];


        if (!product) return;


        box.innerHTML += `

            <div class="product-card">

                <img
                    src="${product.image}"
                    alt="${name}"
                >

                <h3>
                    ${name}
                </h3>

                <p>
                    £${product.price.toFixed(2)}
                </p>


                <button
                    type="button"
                    onclick="addWishlistItemToCart('${name}')">

                    Add To Cart 🛒

                </button>


                <button
                    type="button"
                    onclick="removeFromWishlist(${index})">

                    Remove ❤️

                </button>

            </div>

        `;

    });


    updateHeaderCounters();

}


// ==========================================
// WISHLIST → CART
// ==========================================

function addWishlistItemToCart(name) {

    const product =
        products[name];


    if (!product) return;


    addToCart(
        name,
        product.price
    );

}


// ==========================================
// REMOVE FROM WISHLIST
// ==========================================

function removeFromWishlist(index) {

    wishlist =
        JSON.parse(
            localStorage.getItem("wishlist")
        ) || [];


    wishlist.splice(index, 1);


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    updateHeaderCounters();

    showWishlist();

}


// ==========================================
// SEARCH PRODUCT
// ==========================================

function searchProduct() {

    const searchBox =
        document.getElementById("searchBox");


    if (!searchBox) return;


    const searchTerm =
        searchBox.value.trim();


    if (searchTerm === "") {

        // If already on products page,
        // show products again

        if (
            window.location.pathname
                .endsWith("products.html")
        ) {

            applyProductFilters();

        }

        return;

    }


    // If user searches from Home,
    // Contact, Cart, etc.

    if (
        !window.location.pathname
            .endsWith("products.html")
    ) {

        window.location.href =
            "products.html?search=" +
            encodeURIComponent(searchTerm);

        return;

    }


    applyProductFilters();

}


// ==========================================
// PRODUCT FILTERS
// CATEGORY + SEARCH
// ==========================================

function applyProductFilters() {

    if (
        !window.location.pathname
            .endsWith("products.html")
    ) {

        return;

    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const selectedCategory =
        params.get("category");


    const urlSearch =
        params.get("search");


    const searchBox =
        document.getElementById("searchBox");


    let searchTerm = "";


    if (
        searchBox &&
        searchBox.value.trim() !== ""
    ) {

        searchTerm =
            searchBox.value
                .trim()
                .toLowerCase();

    } else if (urlSearch) {

        searchTerm =
            urlSearch
                .trim()
                .toLowerCase();


        if (searchBox) {

            searchBox.value =
                urlSearch;

        }

    }


    const cards =
        document.querySelectorAll(
            ".product-card"
        );


    let visibleProducts = 0;


    cards.forEach(card => {

        const name =
            card.querySelector("h3")
                ?.textContent
                .toLowerCase()
                .trim() || "";


        const category =
            card.dataset.category
                ?.toLowerCase()
                .trim() || "";


        let categoryMatch = true;

        let searchMatch = true;


        if (selectedCategory) {

            categoryMatch =
                category ===
                selectedCategory.toLowerCase();

        }


        if (searchTerm) {

            searchMatch =
                name.includes(searchTerm) ||
                category.includes(searchTerm);

        }


        if (
            categoryMatch &&
            searchMatch
        ) {

            card.style.display = "block";

            visibleProducts++;

        } else {

            card.style.display = "none";

        }

    });


    // ======================================
    // PAGE TITLE
    // ======================================

    const title =
        document.getElementById(
            "products-title"
        );


    const categoryNames = {

        electronics:
            "Electronics",

        fashion:
            "Fashion",

        home:
            "Home & Living",

        beauty:
            "Beauty",

        toys:
            "Toys",

        accessories:
            "Accessories"

    };


    if (title) {

        if (searchTerm) {

            title.textContent =
                'Search Results for "' +
                (
                    searchBox?.value ||
                    urlSearch ||
                    ""
                ) +
                '"';

        } else if (selectedCategory) {

            title.textContent =
                categoryNames[
                    selectedCategory
                ] ||
                "Our Products";

        } else {

            title.textContent =
                "Our Products";

        }

    }


    // ======================================
    // NO PRODUCTS MESSAGE
    // ======================================

    const noProducts =
        document.getElementById(
            "no-products"
        );


    if (noProducts) {

        if (visibleProducts === 0) {

            noProducts.style.display =
                "block";

            noProducts.textContent =
                searchTerm
                    ? "No products found for your search."
                    : "No products found in this category.";

        } else {

            noProducts.style.display =
                "none";

        }

    }

}


// ==========================================
// SEARCH USING ENTER KEY
// ==========================================

function setupSearchBox() {

    const searchBox =
        document.getElementById("searchBox");


    if (!searchBox) return;


    // Remove inline onkeyup so mobile users
    // aren't redirected after every letter.

    searchBox.removeAttribute("onkeyup");


    searchBox.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                event.preventDefault();

                searchProduct();

            }

        }
    );


    // Live filtering only when already
    // on products.html

    if (
        window.location.pathname
            .endsWith("products.html")
    ) {

        searchBox.addEventListener(
            "input",
            function() {

                applyProductFilters();

            }
        );

    }

}


// ==========================================
// CHECKOUT TOTAL
// ==========================================

function showCheckoutTotal() {

    const checkoutTotal =
        document.getElementById(
            "checkout-total"
        );


    if (!checkoutTotal) return;


    cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    let total = 0;


    cart.forEach(item => {

        const price =
            Number(item.price) || 0;


        const quantity =
            Number(item.quantity) || 1;


        total +=
            price * quantity;

    });


    checkoutTotal.textContent =
        "Total: £" +
        total.toFixed(2);

}


// ==========================================
// CHECKOUT ITEMS
// ==========================================

function showCheckoutItems() {

    const checkoutItems =
        document.getElementById(
            "checkout-items"
        );


    if (!checkoutItems) return;


    cart =
        JSON.parse(
            localStorage.getItem("cart")
        ) || [];


    if (cart.length === 0) {

        checkoutItems.innerHTML =
            "<p>Your order is empty.</p>";

        return;

    }


    checkoutItems.innerHTML = "";


    cart.forEach(item => {

        const quantity =
            Number(item.quantity) || 1;


        const price =
            Number(item.price) || 0;


        const image =
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
                        £${(
                            price * quantity
                        ).toFixed(2)}
                    </p>

                </div>

            </div>

        `;

    });

}


// ==========================================
// PLACE ORDER
// ==========================================

function setupCheckout() {

    const checkoutForm =
        document.getElementById(
            "checkout-form"
        );


    if (!checkoutForm) return;


    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            cart =
                JSON.parse(
                    localStorage.getItem("cart")
                ) || [];


            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;

            }


            // Payment gateway will be
            // connected later.
            // For now order goes to
            // confirmation page.

            cart = [];


            localStorage.removeItem(
                "cart"
            );


            updateHeaderCounters();


            window.location.href =
                "success.html";

        }
    );

}


// ==========================================
// START WEBSITE
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateHeaderCounters();

        setupSearchBox();

        applyProductFilters();

        showCart();

        showWishlist();

        showCheckoutTotal();

        showCheckoutItems();

        setupCheckout();

    }
);
// =========================
// ACTIVE NAVIGATION
// =========================

function setActiveNavigation() {

    const navLinks = document.querySelectorAll(".main-nav a");

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const params =
        new URLSearchParams(window.location.search);

    const currentCategory =
        params.get("category");

    navLinks.forEach(link => {

        link.classList.remove("active-nav");

        const href = link.getAttribute("href");

        if (!href) return;

        const linkURL =
            new URL(href, window.location.href);

        const linkPage =
            linkURL.pathname.split("/").pop();

        const linkCategory =
            linkURL.searchParams.get("category");


        // CATEGORY PAGE
        if (
            currentPage === "products.html" &&
            currentCategory &&
            linkPage === "products.html" &&
            linkCategory === currentCategory
        ) {
            link.classList.add("active-nav");
            return;
        }


        // ALL PRODUCTS
        if (
            currentPage === "products.html" &&
            !currentCategory &&
            linkPage === "products.html" &&
            !linkCategory
        ) {
            link.classList.add("active-nav");
            return;
        }


        // HOME
        if (
            currentPage === "index.html" &&
            linkPage === "index.html"
        ) {
            link.classList.add("active-nav");
        }

    });
}

setActiveNavigation();
// ===== CONTACT US ACTIVE NAV FIX =====

document.addEventListener("DOMContentLoaded", function () {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop()
            .toLowerCase();

    if (currentPage === "contact.html") {

        document.querySelectorAll(".main-nav a")
            .forEach(function (link) {

                const href =
                    (link.getAttribute("href") || "")
                    .split("?")[0]
                    .toLowerCase();

                if (href === "contact.html") {
                    link.classList.add("active-nav");
                }

            });
    }

});
