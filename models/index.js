const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/toggl', { useMongoClient: true });
mongoose.plugin(schema => { schema.options.usePushEach = true });

module.exports = (server) => {
    server.models = {
        User: require('./User'),
        Task: require('./Task'),
        Project: require('./Project')
    };
};