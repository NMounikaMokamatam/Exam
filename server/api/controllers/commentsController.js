'use strict';
var mongoose = require('mongoose'),
    Comment = mongoose.model('Comments');


exports.createComment = function (req, res) {
    var new_comment = new Comment(req.body);
    new_comment.save(function (err, Comment) {
        if (err) {
            res.status(400).send(err);
        } else {
            res.status(201).json(Comment);
        }
    });
};

exports.getCommentByUserId = function (req, res) {
    Comment.find({ commentTo: req.params.userId }, function (err, Comment) {
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
            res.json(Comment);
        }
    });
};