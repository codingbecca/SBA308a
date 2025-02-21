import * as CartItem from "./cartItem.js";
import * as Cart from "./cart.js";

const userSelect = document.getElementById("userSelect");

// IIFE to load the users with carts
(async function loadAvailableUsers() {
  try {
    const carts = await axios("https://fakestoreapi.com/carts");

    //storing the users with carts in a set to manage duplicates
    const users = new Set();
    carts.data.forEach((cart) => users.add(cart.userId));
    
    users.forEach((user) => {
      const option = document.createElement("option");
      option.setAttribute("value", user);
      option.textContent = `User ${user}`;
      userSelect.appendChild(option);
    });

    //call handleSelectUser with an artificial event object to trigger display of the first user's carts
    handleSelectUser({ target: { value: 1 } });
  } catch (e) {
    console.error(e);
  }
})();

userSelect.addEventListener("change", handleSelectUser);

//a function that will fetch and display the user's carts when the user is selected
async function handleSelectUser(e) {
  try {
    const userId = e.target.value;
    Cart.clearCarts();

    const response = await axios(
      `https://fakestoreapi.com/carts/user/${userId}`
    );
    const carts = response.data;

    for (const cart of carts) {
      Cart.createCart(cart.id);
      const cartBodyEl = document.querySelector(`#cart${cart.id} .cartBody`);

      const cartTotalEl = document.querySelector(`#cart${cart.id} .cartTotal`);
      const cartTotal = await Cart.getCartTotal(cart.products);
      Cart.displayCartTotal(cartTotal, cartTotalEl);

      const deleteCartBtn = document.querySelector(
        `#cart${cart.id} .deleteBtn`
      );
      deleteCartBtn.addEventListener("click", handleDeleteCart);

      for (const product of cart.products) {
        const productRaw = await axios(
          `https://fakestoreapi.com/products/${product.productId}`
        );
        const productInfo = productRaw.data;
        
        const cartItem = CartItem.createCartItem(productInfo, product.quantity);
        cartBodyEl.appendChild(cartItem);
      }
    }
  } catch (error) {
    console.error(error);
  }
}

//a function that will delete a specific cart when the delete button is clicked
async function handleDeleteCart(e) {
  try {
    const response = await axios.delete(
      `https://fakestoreapi.com/carts/${e.target.id}`
    );
    if (response.data) {
      Cart.deleteSingleCart(e.target.id);
    }
  } catch (error) {
    console.error(error);
  }
}
