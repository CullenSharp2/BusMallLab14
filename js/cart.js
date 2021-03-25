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

// TODO: Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  //reference to table id='cart'
  const cartElem = document.getElementById('cart');
  cartElem.innerHTML='';
}

// TODO: Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  const cartElem = document.getElementById('cart');
  let tr;
  let td;
  // TODONE: Find the table body

  for(let item of cart.items) {
    console.log(item);
    //add delete cell
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.textContent = 'Remove';
    tr.appendChild(td);

    //add item quantity
    td = document.createElement('td');
    td.textContent = item.quantity;
    tr.appendChild(td);

    //add item name
    td = document.createElement('td');
    td.textContent = `${item.product}(s)`;
    tr.appendChild(td);
    cartElem.appendChild(tr);
  }  
  // TODO: Iterate over the items in the cart
  // TODO: Create a TR
  // TODO: Create a TD for the delete link, quantity,  and the item
  // TODO: Add the TR to the TBODY and each of the TD's to the TR

}

function removeItemFromCart(event) {

  // TODO: When a delete link is clicked, use cart.removeItem to remove the correct item
  // TODO: Save the cart back to local storage
  // TODO: Re-draw the cart table

}

// This will initialize the page and draw the cart on screen
renderCart();