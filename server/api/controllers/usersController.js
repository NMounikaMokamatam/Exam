'use strict';
var mongoose = require('mongoose'),
    User = mongoose.model('Users');

exports.getAllUsers = function (req, res) {
    User.find({}, function (err, User) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json(User);
        }
    });
};

// Create a new User
exports.createUser = function (req, res) {
    var new_user = new User(req.body);
    new_user.save(function (err, User) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).json(User);
        }
    });
};

// Retrieve a User by UserId
exports.getUserById = function (req, res) {
    User.findById(req.params.userId, function (err, User) {
        if (err) {
            res.status(404).send({
                error: {
                    errors: [{
                        domain: 'global', reason: 'notFound', message: 'Not Found',
                        description: 'Couldn\'t find the requested UserId \'' + req.params.UserId + '\''
                    }], err, code: 404
                }
            })
        } else {
            res.json(User);
        }
    });
};
//getUserByEmail
exports.getUserByEmail = function (req, res) {
    User.findOne({email:req.body.email, password: req.body.password}, function (err, User) {
        if (err) {
            res.status(404).send({
                error: {
                    errors: [{
                        domain: 'global', reason: 'notFound', message: 'Not Found',
                        description: 'Couldn\'t find the requested user \'' + req.params.UserId + '\''
                    }], err, code: 404
                }
            })
        } else {
            res.json(User);
        }
    });
};

// Edit a User by UserId
exports.editUserById = function (req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, req.body, { new: true }, function (err, User) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.json(User);
        }
    });
};

// Delete a User by UserId
exports.deleteUserById = function (req, res) {
    User.remove({
        _id: req.params.userId
    }, function (err, User) {
        if (err) {
            res.status(404).send({
                error: {
                    errors: [{
                        domain: 'global', reason: 'notFound', message: 'Not Found',
                        description: 'Couldn\'t find the requested UserId \'' + req.params.UserId + '\''
                    }], code: 404, message: 'Not Found'
                }
            })
        } else {
            res.status(204).send();
        }
    });
};