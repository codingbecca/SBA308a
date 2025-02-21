import { priceFormat } from "./helperFunctions.js";

const cartsContainer = document.getElementById('cartsContainer');

//a function that will calculate the total of a cart from an array of products
export async function getCartTotal(products){
    try { 
        let cartTotal = 0;
    
        for (const product of products){
            const response = await axios(`https://fakestoreapi.com/products/${product.productId}`);
            const productInfo = response.data;
            cartTotal += productInfo.price * product.quantity
        }
    
        return cartTotal;
    } catch (e) {
        console.error(e)
    }
}

//a function to display the provided cart total formatted as currency in the provided element
export function displayCartTotal(cartTotal, element){
    const cartTotalFormatted = priceFormat.format(cartTotal);

    element.textContent = cartTotalFormatted;
}

//a function that creates an empty cart with a given id and appends the cart to the DOM
export function createCart(cartId){
    const template = document.getElementById('cartTemplate');
    const clone = template.content.cloneNode(true);
    const cartWrapper = clone.querySelector('.cart');
    cartWrapper.setAttribute('id', `cart${cartId}`);
    const deleteBtn = clone.querySelector('.deleteBtn');
    deleteBtn.firstElementChild.setAttribute('id', cartId);

    cartsContainer.appendChild(clone);

}

//a function that clears all carts from the DOM
export function clearCarts() {
    const carts = document.getElementById('cartsContainer');
    while (carts.firstChild){
        carts.removeChild(carts.firstChild);
    }
}

//a function to remove a specific cart from the DOM
export function deleteSingleCart(id) {
    const cart = document.getElementById(`cart${id}`);
    cart.remove();
}