import * as CartItem from "./cartItem.js";
import * as Cart from "./cart.js";

const userSelect = document.getElementById('userSelect');

const response = await axios('https://fakestoreapi.com/products/1')
console.log(response.data)

const newCartItem = CartItem.createCartItem(response.data, 2)
CartItem.appendCartItem(newCartItem)

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
})();


userSelect.addEventListener('change', handleSelectUser);

async function handleSelectUser(e) {
    const userId = e.target.value;

    
}