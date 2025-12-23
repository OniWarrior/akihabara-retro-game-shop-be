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

/*
 * retrieveOrders : retrieve all orders made by customer using user id
 */
const retrieveOrders = async (user_id) => {
    const orders = await db('orders')
        .select(
            'order_id',
            'product_name',
            'cost',
            'image_url',
            'quantity',
            'date'

        )
        .where('user_id', user_id)
    return orders
}

module.exports = {
    addOrder,
    retrieveOrders
}