import { cart } from "./cart.js";
import { renderTotal } from "./cartoverview.js";
import { products } from "./products.js";

const checkoutProducts = document.querySelector(".checkout-lists");
const imagePath = "images/";

const renderCheckoutProducts = () => {
    checkoutProducts.innerHTML = cart
        .map((cartEntry) => {
            const cartProduct = products.find(
                (product) => product.id === cartEntry.productId
            );
            if (cartProduct) {
                const storageGB = cartProduct.storage / (1024 * 1024 * 1024);
                return `
                <div class="card">
                <div class="card-image">
                    <img src="${imagePath}${cartProduct.image}" alt="${
                    cartProduct.name
                }" />
                </div>
                <div class="_details">
                    <div class="product-info">
                        <h4>${cartProduct.name}</h4>
                        <h5>${storageGB} GB</h5>
                        <div class="card-price">${cartProduct.price.toFixed(
                            2
                        )}€</div>
                        <br>
                        <strong class=productQty>produktanzahl: ${
                            cartEntry.qty
                        }</strong>
                    </div>
                    <br>
                </div>
            </div>`;
            }
            return "";
        })
        .join("");
    renderTotal();
    console.log("renderCheckoutProducts finished");
};

export { renderCheckoutProducts };
