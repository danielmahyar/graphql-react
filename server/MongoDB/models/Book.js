const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
	name: String,
	authorId: String
})

module.exports = mongoose.model('Book', BookSchema)