const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Boolean,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }],
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    }
});

module.exports = mongoose.model('Project', ProjectSchema);