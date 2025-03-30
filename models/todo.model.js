const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    taskName: {type: String, required: true, max: 100},
    done: Boolean,
    deleted: Boolean
});

module.exports = mongoose.model('todoModel', todoSchema);