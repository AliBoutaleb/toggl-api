const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientSchema = Schema({
    libelle: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Client', ClientSchema);