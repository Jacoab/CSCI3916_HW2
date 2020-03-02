/**
 * Created by shawnmccarthy on 1/22/17.
 */
'use strict;';
//Include crypto to generate the movie id
var crypto = require('crypto');
module.exports = function () {
    return {
        userList: [],
        /*
         * Save the user inside the "db".
         */
        save: function (user) {
            user.id = crypto.randomBytes(20).toString('hex'); // fast enough for our purpose
            this.userList.push(user);
            return 1;
        },
        /*
         * Retrieve a movie with a given id or return all the movies if the id is undefined.
         */
        find: function (movie) {
            if (id) {
                return this.userList.find(function (element) {
                    return element.movie === movie;
                });
            }
            else {
                return this.userList;
            }
        },
        findOne: function (name) {
            if (name) {
                return this.userList.find(function (element) {
                    return element.username === name;
                });
            }
            else {
                return this.userList;
            }
        },
        /*
         * Delete a movie with the given id.
         */
        remove: function (movie) {
            var found = 0;
            this.userList = this.userList.filter(function (element) {
                if (element.movie === movie) {
                    found = 1;
                }
                else {
                    return element.movie !== movie;
                }
            });
            return found;
        },
        /*
         * Update a movie with the given id
         */
        update: function (movie, user) {
            var userIndex = this.userList.findIndex(function (element) {
                return element.movie === movie;
            });
            if (userIndex !== -1) {
                this.userList[userIndex].username = user.username;
                this.userList[userIndex].password = user.password;
                return 1;
            }
            else {
                return 0;
            }
        }
    };
};