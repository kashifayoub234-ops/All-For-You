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
