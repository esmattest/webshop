import { cart } from "./cart.js";
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
                        <img src="${imagePath}${cartProduct.image}" alt="${cartProduct.name}" />
                    </div>
                    <div class="item_details">
                        <h4>${cartProduct.name}</h4>
                        <h5>${storageGB} GB</h5>
                        <div class="card-price">${cartProduct.price}€</div>
                        <div class="qty">
                            <span class="desincrement" data-id="${cartEntry.productId}">-</span>
                            <strong>${cartEntry.qty}</strong>
                            <span class="increment" data-id="${cartEntry.productId}">+</span>
                        </div>
                    </div>
                </div>`;
            }
            return "";
        })
        .join("");
};

export { renderCheckoutProducts };
