import { priceFormat } from "./helperFunctions.js";

//a function to create an individual cart item
export function createCartItem(product, qty) {
    const template = document.getElementById('cartItemTemplate');
    const clone = template.content.cloneNode(true);

    const img = clone.querySelector('img');
    img.setAttribute('src', product.image);

    const name = clone.querySelector('.name')
    name.textContent = product.title;

    const quantity = clone.querySelector('.quantity');
    quantity.textContent = qty;

    const productPrice = parseFloat(product.price);
    const productQty = parseInt(qty);

    const price = clone.querySelector('.price');
    price.textContent = priceFormat.format(productPrice);

    const total = clone.querySelector('.total');
    total.textContent = priceFormat.format(productPrice * productQty);

    return clone;
}
