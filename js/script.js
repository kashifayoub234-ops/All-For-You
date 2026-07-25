// =========================
// CART
// =========================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// PRODUCT IMAGES
const productImages = {
    "Smart Watch": "./IMG_9535.jpeg",
    "Wireless Earbuds": "./IMG_9536.webp",
    "Home Gadget": "./IMG_9537.jpeg"
};


// ADD TO CART
function addToCart(name, price) {

    let existingProduct = cart.find(item => item.name === name);

    if (existingProduct) {

        existingProduct.quantity =
            (existingProduct.quantity || 1) + 1;

    } else {

        cart.push({
            name: name,
            price: Number(price),
            image: productImages[name] || "",
            quantity: 1
        });

    }

    saveCart();

    alert(name + " added to cart 🛒");
}


// SAVE CART
function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}


// SHOW CART
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

        return;
    }


    let total = 0;

    cartBox.innerHTML = "";


    cart.forEach((item, index) => {

        // Old cart items may not have quantity
        if (!item.quantity) {
            item.quantity = 1;
        }

        let price = Number(item.price) || 0;

        total += price * item.quantity;

        let image =
            item.image ||
            productImages[item.name] ||
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

                    <button onclick="decreaseQuantity(${index})">
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

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


// REMOVE PRODUCT
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


    let products =
        document.querySelectorAll(".product-card");


    products.forEach(product => {

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


function addToWishlist(product) {

    if (!wishlist.includes(product)) {

        wishlist.push(product);

    }


    localStorage.setItem(
        "wishlist",
        JSON.stringify(wishlist)
    );


    alert(
        product +
        " added to wishlist ❤️"
    );

}


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


    wishlist.forEach(item => {

        box.innerHTML += `

        <div class="product-card">

            <h3>${item}</h3>

            <p>
                ❤️ Favourite Product
            </p>

        </div>

        `;

    });

}



// START
showCart();
showWishlist();
