'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var excerciseSchema = new Schema({

    userId: {
        type: String,
    },
    excercise: {
        type: String
    },
    description: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Excercises', excerciseSchema);

