const sha1 = require('sha1');
const jwt = require('jsonwebtoken');

module.exports = (server) => {
    const User = server.models.User;

    return {
        login,
        getUserByEmail
    };

    function getUserByEmail(req, res, next) {
        const email = req.body.email;

        findUser()
            .then(ensureOne)
            .then(send)
            .catch(err => res.status(err.code || 500).send(err.reason || err));

        function findUser() {
            return User.findOne()
                .select()
                .where({email: email})
                .exec()
        }

        function ensureOne(user) {
            return user ? user : Promise.reject({code: 404, reason: 'user.not.found'})
        }

        function send(user) {
            res.send(user);
        }
    }

    function login(req, res, next) {
        const email = req.body.email;
        const password = sha1(req.body.password);

        findUser()
            .then(ensureOne)
            .then(createToken)
            .then(send)
            .catch(err => res.status(err.code || 500).send(err.reason || err));


        function findUser() {
            return User.findOne()
                .select('+password')
                .where({email: email, password: password})
                .exec()
        }

        function ensureOne(user) {
            return user ? user : Promise.reject({code: 404, reason: 'user.not.found'})
        }

        function createToken(user) {
            const token = {
                userId: user._id.toString()
            };

            return new Promise((resolve, reject) => {
                jwt.sign(token, server.config.salt, {expiresIn: 60 * 60}, (err, encryptedToken) => {
                    if (err)
                        return reject(err);

                    resolve(encryptedToken);
                });
            });
        }

        function send(encryptedToken) {
            res.send(encryptedToken);
        }
    }
};