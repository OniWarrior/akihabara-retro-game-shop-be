/*
 * Author : Stephen Aranda
 * file   : api-router.js
 * Desc   : Contains router that mounts all sub-routers.js
 */

const router = require('express').Router();

const authRouter = require('./auth/auth-router');

// TODO-add other routers when completed

// mount auth router
router.use('/auth', authRouter);

module.exports = router;