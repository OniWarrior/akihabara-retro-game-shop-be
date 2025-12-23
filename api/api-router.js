/*
 * Author : Stephen Aranda
 * file   : api-router.js
 * Desc   : Contains router that mounts all sub-routers.js
 */

const router = require('express').Router();

const authRouter = require('./auth/auth-router');

const productRouter = require('./product/product-router');

// TODO-add other routers when completed

// mount auth router
router.use('/auth', authRouter);

// mount product router
router.use('/product', productRouter);

module.exports = router;