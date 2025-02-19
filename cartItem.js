import { priceFormat } from "./helperFunctions.js";

export function createCartItem(product, qty) {
    const template = document.getElementById('cartItemTemplate');
    const clone = template.content.cloneNode(true);

    const img = clone.querySelector('img');
    img.setAttribute('src', product.image);

    const name = clone.getElementById('name')
    name.textContent = product.title;

    const quantity = clone.getElementById('quantity');
    quantity.textContent = qty;

    const productPrice = parseFloat(product.price);
    const productQty = parseInt(qty);

    const price = clone.getElementById('price');
    price.textContent = priceFormat.format(productPrice);

    const total = clone.getElementById('total');
    total.textContent = priceFormat.format(productPrice * productQty);

    return clone;
}
