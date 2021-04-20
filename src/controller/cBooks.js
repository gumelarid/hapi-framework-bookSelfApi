/* eslint-disable no-unreachable */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable indent */
const { nanoid } = require('nanoid')
const books = require('../model/mBooks')

// eslint-disable-next-line no-unused-vars
const addBook = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload

    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    if (name == '' || name == null) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku'
        })
        response.code(400)
        return response
    }

    if (pageCount < readPage) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(400)
        return response
    }

    const data = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished: pageCount === readPage,
        reading,
        createdAt,
        updatedAt
    }

    books.push(data)

    const isSuccess = books.filter((book) => book.id === id).length > 0

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id
            }
        })
        response.code(201)
        return response
    }
    const response = h.response({
        status: 'error',
        message: 'Catatan gagal ditambahkan'
    })
    response.code(500)
    return response
}

const getBook = (request, h) => {
    const { name, finished, reading } = request.query

    if (name) {
        // query name
        const book = books.filter((n) => n.name.toLowerCase() === name.toLowerCase())
        const response = h.response({
            status: 'success',
            data: {
                books: book
            }
        })

        response.code(200)
        return response
    } else if (finished == 1) {
        // query finished = true
        const book = books.filter((n) => n.finished == true)
        const response = h.response({
            status: 'success',
            data: {
                books: book
            }
        })

        response.code(200)
        return response
    } else if (finished == 0) {
        // query finished == false
        const book = books.filter((n) => n.finished == false)
        const response = h.response({
            status: 'success',
            data: {
                books: book
            }
        })

        response.code(200)
        return response
    } else if (reading == 1) {
        // query reading == true
        const book = books.filter((n) => n.reading == true)
        const response = h.response({
            status: 'success',
            data: {
                books: book
            }
        })

        response.code(200)
        return response
    } else if (reading == 0) {
        // query reading == false
        const book = books.filter((n) => n.reading == false)
        const response = h.response({
            status: 'success',
            data: {
                books: book
            }
        })

        response.code(200)
        return response
    } else {
        const response = h.response({
            status: 'success',
            data: {
                books: books
            }
        })

        response.code(200)
        return response
    }
}

const getBookId = (request, h) => {
    const { id } = request.params

    const book = books.filter((n) => n.id === id)[0]

    if (book == undefined) {
        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan'
        })

        response.code(401)
        return response
    }

    const response = h.response({
        status: 'success',
        data: {
            books: book
        }
    })

    response.code(200)
    return response
}

const editBook = (request, h) => {
    const { id } = request.params

    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
    const updatedAt = new Date().toISOString()

    const bookData = books.findIndex((book) => book.id === id)

    if (bookData == -1) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Id tidak ditemukan'
        })
        response.code(404)
        return response
    }

    if (name == '' || name == null) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku'
        })
        response.code(400)
        return response
    }

    if (pageCount < readPage) {
        const response = h.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
        })
        response.code(404)
        return response
    }

    books[bookData] = {
        ...books[bookData],
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        reading,
        updatedAt
    }

    const response = h.response({
        status: 'success',
        message: 'Buku berhasil diperbarui'
    })
    response.code(200)
    return response
}

const deleteBook = (request, h) => {
    const { id } = request.params

    const bookData = books.findIndex((book) => book.id === id)

    if (bookData == -1) {
        const response = h.response({
            status: 'fail',
            message: 'Buku gagal dihapus. Id tidak ditemukan'
        })
        response.code(404)
        return response
    }

    books.splice(bookData, 1)
    const response = h.response({
        status: 'success',
        message: 'Buku berhasil dihapus'
    })
    response.code(200)
    return response
}

module.exports = { addBook, getBook, getBookId, editBook, deleteBook }
