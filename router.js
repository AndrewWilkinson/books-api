const express = require('express')
const router = express.Router()
const books = require ('./booksController')

router.get('/books', books.index)
router.get('/book/:id', books.show)

router.post('/books', books.create)

router.put('/book/:id', books.edit)
router.put('/book/:id/checkout', books.checkout)  //reduce available books by 1 to >=0
router.put('/book/:id/return', books.return)      //increase available books by 1
router.put('/book/:id/read', books.read)          //adds a user to signifiy them as a reader

router.delete('/book/:id', books.deleteByID)

module.exports = router