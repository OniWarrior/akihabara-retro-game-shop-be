/*
 * Author : Stephen Aranda
 * File   : manager-router.js
 * Desc   : endpoints for the manager user type.
 */
const Manager = require('./manager-model');
const router = require('express').Router();

/*
 * add-product: endpoint that allows the manager to add a product
 */