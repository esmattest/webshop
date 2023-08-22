/**
 * @typedef {Object} vouchers
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} used
 *
 */

/**
 * @type {vouchers[]}
 */

const vouchers = [
    {
        id: "code20",
        name: "20€ Geschenck",
        price: 20,
        used: "",
    },
    {
        id: "code50",
        name: "50€ Geschenck",
        price: 50,
        used: "",
    },
    {
        id: "code80",
        name: "80€ Geschenck",
        price: 80,
        used: "",
    },
];

export { vouchers };
