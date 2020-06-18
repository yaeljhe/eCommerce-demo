if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
}


function ready(){

    getLocalCartItems()

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
}

function addItemToCart(title, price, imageSrc, quantity){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for(var i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){
            alert("Already in Cart")
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="${quantity}">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal(){
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for(var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total    
}

function getLocalCartItems(){
    let cartItems;
    if(localStorage.getItem('cartItems')===null){
        cartItems =[];
    }else{
        cartItems = JSON.parse(localStorage.getItem('cartItems'));
    }

    cartItems.forEach(function(cartItem){
        let titles = cartItem.title;
        let prices = cartItem.price;
        let imageSrcs = cartItem.imageSrc;
        let quantity = cartItem.quantity;

       addItemToCart(titles, prices, imageSrcs, quantity)

    });
    updateCartTotal();

    if(cartItems.length > 0){
        displayNumofCartItems();
    }
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    //Remove Items from Shopping Cart
    let cartItemsInCart = document.getElementsByClassName('cart-items')[0]
    while(cartItemsInCart.hasChildNodes()){
        cartItemsInCart.removeChild(cartItemsInCart.firstChild)
    }

    localStorage.clear();
    displayNumofCartItems();
    updateCartTotal();
}

//Check Quanity is not negative or blank
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }
    updateCartTotal()
    displayNumofCartItems();

}

//Updates Cart Quantity
function displayNumofCartItems(){
    let numOfCartItems = 0;
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (cartItems < 1){
        return document.getElementsByClassName('cart-item-num')[0].innerText = numOfCartItems;
    }

    for (var i = 0; i < cartItems.length; i++){
        numOfCartItems = numOfCartItems + cartItems[i].quantity;
    }
    document.getElementsByClassName('cart-item-num')[0].innerText = numOfCartItems; 
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    const item = buttonClicked.parentElement.parentElement
    removeitemFromLocal(item);
    item.remove();
    updateCartTotal();
    displayNumofCartItems();
}

function removeitemFromLocal(item){
    let cartItems;
    if(localStorage.getItem('cartItems')===null){
        cartItems =[];
    }else{
        cartItems = JSON.parse(localStorage.getItem('cartItems'));
    }
    const itemIndex = item.children[0].innerText;
    let index = cartItems.findIndex(obj => obj.title == itemIndex);
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

