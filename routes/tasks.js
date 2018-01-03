const router = require('express').Router();
const bodyParser = require('body-parser');

module.exports = (server) => {
    router.get('/',
        server.controllers.tasks.list
    );

    router.post('/',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(['title', 'dueDate']),
        server.controllers.tasks.create);

    router.delete('/:id',
        server.controllers.tasks.remove);

    router.put('/:id',
        server.middlewares.bodyParser.json(),
        server.controllers.tasks.update);

    router.post('/', function(req, res){
        res.body('test'),
        console.log('task');
    });

    return router;
};