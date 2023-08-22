import { renderProductsSection } from "./productsview.js";
import { cart } from "./cart.js";
import { products } from "./products.js";
import {
    renderItems,
    addToCartHandler,
    removeCartItem,
    increaseQty,
    desincreaseQty,
} from "./cartview.js";
import { renderCartItem, renderTotal } from "./cartoverview.js";
import { vouchers } from "./vourchers.js";

const allowedRoutes = [
    "home",
    "categories",
    "products",
    "product",
    "contact",
    "sidecart",
    "cart",
    "checkout",
    "message",
];

const handleLocation = () => {
    let hash = window.location.hash.slice(1);

    if (hash === "") {
        hash = allowedRoutes[0];
    }

    if (!allowedRoutes.includes(hash)) {
        console.warn(`Unknown route: ${hash}`);
        return;
    }

    document.querySelectorAll("section").forEach((section) => {
        if (section.id !== hash) {
            section.style.display = "none";
        } else {
            if (hash === "products") {
                section.innerHTML = renderProductsSection(products);
            }
            section.style.display = "";
        }
    });
};

handleLocation();
window.addEventListener("hashchange", handleLocation);

const toggleButton = document.querySelector(".toggle-button");
const listContainer = document.querySelector(".list-container");

toggleButton.addEventListener("click", () => {
    listContainer.classList.toggle("active");
});

const mainImg = document.getElementById("main-Img");
const smallImagesGroup = document.querySelector(".small-img-group");

smallImagesGroup.onclick = function (event) {
    const target = event.target;

    if (target.tagName !== "IMG") {
        return;
    }

    mainImg.src = event.target.src;
};

const subtotalCell = document.getElementById("zwischensumme");
const coupon = document.getElementById("gutschein");
const gesamt = document.getElementById("gesamtsumme");
const coupanButton = document.getElementById("coupan-button");
const coupanInput = document.getElementById("coupon-input");

window.addEventListener("click", (event) => {
    const target = event.target;

    if (
        target.tagName === "BUTTON" &&
        target.getAttribute("data-action") === "add-to-cart-btn"
    ) {
        const productId = target.getAttribute("data-id");

        addToCartHandler({
            productId: Number(productId),
            qty: 1,
        });
    } else if (
        target.classList.contains("increment") ||
        target.classList.contains("desincrement")
    ) {
        const productId = target.getAttribute("data-id");

        if (target.classList.contains("increment")) {
            increaseQty(productId);
        } else if (target.classList.contains("desincrement")) {
            desincreaseQty(productId);
        }
    } else if (
        target.classList.contains("far") &&
        target.classList.contains("fa-times-circle")
    ) {
        const productId = target.getAttribute("data-id");
        removeCartItem(productId);
    } else if (target.getAttribute("data-action") === "apply-coupon") {
        const coupanCode = coupanInput.value;

        const filterCoupan = vouchers.find((item) => item.id === coupanCode);

        if (filterCoupan) {
            if (coupon.textContent !== filterCoupan.name) {
                coupon.textContent = filterCoupan.name;

                renderTotal(coupon);
            } else {
                alert("Gutschein wurde bereits verwendet.");
            }
        } else {
            alert("Ungültiger Gutscheincode.");
        }
    }

    renderItems();
    renderCartItem();
    renderTotal();
});

const openBtn = document.getElementById("open_cart_btn");
const sidecart = document.getElementById("sidecart");
const closeBtn = document.getElementById("close_btn");
const backdrop = document.querySelector(".backdrop");

openBtn.addEventListener("click", openCart);
closeBtn.addEventListener("click", closeCart);
backdrop.addEventListener("click", closeCart);

//open Cart
function openCart() {
    sidecart.classList.add("open");
    backdrop.classList.add("show");
}

//close Cart
function closeCart() {
    sidecart.classList.remove("open");
    backdrop.classList.remove("show");
}

const cartBtn = document.querySelector(".cartBtn");
cartBtn.addEventListener("click", () => {
    window.location.href = "#cart";

    closeCart();
});

const checkoutBtn = document.querySelector(".checkoutBtn");
checkoutBtn.addEventListener("click", () => {
    window.location.href = "#checkout";

    closeCart();
});
