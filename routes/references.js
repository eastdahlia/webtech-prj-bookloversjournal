var models = require('../models');
var express = require('express');
var router = express.Router();

var Reference = models.Reference;

router.post('/references', function(request, response) {
    Reference.create(request.body).then(function() {
        response.status(201).send;
    }).catch(function(err) {
        console.warn(err);
    })
});

router.get('/references', function(request, response) {
    /*global Reference*/
    Reference.findAll().then(function(references) {
        response.status(200).send(references);
    });
});

router.get('/references/:BookBookId', function(request, response) {
        Reference.findAll({
        where:{
            BookBookId:request.params.BookBookId
        }
    }).then(function(references) {
        response.status(200).send(references);
    });
});

router.put('/references/:BookBookId', function(request, response) {
    Reference
        .findById(request.params.BookBookId)
        .then(function(reference) {
            if (reference) {
                reference
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

router.delete('/references/:BookBookId', function(req, res) {
    Reference
        .findById(req.params.BookBookId)
        .then(function(reference) {
            if (reference) {
                reference
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
