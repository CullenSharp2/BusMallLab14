/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

function clearCart() {
  //reference to table id='cart'
  const cartElem = document.getElementById('cart');
  cartElem.innerHTML='';
}

function showCart() {
  const cartElem = document.getElementById('cart');
  let tr;
  let td;

  for(let i in cart.items) {
    //add delete cell
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.textContent = 'X';
    td.value = i; //add a reference to the index for deletion
    tr.appendChild(td);

    //add item quantity
    td = document.createElement('td');
    td.textContent = cart.items[i].quantity;
    tr.appendChild(td);

    //add item name
    td = document.createElement('td');
    td.textContent = cart.items[i].product;
    tr.appendChild(td);
    cartElem.appendChild(tr);
  }  
}

function removeItemFromCart(event) {
  //remove item from cart at index
  cart.removeItem(event.target.value);
  cart.saveToLocalStorage();
  renderCart();

}

// This will initialize the page and draw the cart on screen
renderCart();