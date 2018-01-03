const express = require('express');

module.exports = (server) => {
    const router = express.Router();

    router.post('/login',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(['email', 'password']),
        server.controllers.auth.login);

    router.post('/user',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(['email']),
        server.controllers.auth.getUserByEmail);

    return router;
};
