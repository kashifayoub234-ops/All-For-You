let cart = JSON.parse(localStorage.getItem("cart")) || [];


function addToCart(name, price){

    cart.push({
        name: name,
        price: price
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    alert(name + " added to cart 🛒");
}



function showCart(){

    let cartBox = document.getElementById("cart-items");
    let totalBox = document.getElementById("total");

    if(!cartBox) return;


    if(cart.length === 0){

        cartBox.innerHTML = "<p>Your cart is empty</p>";
        totalBox.innerHTML = "Total: £0";
        return;

    }


    let total = 0;

    cartBox.innerHTML = "";


    cart.forEach((item,index)=>{

        total += item.price;


        cartBox.innerHTML += `
        <div>
        <h3>${item.name}</h3>
        <p>£${item.price}</p>
        <button onclick="removeItem(${index})">
        Remove
        </button>
        </div>
        `;

    });


    totalBox.innerHTML = "Total: £" + total.toFixed(2);

}



function removeItem(index){

    cart.splice(index,1);

    localStorage.setItem("cart", JSON.stringify(cart));

    showCart();

}



function clearCart(){

    cart=[];

    localStorage.removeItem("cart");

    showCart();

}


showCart();
function searchProduct(){

    let input = document.getElementById("searchBox").value.toLowerCase();

    let products = document.querySelectorAll(".product-card");

    products.forEach(product => {

        let name = product.innerText.toLowerCase();

        if(name.includes(input)){
            product.style.display = "block";
        }else{
            product.style.display = "none";
        }

    });

}
function searchProduct(){

    let input = document.getElementById("searchBox").value.toLowerCase();

    let products = document.querySelectorAll(".product-card");

    products.forEach(product => {

        let text = product.innerText.toLowerCase();

        if(text.includes(input)){
            product.style.display = "block";
        }
        else{
            product.style.display = "none";
        }

    });

}
let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

function addToWishlist(product){

    wishlist.push(product);

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    alert(product + " added to wishlist ❤️");
}
function showWishlist(){

    let box = document.getElementById("wishlist-items");

    if(!box) return;

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];


    if(wishlist.length === 0){

        box.innerHTML = "<p>Your wishlist is empty</p>";
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


showWishlist();
