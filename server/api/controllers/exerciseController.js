'use strict';
var mongoose = require('mongoose'),
    Excercise = mongoose.model('Excercises');


exports.createExcercise = function (req, res) {
    var new_excercise = new Excercise(req.body);
    new_excercise.save(function (err, Excercise) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).json(Excercise);
        }
    });
};

exports.getExcerciseByUserId = function (req, res) {
    Excercise.find({ userId: req.params.userId }, function (err, Excercise) {
        if (err) {
            res.status(404).send({
                error: {
                    errors: [{
                        domain: 'global', reason: 'notFound', message: 'Not Found',
                        description: 'Couldn\'t find comments for the requested resource \'' + req.params.UserId + '\''
                    }], err, code: 404
                }
            })
        } else {
            res.json(Excercise);
        }
    });
};