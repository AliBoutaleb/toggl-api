module.exports = (server) => {
    server.controllers = {
        users: require('./users')(server),
        tasks: require('./tasks')(server),
        auth: require('./auth')(server),
        projects: require('./projects')(server)
    };
};