'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ExerciseTitleSchema = new Schema({
    title: {
        type: String,
    },

});

module.exports = mongoose.model('ExcerciseTitle', ExerciseTitleSchema);