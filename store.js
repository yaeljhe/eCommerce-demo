// if(document.readyState == 'loading'){
//     document.addEventListener('DOMContentLoaded', ready)
// }else{
//     ready()
    
// }

// function ready(){
//     var removeCartItemButtons = document.getElementsByClassName('btn-danger')
//     for(var i = 0; i < removeCartItemButtons.length;i++){
//         var button = removeCartItemButtons[i]
//         button.addEventListener('click',removeCartItem)
            
//     }

//     var quantityInputs = document.getElementsByClassName('cart-quantity-input')
//     for(var i = 0; i < quantityInputs.length; i++){
//         var input = quantityInputs[i]
//         input.addEventListener('change',quantityChanged)
//     }

//     var addToCartButtons = document.getElementsByClassName('shop-item-button')
//     for(var i =0; i< addToCartButtons.length; i++){
//         var button = addToCartButtons[i]
//         button.addEventListener('click', addToCartClicked)
//     }

//     document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
// }

// function purchaseClicked() {
//     alert('Thank you for your purchase')
//     var cartItems = document.getElementsByClassName('cart-items')[0]
//     while(cartItems.hasChildNodes()){
//         cartItems.removeChild(cartItems.firstChild)
//     }
//     updateCartTotal()
// }

// function removeCartItem(event) {
//     var buttonClicked = event.target
//     buttonClicked.parentElement.parentElement.remove()
//     updateCartTotal()
// }

// //Check Quanity is not negative or blank
// function quantityChanged(event){
//     var input = event.target
//     if(isNaN(input.value) || input.value <= 0){
//         input.value = 1
//     }
//     updateCartTotal()
// }

// function addToCartClicked(event){
//     var button = event.target
//     var shopItem = button.parentElement.parentElement
//     var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
//     var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
//     var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src 
//     addItemToCart(title, price, imageSrc)
//     saveLocalCartItems(title,price,imageSrc)
//     updateCartTotal()
// }

// function addItemToCart(title, price, imageSrc){
//     var cartRow = document.createElement('div')
//     cartRow.classList.add('cart-row')
//     var cartItems = document.getElementsByClassName('cart-items')[0]
//     var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
//     for(var i = 0; i < cartItemNames.length; i++){
//         if(cartItemNames[i].innerText == title){
//             alert('This Item is already added to the cart')
//             return
//         }
//     }
//     var cartRowContents = `
//         <div class="cart-item cart-column">
//             <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
//             <span class="cart-item-title">${title}</span>
//         </div>
//         <span class="cart-price cart-column">${price}</span>
//         <div class="cart-quantity cart-column">
//             <input class="cart-quantity-input" type="number" value="1">
//             <button class="btn btn-danger" type="button">REMOVE</button>
//         </div>`
//     cartRow.innerHTML = cartRowContents
//     cartItems.append(cartRow)
//     cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
//     cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
// }

// function updateCartTotal(){
//     var cartItemContainer = document.getElementsByClassName('cart-items')[0]
//     var cartRows = cartItemContainer.getElementsByClassName('cart-row')
//     var total = 0
//     for(var i = 0; i < cartRows.length; i++){
//         var cartRow = cartRows[i]
//         var priceElement = cartRow.getElementsByClassName('cart-price')[0]
//         var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
//         var price = parseFloat(priceElement.innerText.replace('$',''))
//         var quantity = quantityElement.value
//         total = total + (price * quantity)
//     }
//     total = Math.round(total * 100) / 100
//     document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
    
// }

// function saveLocalCartItems(title, price, imageSrc){
//     let cartItems;
//     if(localStorage.getItem('cartItems')===null){
//         cartItems =[];
//     }else{
//         cartItems = JSON.parse(localStorage.getItem('cartItems'));
//     }

//     let data = {
//         title: title,
//         price: price,
//         imageSrc: imageSrc 
//     }

//     cartItems.push(data);
//     localStorage.setItem('cartItems',JSON.stringify(cartItems))
// }

// getLocalCartItems();
// updateCartTotal();
// function getLocalCartItems(){
//     let cartItems;
//     if(localStorage.getItem('cartItems')===null){
//         cartItems =[];
//     }else{
//         cartItems = JSON.parse(localStorage.getItem('cartItems'));
//     }

//     cartItems.forEach(function(cartItem){
//         let titles = cartItem.title;
//         let prices = cartItem.price;
//         let imageSrcs = cartItem.imageSrc;

//        addItemToCart(titles, prices, imageSrcs)
//     });
    
// }


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