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
        type: String,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'
    }]
});


module.exports = mongoose.model('Project', ProjectSchema);