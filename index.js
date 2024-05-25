require('dotenv').config()

const PORT = process.env.PORT || 5000 // 5000 is fallback for testing.

const server = require('./api/server.js')

server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})