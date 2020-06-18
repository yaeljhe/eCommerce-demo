if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
}else{
    ready()
    
}

//Add event listener to all add to cart buttons
function ready(){
    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for(var i =0; i< addToCartButtons.length; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    displayNumofCartItems();
}

//Add to Cart and save to local storage
function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src 
    saveLocalCartItems(title,price,imageSrc);
}

//Save Items to Local Storage & Update Cart Quantity
function saveLocalCartItems(title, price, imageSrc){
    let cartItems;
    let itemInStorage = 'N'
    if(localStorage.getItem('cartItems')===null){
        cartItems =[];
    }else{
        cartItems = JSON.parse(localStorage.getItem('cartItems'));
    }

    // Increase item quantity if item is already in local storage
    for (var i = 0; i < cartItems.length; i++){
        if(title === cartItems[i].title){
            itemInStorage = 'Y';
            cartItems[i].quantity += 1;
            break;
        }
    }

    // Add item to local storage when its not found in local storage
    if(itemInStorage === 'N'){
        let data = {
            title: title,
            price: price,
            imageSrc: imageSrc, 
            quantity: 1
        }
        cartItems.push(data);
    }
    localStorage.setItem('cartItems',JSON.stringify(cartItems))

    // Update Cart Quantity
    displayNumofCartItems();
}
//Updates Cart Quantity
function displayNumofCartItems(){
    let numOfCartItems = 0;
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (cartItems < 1){
        numberOfCartItems = 0
        return numOfCartItems;
    }

    for (var i = 0; i < cartItems.length; i++){
       numOfCartItems = numOfCartItems + cartItems[i].quantity;
    }
    document.getElementsByClassName('cart-item-num')[0].innerText = numOfCartItems;    

}