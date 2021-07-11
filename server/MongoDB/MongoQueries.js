/**
 * Import needed models for DB queries
 */

/**
 * Book 
 */
const mongoose = require('mongoose')
const Book = require('./models/Book')
const Author = require('./models/Author')

const getAuthors = async() => {
	try {
		let authors = await Author.find()
		console.log("getAuthors() have been summoned")
		return authors
	} catch (error) {
		
	}
}

const saveAuthor = async(name) => {
	const author = new Author({
		name
	})

	
	try {
		let newAuthor = await author.save()

		return newAuthor
	} catch (error) {
		
	}
}

const getBooks = async() => {
	try {
		let books = await Book.find()
		console.log("getBooks() have been summoned")
		return books
	} catch (error) {
		
	}
}

const saveBook = async(name, authorId) => {
	try {
		let book = new Book({
			name,
			authorId
		})

		let newBook = await book.save()
		console.log(newBook)

		return newBook

	} catch (error) {
		
	}
}

const deleteBook = async(id) => {
	const _id = mongoose.mongo.ObjectId(id)
	await Book.findByIdAndDelete(_id)
	return id
}

const deleteAuthor = async(id) => {
	const _id = mongoose.mongo.ObjectId(id)
	await Author.findByIdAndDelete(_id)
	console.log(_id)
	return id
}


const functionsExports = {
	getAuthors,
	saveAuthor,
	getBooks,
	saveBook,
	deleteBook,
	deleteAuthor
}

module.exports = functionsExports