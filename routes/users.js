const router = require('express').Router();

module.exports = (server) => {

    // List all users
    // router.get('/',
    //     server.middlewares.ensureAuthenticated,
    //     server.controllers.users.list);

    // Get user by id
    router.get('/:id',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureAuthenticated,
        server.controllers.users.getUserByID);

    // Get user by token
    router.get('/',
        server.middlewares.ensureAuthenticated,
        server.controllers.users.getUserByToken);

    router.post('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(['email', 'password']),
        server.controllers.users.create);

    router.delete('/:id',
        server.controllers.users.remove);

    router.put('/:id',
        server.middlewares.bodyParser.json(),
        server.controllers.users.update);

    return router;
};