const { addNoteHandler } = require('../controller/handler')

/* eslint-disable indent */
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addNoteHandler
    }

]

module.exports = routes
