
var mongoose = require('mongoose'),
    userSchema = require('./user.schema'),
    userModel = mongoose.model('UserModel', userSchema);

userModel.findUserByCredentials = findUserByCredentials;

/**
 * Exports
 */
module.exports = userModel;

function findUserByCredentials(username, password) {

    return userModel.findOne({username: username, password: password})
        .then(
            function (user) {

                if (user) {
                    return user;
                }
                return null;
            }
        );
}
