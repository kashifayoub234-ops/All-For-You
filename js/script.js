let cart = JSON.parse(localStorage.getItem("cart")) || [];

// PRODUCT IMAGES
const productImages = {
    "Smart Watch": "./IMG_9535.jpeg",
    "Wireless Earbuds": "./IMG_9536.webp",
    "Home Gadget": "./IMG_9537.jpeg"
};


// ADD TO CART
function addToCart(name, price) {

    cart.push({
        name: name,
        price: Number(price),
        image: productImages[name] || ""
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart 🛒");
}


// SHOW CART
function showCart() {

    let cartBox = document.getElementById("cart-items");
    let totalBox = document.getElementById("total");

    if (!cartBox) return;

    if (cart.length === 0) {
        cartBox.innerHTML = "<p>Your cart is empty.</p>";

        if (totalBox) {
            totalBox.innerHTML = "Total: £0.00";
        }

        return;
    }

    let total = 0;
    cartBox.innerHTML = "";

    cart.forEach((item, index) => {

        total += Number(item.price) || 0;

        let image = item.image || productImages[item.name] || "";

        cartBox.innerHTML += `
            <div class="cart-item">

                <img
                    src="${image}"
                    alt="${item.name}"
                    class="cart-product-image"
                >

                <div class="cart-product-info">
                    <h3>${item.name}</h3>

                    <p>£${Number(item.price).toFixed(2)}</p>

                    <button onclick="removeItem(${index})">
                        Remove
                    </button>
                </div>

            </div>
        `;
    });

    if (totalBox) {
        totalBox.innerHTML = "Total: £" + total.toFixed(2);
    }
}


// REMOVE ITEM
function removeItem(index) {

    cart.splice(index, 1);

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();
}


// CLEAR CART
function clearCart() {

    cart = [];

    localStorage.removeItem("cart");

    showCart();
}


// SEARCH
function searchProduct() {

    let searchBox = document.getElementById("searchBox");

    if (!searchBox) return;

    let input = searchBox.value.toLowerCase();

    let products = document.querySelectorAll(".product-card");

    products.forEach(product => {

        let text = product.innerText.toLowerCase();

        product.style.display =
            text.includes(input) ? "block" : "none";
    });
}


// WISHLIST
let wishlist =
    JSON.parse(localStorage.getItem("wishlist")) || [];


function addToWishlist(product) {

    if (!wishlist.includes(product)) {
        wishlist.push(product);
    }

    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );

    alert(product + " added to wishlist ❤️");
}


function showWishlist() {

    let box = document.getElementById("wishlist-items");

    if (!box) return;

    if (wishlist.length === 0) {

        box.innerHTML =
            "<p>Your wishlist is empty.</p>";

        return;
    }

    box.innerHTML = "";

    wishlist.forEach(item => {

        box.innerHTML += `
            <div class="product-card">
                <h3>${item}</h3>
                <p>❤️ Favourite Product</p>
            </div>
        `;
    });
}


showCart();
showWishlist();
