
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var commentSchema = new Schema({

    commentTo: {
        type: String,
    },
    title: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Comments', commentSchema);