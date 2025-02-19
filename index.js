import * as CartItem from "./cartItem.js";
import * as Cart from "./cart.js";

const userSelect = document.getElementById('userSelect');

let usersWCarts = [];

(async function loadAvailableUsers() {
    const carts = await axios('https://fakestoreapi.com/carts');
    const users = new Set();
    carts.data.forEach(cart => users.add(cart.userId));
    usersWCarts = Array.from(users);
    usersWCarts.forEach(user => {
        const option = document.createElement('option')
        option.setAttribute('value', user)
        option.textContent = `User ${user}`;
        userSelect.appendChild(option)
    })
    handleSelectUser({target: {value: 1}})
})();


userSelect.addEventListener('change', handleSelectUser);

async function handleSelectUser(e) {
    const userId = e.target.value;
    Cart.clear();

    const response = await axios(`https://fakestoreapi.com/carts/user/${userId}`)
    const carts = response.data;

    for (const cart of carts) {
        Cart.createCart(cart.id)
        const cartBodyEl = document.querySelector(`#cart${cart.id} .cartBody`);
        const cartTotalEl = document.querySelector(`#cart${cart.id} .cartTotal`);
        const cartTotal =  await Cart.getCartTotal(cart.products);
        Cart.displayCartTotal(cartTotal, cartTotalEl);

        for (const product of cart.products){
            const productRaw = await axios(`https://fakestoreapi.com/products/${product.productId}`);
            const productInfo = productRaw.data;
            const cartItem = CartItem.createCartItem(productInfo, product.quantity);
            cartBodyEl.appendChild(cartItem);
        }

    }
}