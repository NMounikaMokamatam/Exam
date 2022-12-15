'use strict';
var mongoose = require('mongoose'),
    ExcerciseTitle = mongoose.model('ExcerciseTitle');

exports.createExcerciseTitle = function (req, res) {
    var new_exercise = new ExcerciseTitle(req.body);
    new_exercise.save(function (err, Excercise) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).json(Excercise);
        }
    });
};


exports.getMatchingExerciseTitle = function (req, res) {
    ExcerciseTitle.find({ title: { $regex: req.body.value } }, function (err, Excercise) {
        if (!err) {
            res.json(Excercise);
        } else {
            res.json([]);
        }
    });
};