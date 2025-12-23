/*
 * Author : Stephen Aranda
 * File   : customer-model.js
 * Desc   : queries that are utilized by the endpoints of customer-router.js
 */

const db = require('../data/dbConfig');

/*
 *   addOrder: adds an order of a customer into db using order obj
 */
const addOrder = async (order) => {
    const addedOrder = await db('orders')
        .insert(order)
        .returning('order_id')
    return addedOrder
}

module.exports = {
    addOrder
}