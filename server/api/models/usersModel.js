'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    age: {
        type: Number,
    },
    isAdmin: {
        type: Boolean
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Users', UserSchema);