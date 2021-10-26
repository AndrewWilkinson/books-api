let books = []
let IdNumber = 0
const createError = require('http-errors')

let exampleBook =
{
    id: -1,
    title: "Untitled",
    author: "Unknown",
    available: 3,
    read: ["Andrew", "Bob"]
}
books.push(exampleBook);

exports.index = function (req, res) {
    res.send(books)
}

exports.create = function (req, res, next) {
    if (!req.body.title) {
        return (next(createError(400, "Title is requred")))
    }
    else if (!req.body.author) {
        return (next(createError(400, "Author is requred")))
    }
    books.push({ id: IdNumber, title: req.body.title, author: req.body.author, available: req.body.available = 0, read: [] })
    IdNumber++
    res.send({ result: true })
}

exports.show = function (req, res, next) {
    const foundBook = books.find((book) => book.id == req.params.id)
    if (!foundBook) {
        return (next(createError(404, "No book of that Id can be found")))
    }
    res.send(foundBook)
}

exports.deleteByID = function (req, res, next) {
    const foundBook = books.find((book) => book.id == req.params.id)
    if (!foundBook) {
        return (next(createError(404, "No book of that Id found")))
    }
    books = books.filter((book) => book.id != req.params.id)
    res.send(`${foundBook.id} deleted`)
}

exports.edit = function (req, res, next) {

    if (!req.body.name) {
        return (next(createError(400, "Title is requred")))
    }
    else if (!req.body.author) {
        return (next(createError(400, "Author is requred")))
    }

    const bookFound = books.find((book) => book.id == req.params.id)
    {
        if (!bookFound) {
            return (next(createError(404, "No book of that Id found")))
        }

        books = books.map((book) => {
            if (book.id == req.params.id) {
                book.title = req.body.title;
                book.author = req.body.author;
            }
            return book
        })
        res.send({ result: true })
    }
}

exports.checkout = function (req, res, next) {

    let bookFound = books.find((book) => book.id == req.params.id)
    {
        if (!bookFound) {
            return (next(createError(404, "No book of that Id found")))
        }

        if (bookFound.available) {
            bookFound.available--;

            books = books.map((book) => {
                if (book.id == req.params.id) 
                {
                title = bookFound.title;
                author = bookFound.author;
                available = bookFound.available;
                read = bookFound.read;               
                }
                return book;
            })             

            res.send(`One copy of ${bookFound.title} has been checked out`)
        }
        else {
            return (next(createError(404, "No copies of that book are available")))
        }

    }
}

exports.return = function (req, res, next) {

    let bookFound = books.find((book) => book.id == req.params.id)
    {
        if (!bookFound) {
            return (next(createError(404, "No book of that Id found")))
        }
        bookFound.available++;

        books = books.map((book) => {
            if (book.id == req.params.id) 
            {
            title = bookFound.title;
            author = bookFound.author;
            available = bookFound.available;
            read = bookFound.read;               
            }
            return book;
        })   

        res.send(`One copy of ${bookFound.title} has been returned`)
    }

}

exports.read = function (req, res, next) {

    if (!req.body.name) {
        return (next(createError(400, "A name is required")))
    }

    let bookFound = books.find((book) => book.id == req.params.id)
    {
        if (!bookFound) {
            return (next(createError(404, "No book of that Id found")))
        }

        console.log(req.body);

        bookFound.read.push(req.body.name) // adds a name to the list of readers on temp object
        
        books = books.map((book) => {
            if (book.id == req.params.id) 
            {
            title = bookFound.title;
            author = bookFound.author;
            available = bookFound.available;
            read = bookFound.read;               
            }
            return book;
        })   
        res.send(`${req.body.name} is now a proud reader of ${bookFound.title}`)
    }
}