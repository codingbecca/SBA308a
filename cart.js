import { priceFormat } from "./helperFunctions.js";

const cartsContainer = document.getElementById('cartsContainer');

export async function getCartTotal(products){
    let cartTotal = 0;

    for (const product of products){
        const response = await axios(`https://fakestoreapi.com/products/${product.productId}`);
        const productInfo = response.data;
        cartTotal += productInfo.price * product.quantity
    }

    return cartTotal;
}

export function displayCartTotal(cartTotal, element){
    const cartTotalFormatted = priceFormat.format(cartTotal);

    element.textContent = cartTotalFormatted;
}

export function createCart(cartId){
    const template = document.getElementById('cartTemplate');
    const clone = template.content.cloneNode(true);
    const cartWrapper = clone.querySelector('.cart');
    cartWrapper.setAttribute('id', `cart${cartId}`);
    const deleteBtn = clone.querySelector('.deleteBtn');
    deleteBtn.firstChild.setAttribute('id', cartId);

    cartsContainer.appendChild(clone);

}

export function clearCarts() {
    const carts = document.getElementById('cartsContainer');
    while (carts.firstChild){
        carts.removeChild(carts.firstChild);
    }
}

export function deleteSingleCart(id) {
    const cart = document.getElementById(`cart${id}`);
    cart.remove();
}