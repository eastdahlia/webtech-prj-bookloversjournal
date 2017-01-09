var models = require('../models');
var express = require('express');
var router = express.Router();

var Book = models.Book;

router.post('/books', function(request, response) {
    Book.create(request.body).then(function() {
        response.status(201).send;
    }).catch(function(err) {
        console.warn(err);
    })
});

router.get('/books', function(request, response) {
    /*global Book*/
    Book.findAll().then(function(books) {
        response.status(200).send(books);
    });
});

// returns one book by book_id
router.get('/books/:book_id', function(request, response) {
    Book.findById(request.params.book_id).then(function(book) {
        if (book) {
            response.status(200).send(book);
        }
        else {
            response.status(404).send();
        }
    });
});

// update a specific book by book_id
router.put('/books/:book_id', function(request, response) {
    Book
        .findById(request.params.book_id)
        .then(function(book) {
            if (book) {
                book
                    .updateAttributes(request.body)
                    .then(function() {
                        response.status(202).send('updated');
                    })
                    .catch(function(error) {
                        console.warn(error);
                        response.status(400).send('server error');
                    });
            }
            else {
                response.status(404).send();
            }
        });
});

// delete an book by book_id
router.delete('/books/:book_id', function(req, res) {
    Book
        .findById(req.params.book_id)
        .then(function(book) {
            if (book) {
                book
                    .destroy()
                    .then(function() {
                        res.status(204).send();
                    })
                    .catch(function(error) {
                        console.warn(error);
                        res.status(400).send('server error');
                    });
            }
            else {
                res.status(404).send();
            }
        });
});

module.exports = router;
