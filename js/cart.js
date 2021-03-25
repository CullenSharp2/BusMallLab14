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

// TODONE: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  //reference to table id='cart'
  const cartElem = document.getElementById('cart');
  cartElem.innerHTML='';
}

// TODONE: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  const cartElem = document.getElementById('cart');
  let tr;
  let td;

  for(let item of cart.items) {
    //add delete cell
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.textContent = 'X';
    td.value = item.product;
    tr.appendChild(td);

    //add item quantity
    td = document.createElement('td');
    td.textContent = item.quantity;
    tr.appendChild(td);

    //add item name
    td = document.createElement('td');
    td.textContent = item.product;
    tr.appendChild(td);
    cartElem.appendChild(tr);
  }  
}

function removeItemFromCart(event) {
  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  cart.removeItem(event.target.value);
  console.log(cart.items);
  // TODO: Save the cart back to local storage
  cart.saveToLocalStorage();
  // TODO: Re-draw the cart table
  renderCart();

}

// This will initialize the page and draw the cart on screen
renderCart();