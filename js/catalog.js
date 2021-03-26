/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

// On screen load, we call this method to put all of the busmall options
// (the things in the Product.allProducts array) into the drop down list.
function populateForm() {
  const selectElement = document.getElementById('items');
  let newOption;

  for (let i in Product.allProducts) {
    //create new option element
    newOption = document.createElement('option');

    //give it some text value
    newOption.appendChild(document.createTextNode(Product.allProducts[i].name));

    //set the value and append to select
    newOption.value = Product.allProducts[i].name;
    selectElement.appendChild(newOption);
  }

}

// When someone submits the form, we need to add the selected item to the cart
// object, save the whole thing back to local storage and update the screen
// so that it shows the # of items in the cart and a quick preview of the cart itself.
function handleSubmit(event) {
  event.preventDefault(); //prevents page from loading

  // Do all the things ...
  addSelectedItemToCart(event);
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

function addSelectedItemToCart(event) {
  const product = event.target.items.value;
  const quantity = parseInt(event.target.quantity.value);

  //uses the addItem method in app.js
  cart.addItem(product, quantity);
}

function updateCounter() {
  const itemCount = document.getElementById('itemCount');
  itemCount.innerHTML = '';

  let itemsInCart = 0;
  let retrievedItems = JSON.parse(localStorage.getItem('cart'));
  for(let item of retrievedItems) {
    itemsInCart += item.quantity;
  }

  const newPElement = document.createElement('p');
  newPElement.textContent = `Total items in cart: ${itemsInCart}`;

  itemCount.appendChild(newPElement);
}

function updateCartPreview() {
  const cartPreviewElem = document.getElementById('cartContents');
  cartPreviewElem.innerHTML = '';
  const items = cart.items;
  let contents;
  let retrievedItems = JSON.parse(localStorage.getItem('cart'));

  for (let item of retrievedItems) {
    contents = document.createElement('p');
    contents.textContent = `${item.quantity} ${item.product}(s)`;

    cartPreviewElem.appendChild(contents);
  }
}

// Set up the "submit" event listener on the form.
// This is the trigger for the app. When a user "submits" the form, it will
// Call that handleSubmit method above and kick off the whole process
const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

// Before anything else of value can happen, we need to fill in the select
// drop down list in the form.
populateForm();
updateCounter();
updateCartPreview();