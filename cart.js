import { priceFormat } from "./helperFunctions.js";

const cartTotalEl = document.getElementById('cartTotal');

export async function getCartTotal(products){
    let cartTotal = 0;

    for (const product of products){
        const response = await axios(`https://fakestoreapi.com/products/${product.productId}`);
        const productInfo = response.data;
        cartTotal += productInfo.price * product.quantity
    }

    return cartTotal;
}

export function displayCartTotal(cartTotal){
    const cartTotalFormatted = priceFormat.format(cartTotal);

    cartTotalEl.textContent = cartTotalFormatted;
}