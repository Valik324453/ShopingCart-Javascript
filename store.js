if(document.readyState === 'loading')
{
    document.addEventListener('DOMContentLoaded', readyPage);
}
else
{
    readyPage();
}

function readyPage()
{
    let removeCartBtn = document.querySelectorAll('.btn-danger');
    for(let i = 0; i < removeCartBtn.length; i++)
    {
        let button = removeCartBtn[i];
        button.addEventListener('click', removeCartItem);
    }

    let quantityInputs = document.querySelectorAll('.cart-quantity-input');
    for(let i = 0; i < quantityInputs.length; i++)
    {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChange);
    }

    let addToCartBtn = document.querySelectorAll('.shop-item-button');
    for(let i = 0; i < addToCartBtn.length; i++)
    {
        let button = addToCartBtn[i];
        button.addEventListener('click', addToCartClick);
    }

    document.querySelector('.btn-purchase').addEventListener('click', purchaseClick);
}

function purchaseClick()
{
    alert('Thank you for purchase');
    let cartItems = document.querySelector('.cart-Items');

    while(cartItems.hasChildNodes)
    {
        cartItems.removeChild(cartItems.firstChild);
    }

    updateCart();
}

function addToCartClick(event)
{
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.querySelector('.shop-item-title').innerText;
    let price = shopItem.querySelector('.shop-item-price').innerText;
    let shopImg = shopItem.querySelector('.shop-item-image').src;
    addItemtoCart(title, price, shopImg);
    updateCart();
}

function addItemtoCart(title, price, img)
{
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.querySelector('.cart-items');
    let cartItemsName = cartItems.querySelectorAll('.cart-item-title')

    for(let i = 0; i < cartItemsName.length; i++)
    {
        if(cartItemsName[i].innerText == title)
        {
            alert('This item already added!');
            return;
        }
    }

    let = cartRowContent = `
    <div class = "cart-item  cart-column">
    <img class = "cart-item-image" src = "${img}" width = "100px" height = "100px" />
    <span class = "cart-item-title">${title}</span>
    <span class = "cart-price cart-column">${price}</span>
    <div class = "cart-quantity cart-column">
        <input class = "cart-quantity-input" type = "number" value = "1">
    </div>
    <button class = "btn btn-danger">Remove</button>
    </div>
    `;

    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);
    cartRow.querySelector('.btn-danger').addEventListener('click', removeCartItem);
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', quantityChange);
}

function removeCartItem(event)
{
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCart();
}

function quantityChange(event)
{
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0)
    {
        input.value = 1;
    }
    updateCart();
}

function updateCart()
{
    let cartItemContainer = document.querySelector('.cart-items');
    let cartRows = cartItemContainer.querySelectorAll('.cart-row');
    let total = 0;

    for(let i = 0; i < cartRows.length; i++)
    {
        let cartRow = cartRows[i];
        
        let priceElement = cartRow.querySelector('.cart-price');
        let quantityElement = cartRow.querySelector('.cart-quantity-input');
        let price = parseFloat(priceElement.innerText.replace('$', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.querySelector('.cart-price cart-column').innerText = '$' + total;
    document.querySelector('.cart-total-price').innerText = '$' + total;
}