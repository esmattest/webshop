import { cart } from "./cart.js";
import { products } from "./products.js";
import { vouchers } from "./vourchers.js";
import { renderCheckoutProducts } from "./checkout.js";

const imagePath = "images/";
const cartSection = document.querySelector(".viewcart tbody");

const renderCartItem = () => {
    cartSection.innerHTML = "";

    let totalPrice = 0;

    const cartItemHTML = cart.map((cartEntry) => {
        const cartProduct = products.find(
            (product) => product.id === cartEntry.productId
        );

        if (cartProduct) {
            const zwischensumme = cartEntry.qty * cartProduct.price;
            totalPrice += zwischensumme;
            return `
                <tr>
                    <td class="">
                         <i class="far fa-times-circle" data-id="${
                             cartProduct.id
                         }"></i>
                    </td>
                    <td><img src="${imagePath}${
                cartProduct.image
            }" alt="" /></td>
                    <td>${cartProduct.name}</td>
                    <td>${cartProduct.price}€</td>
                    <td class="qty">
                        <div class="qty-controls" data-id="${
                            cartEntry.productId
                        }">
                        <span class="desincrement" data-id="${
                            cartEntry.productId
                        }">-</span>
                        <strong class="item_qty">${cartEntry.qty}</strong>
                        <span class="increment" data-id="${
                            cartEntry.productId
                        }">+</span>
                        </div>
                    </td>
                    <td>${zwischensumme.toFixed(2)}€</td>
                </tr>`;
        }

        return "";
    });

    cartSection.innerHTML = cartItemHTML.join("");

    renderTotal();
    renderCheckoutProducts();
};

const renderTotal = () => {
    let totalPrice = 0;

    cart.map((cartEntry) => {
        const cartProduct = products.find(
            (product) => product.id === cartEntry.productId
        );
        if (cartProduct) {
            const zwischensumme = cartEntry.qty * cartProduct.price;
            totalPrice += zwischensumme;
        }
    });

    const subtotalCell = document.getElementById("zwischensumme");
    const gesamt = document.getElementById("gesamtsumme");

    subtotalCell.textContent = `${totalPrice.toFixed(2)}€`;

    const appliedVouchers = vouchers.filter((voucher) => voucher.used === true);
    const totalDiscount = appliedVouchers.reduce(
        (sum, voucher) => sum + voucher.price,
        0
    );
    gesamt.textContent = `${(totalPrice - totalDiscount).toFixed(2)}€`;
};

export { renderCartItem, renderTotal };
