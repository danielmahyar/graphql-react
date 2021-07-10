/**
 * Importing all needed modules:
 * - GraphQL
 * - MongoDB functions for querying
 */
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLNonNull
} = require('graphql')
const { 
	getAuthors,
	saveAuthor,
	getBooks,
	saveBook
} = require('../MongoDB/MongoQueries')


/**
 * IMPORTANT:
 * 
 * These variables hold information from database (cache):
 * - books
 * - authors
 * 
 * There are functions: updateBooks and updateAuthors,
 * that receives all the information when called and updates
 * the variables values
 */

/** 
 * Defintion of Book: 
 * @typedef Book
 * @property {string} _id - The id of the book
 * @property {string} name - The name of the book
 * @property {string} authorId - The id of the author of the book
 * @property {Author} author - The authors information
 * 
 */

/**
 * Defintion of Author: 
 * @typedef Author
 * @property {string} _id - The id of the author
 * @property {string} name - The name of the author
 * @property {Book[]} books - An array of book objects owned by the author
 */

/**
 * Books from database stored as array
 * @type {Book[]}
 */
let books = getBooks().then(books => books)

/**
 * Authors from database stored as array
 * @type {Author[]}
 */
let authors = getAuthors().then(authors => authors)

/**
 * Updates global value books, which contains database information
 * Only use when modifying database information
 * @returns {Book[]}
 */
const updateBooks = () => {
	//Set books equal to the DB info
	books = getBooks().then(books => books)
}

/**
 * Updates global value authors, which contains database information.
 * Only use when modifying database information
 * @returns {Author[]}
 */
const updateAuthors = () => {
	//Set authors equal to the DB info
	authors = getAuthors().then(authors => authors)
}

/**
 * BookType for book list
 * @type {GraphQLObjectType}
 */
const BookType = new GraphQLObjectType({
	name: 'Book',
	description: 'This represents a book written by an author',
	fields: () => ({
		_id: { type: GraphQLNonNull(GraphQLString) },
		name: { type: GraphQLNonNull(GraphQLString) },
		authorId: { type: GraphQLNonNull(GraphQLString) },
		author: { 
			type: AuthorType,
			resolve: (book) => {
				return authors.then(authorsFetched => {
					let author = authorsFetched.find(author => author._id.toString() === book.authorId)
					return { ...author._doc, _id: author._id.toString() }
				})

			}
		}

	})
})

/**
 * AuthorType for author list
 * @type {GraphQLObjectType}
 */
const AuthorType = new GraphQLObjectType({
	name: "author",
	description: 'A list of authors',
	fields: () => ({
		_id: { type: GraphQLNonNull(GraphQLString) },
		name: { type: GraphQLNonNull(GraphQLString) },
		books: { 
			type: new GraphQLList(BookType),
			resolve: (author) => {
				return books.then(books => {
					const authorsBooks = books.filter(book => book.authorId === author._id.toString())
					authorsBooks.map(book => {
						return { ...book._doc, _id: book._id.toString() }
					})

					return authorsBooks
				})
			}
		}
	})
})

/**
 * The main queries for graphql
 */
const RootQueryType = new GraphQLObjectType({
	name: 'Query',
	description: 'Root Query',
	fields: () => ({
		book: {
			type: BookType,
			description: 'One book',
			args: {
				id: { type: GraphQLString }
			},
			resolve: (parent, args) => {
				return books.then((books => {
					const book = books.find(book => book._id.toString() === args.id)
					return { ...book._doc, _id: book._id.toString() }
				}))
			}
		},
		books: {
			type: new GraphQLList(BookType),
			description: 'List of books',
			resolve: () => {
				return getBooks().then(books => books)
			}
		},
		author: {
			type: AuthorType,
			description: 'List of authors',
			args: {
				id: { type: GraphQLString }
			},
			resolve: (parent, args) => {
				return authors.then(authors => {
					const author = authors.find(author => author._id.toString() === args.id)
					return { ...author._doc, _id: author._id.toString() }
				})
			}
		},
		authors: {
			type: new GraphQLList(AuthorType),
			description: 'List of authors',
			resolve: () => getAuthors().then(authors => authors)
		}
	})
})

/**
 * The main mutation for graphql
 */
const RootMutationType = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Root mutation',
	fields: () => ({
		addBook: {
			type: BookType,
			description: 'Add a book',
			args: {
				name: { type: GraphQLNonNull(GraphQLString) },
				authorId: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				return saveBook(args.name, args.authorId)
				.then(newBook => {
					updateBooks()
					return { ...newBook._doc, _id: newBook._id.toString()}
				})
			}
		},
		addAuthor: {
			type: AuthorType,
			description: 'Add an author',
			args: {
				name: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				return saveAuthor(args.name).then(newAuthor => {
					updateAuthors()
					return { ...newAuthor._doc, _id: newAuthor._id.toString() }
				})
			}
		},
		addAuthorToBook: {
			type: BookType,
			description: 'Adding an author to a book',
			args: { 
				bookId: { type: GraphQLNonNull(GraphQLInt) },
				authorId: { type: GraphQLNonNull(GraphQLInt) }
			},
			resolve: (parent, args) => {
				const book = books.find(book => book.id === args.bookId)
				book.authorId = args.authorId
				return book
			}
		}
	})
})

/**
 * Applying queries and mutations to schema
 * Schema is exported into 'server.js'
 * @type {GraphQLSchema}
 */
 const schema = new GraphQLSchema({
	query: RootQueryType,
	mutation: RootMutationType
})

/**
 * Exporting the schema to 'server.js'
 */
module.exports = schema
