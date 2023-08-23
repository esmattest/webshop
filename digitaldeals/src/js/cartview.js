import { cart } from "./cart.js";
import { products } from "./products.js";
import { vouchers } from "./vourchers.js";
import { renderCheckoutProducts } from "./checkout.js";

const imagePath = "images/";
const cartItems = document.querySelector(".cart_items");
const renderItems = () => {
    const sidecardItems = cart.map((cartEntry) => {
        const cartProduct = products.find(
            (product) => product.id === cartEntry.productId
        );
        if (cartProduct === undefined) {
            return ``;
        }
        const storageGB = cartProduct.storage / (1024 * 1024 * 1024);
        return `   
          <div class="cart_item">
          <div class="remove_item" data-id="${cartProduct.id}" >
            <span>&times;</span>
          </div>
          <div class="item_img">
            <img src="${imagePath}${cartProduct.image}" alt="" />
          </div>
          <div class="item_details">
            <p>${cartProduct.name}</p>
            <span>${storageGB} GB</span>
            <strong>${cartProduct.price}€</strong>
            <div class="qty" data-id="${cartEntry.qty}">
              <span  class="desincrement" data-id="${cartEntry.productId}">-</span>
              <strong>${cartEntry.qty}</strong>
              <span  class="increment" data-id="${cartEntry.productId}">+</span>
            </div>
          </div>
        </div>`;
    });

    cartItems.innerHTML = sidecardItems.join("");

    let totalItems = 0;

    const itemPrices = cart.map((cartEntry) => {
        totalItems += cartEntry.qty;

        const cartProduct = products.find(
            (product) => product.id === cartEntry.productId
        );
        if (cartProduct) {
            return cartEntry.qty * cartProduct.price;
        }
        return 0;
    });

    document.getElementById("items_num").textContent = totalItems;
    const subtotal = itemPrices.reduce((add, price) => add + price, 0);

    const subtotalPrice = document.getElementById("subtotal_price");
    subtotalPrice.textContent = `${subtotal.toFixed(2) + "€"}`;

    const removeButtons = document.querySelectorAll(".remove_item");
    removeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const productId = button.getAttribute("data-id");
            removeCartItem(productId);
        });
    });
    renderCheckoutProducts();
};

const addToCartHandler = (cartEntry) => {
    const entry = cart.find((entry) => entry.productId === cartEntry.productId);
    if (entry !== undefined) {
        entry.qty++;
    } else {
        cart.push(cartEntry);
    }
    renderItems();
};

function removeCartItem(productId) {
    const removeitem = cart.findIndex(function (cartEntry) {
        return cartEntry.productId === Number(productId);
    });

    if (removeitem >= 0) {
        cart.splice(removeitem, 1);
        renderItems();

        if (cart.length === 0) {
            removeAllCoupons();
        }
    }
}

function removeAllCoupons() {
    vouchers.splice(0, vouchers.length);
    const gutscheinElement = document.getElementById("gutschein");
    gutscheinElement.innerHTML = "";
}

function increaseQty(productId) {
    const plus = cart.find(function (entry) {
        return entry.productId.toString() === productId.toString();
    });

    if (plus) {
        plus.qty++;
        renderItems();
    }
}

function desincreaseQty(productId) {
    const minus = cart.find(function (entry) {
        return entry.productId.toString() === productId.toString();
    });

    if (minus && minus.qty > 1) {
        minus.qty--;
        renderItems();
    } else if (minus && minus.qty <= 1) {
        const removeindex = cart.findIndex(function (cartEntry) {
            removeCartItem(productId);
        });

        if (removeindex >= 0) {
            cart.splice(removeindex, 1);
            renderItems();
        }
    }
}

export {
    renderItems,
    addToCartHandler,
    removeCartItem,
    increaseQty,
    desincreaseQty,
};
