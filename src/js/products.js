/**
 * @typedef {Object} Product
 * @property {number} id unique id
 * @property {string} name
 * @property {number} price
 * @property {string} image
 * @property {number} storage
 */

/**
 * @type {Product[]}
 */
const products = [
    {
        id: 1,
        name: "Iphone 14 pro Max",
        price: 1319,
        image: "handy.webp",
        storage: 128 * 1024 * 1024 * 1024,
    },
    {
        id: 2,
        name: "Iphone 14 pro",
        price: 1179,
        image: "iphone14pro.webp",
        storage: 128 * 1024 * 1024 * 1024,
    },
    {
        id: 3,
        name: "Iphone 14",
        price: 850,
        image: "iphone14.webp",
        storage: 128 * 1024 * 1024 * 1024,
    },
    {
        id: 4,
        name: "Iphone 14 Mini",
        price: 700,
        image: "iphone14mini.webp",
        storage: 128 * 1024 * 1024 * 1024,
    },
    {
        id: 5,
        name: "Iphone 13 pro Max",
        price: 1212,
        image: "13promax.webp",
        storage: 128 * 1024 * 1024 * 1024,
    },
    {
        id: 6,
        name: "Iphone 13 pro",
        price: 1010,
        image: "iphone13pro.webp",
        storage: 128 * 1024 * 1024 * 1024,
    },
    {
        id: 7,
        name: "Iphone 13",
        price: 900,
        image: "iphone13.webp",
        storage: 128 * 1024 * 1024 * 1024,
    },
    {
        id: 8,
        name: "Iphone 13 Mini",
        price: 600,
        image: "13mini.webp",
        storage: 128 * 1024 * 1024 * 1024,
    },
];

export { products };
