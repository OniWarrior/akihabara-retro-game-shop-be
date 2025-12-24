/*
 * Author : Stephen Aranda
 * file   : api-router.js
 * Desc   : Contains router that mounts all sub-routers.js
 */

const router = require('express').Router();

const authRouter = require('./auth/auth-router');

const productRouter = require('./product/product-router');

const customerRouter = require('./user/customer-router');

// TODO-add other routers when completed

// mount auth router
router.use('/auth', authRouter);

// mount product router
router.use('/product', productRouter);

// mount the customer router
router.use('/user', customerRouter);

module.exports = router;