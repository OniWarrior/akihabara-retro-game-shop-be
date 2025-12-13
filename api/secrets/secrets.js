/*
 * Author: Stephen Aranda
 * File  : secrets.js
 * Desc  : File that imports secrets from the file containing the environmental variables.
 * */

require('dotenv').config()

// import the secret for the session
const SESSION_SECRET = process.env.SESSION_SECRET || "shhh" // fallback for testing

module.exports = { SESSION_SECRET }