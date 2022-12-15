'use strict';
var usersList = require('../controllers/usersController');
var commentsList = require('../controllers/commentsController')
var excercisesList = require('../controllers/exerciseController')
var excercisesTitle = require('../controllers/exerciseTitleController')


module.exports = function (app) {
    app.route('/api/users')
        .get(usersList.getAllUsers)
        .post(usersList.createUser);

    app.route('/api/users/auth')
       .post(usersList.getUserByEmail)

    app.route('/api/users/:userId')
        .get(usersList.getUserById)
        .put(usersList.editUserById)
        .delete(usersList.deleteUserById);

    app.route('/api/comments')
        .post(commentsList.createComment);

    app.route('/api/comments/:userId')
        .get(commentsList.getCommentByUserId)

    app.route('/api/excercises')
        .post(excercisesList.createExcercise);

    app.route('/api/excercises/:userId')
        .get(excercisesList.getExcerciseByUserId)

    app.route('/api/getmatchingexercises')
        .post(excercisesTitle.getMatchingExerciseTitle)

    app.route('/api/matchingexercises')
        .post(excercisesTitle.createExcerciseTitle)
};