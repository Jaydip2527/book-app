const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    authors: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
    },
},
{
    tableName: 'book',
    timestamps: { createdAt: true, updatedAt: true }
});

const book = mongoose.model('book', bookSchema);
module.exports = book;