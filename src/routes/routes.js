const { deleteBook, editBook, getBookId, getBook, addBook } = require('../controller/cBooks')

/* eslint-disable indent */
const routes = [
    {
        method: 'POST',
        path: '/books',
        handler: addBook
    },
    {
        method: 'GET',
        path: '/books',
        handler: getBook
    },
    {
        method: 'GET',
        path: '/books/{id}',
        handler: getBookId
    },
    {
        method: 'PUT',
        path: '/books/{id}',
        handler: editBook
    },
    {
        method: 'DELETE',
        path: '/books/{id}',
        handler: deleteBook
    }

]

module.exports = routes
