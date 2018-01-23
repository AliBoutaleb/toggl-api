const bodyParser = require('body-parser');

module.exports = (server) => {
    const Task = server.models.Task;
    const User = server.models.User;

    return {
        list,
        getTaskByID,
        create,
        remove,
        update
    };

    function getTaskByID(req, res) {
        Task.findById(req.params.id)
            .then(task => res.send(task));
    }

    function list(req, res){
        return Task.find()
            .then(tasks => res.send(tasks));
    }

    function create(req, res) {
        Task.create(req.body)
            .then(addToUser)
            .then(task => res.status(201).send(task))
            .catch(error => res.status(500).send(error))

        function addToUser(task) {
            return User.findById(req.body.owner, function (err, user) {
                user.tasks.push(task._id)
                user.save(function(err) {});
            })
        }
    }

    function remove(req, res) {
        return Task.findByIdAndRemove(req.params.id)
            .then(() => res.status(204).send())
    }

    function update(req, res) {
        return Task.findByIdAndUpdate(req.params.id, req.body)
            .then(task => res.status(204).send());
    }
};