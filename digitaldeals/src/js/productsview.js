/**
 * get HTML for products section
 * @param {Product[]} products
 * @return {string}
 */

const imagePath = "images/";

const renderProductsSection = (products) => {
    const renderProducts = (result, product) => {
        return result + renderProduct(product);
    };
    const productsHTML = products.reduce(renderProducts, "");

    return `<h2>Neue Produkte</h2>
    <p>Neue Handys moderen in diese Jahr</p>
    <div class="pro-container">
        ${productsHTML}
    </div>
    `;
};

/**
 * get HTML product tile
 * @param {Product} product
 * @return {string}
 */
const renderProduct = (product) => {
    const storageGB = product.storage / (1024 * 1024 * 1024);
    return `<div class="pro">
    <img
      src="${imagePath}${product.image}"
      alt="" />
    <div class="des">
      <h4>${product.name}</h4>
      <p class="storge">${storageGB} GB </p>
      <div>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
        <i class="fas fa-star"></i>
      </div>
      <p class="price">${product.price} €</p>
    </div>
    <button 
    data-action="add-to-cart-btn"
    data-id="${product.id}"
    class="fa fa-shopping-cart cart">
    </button>
  </div>`;
};

export { renderProductsSection, renderProduct };
