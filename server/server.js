//Import all nedded modules
const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const cors = require('cors')
const {
	GraphQLSchema,
	GraphQLObjectType,
	GraphQLString,
	GraphQLList,
	GraphQLInt,
	GraphQLNonNull
} = require('graphql')

/**
 * Contains the application from express library
 */
const app = express()

//Use CORS to get rid off Allow-Cross-Origin
app.use(cors())

/**
 * This is placeholder data. Acts as a DB
 */
const authors = [
	{ id: 1, name: 'J. K. Rowling' },
	{ id: 2, name: 'J. R. R. Tolkien' },
	{ id: 3, name: 'Brent Weeks' }
]

/**
 * This is placeholder data. Acts as a DB
 */
const books = [
	{ id: 1, name: 'Harry Potter and the Chamber of Secrets', authorId: 1 },
	{ id: 2, name: 'Harry Potter and the Prisoner of Azkaban', authorId: 1 },
	{ id: 3, name: 'Harry Potter and the Goblet of Fire', authorId: 1 },
	{ id: 4, name: 'The Fellowship of the Ring', authorId: 2 },
	{ id: 5, name: 'The Two Towers', authorId: 2 },
	{ id: 6, name: 'The Return of the King', authorId: 2 },
	{ id: 7, name: 'The Way of Shadows', authorId: 3 },
	{ id: 8, name: 'Beyond the Shadows', authorId: 3 }
]


/**
 * BookType for book list
 * @type {GraphQLObjectType}
 */
const BookType = new GraphQLObjectType({
	name: 'Book',
	description: 'This represents a book written by an author',
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		name: { type: GraphQLNonNull(GraphQLString) },
		authorId: { type: GraphQLNonNull(GraphQLInt) },
		author: { 
			type: AuthorType,
			resolve: (book) => {
				return authors.find(author => author.id === book.authorId)
			}
		}

	})
})

/**
 * AuthorType for author list
 */
const AuthorType = new GraphQLObjectType({
	name: "author",
	description: 'A list of authors',
	fields: () => ({
		id: { type: GraphQLNonNull(GraphQLInt) },
		name: { type: GraphQLNonNull(GraphQLString) },
		books: { 
			type: new GraphQLList(BookType),
			resolve: (author) => {
				return books.filter(book => book.authorId === author.id)
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
				id: { type: GraphQLInt }
			},
			resolve: (parent, args) => books.find(book => book.id === args.id)
		},
		books: {
			type: new GraphQLList(BookType),
			description: 'List of books',
			resolve: () => books
		},
		author: {
			type: AuthorType,
			description: 'List of authors',
			args: {
				id: { type: GraphQLInt }
			},
			resolve: (parent, args) => authors.find(author => author.id === args.id)
		},
		authors: {
			type: new GraphQLList(AuthorType),
			description: 'List of authors',
			resolve: () => authors
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
				authorId: { type: GraphQLNonNull(GraphQLInt) }
			},
			resolve: (parent, args) => {
				const book = {
					id: books.length + 1,
					name: args.name,
					authorId: args.authorId
				}
				books.push(book)
				return book
			}
		},
		addAuthor: {
			type: AuthorType,
			description: 'Add an author',
			args: {
				name: { type: GraphQLNonNull(GraphQLString) }
			},
			resolve: (parent, args) => {
				const author = {
					id: authors.length + 1,
					name: args.name
				}
				authors.push(author)
				return author
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
 */

const schema = new GraphQLSchema({
	query: RootQueryType,
	mutation: RootMutationType
})

/**
 * Apply graphql to 'graphql route
 */
app.use('/graphql', expressGraphQL({
	schema: schema,
	graphiql: true
}))

//Start the server on port 5000
app.listen(5000, () => console.log('Server Running on port 5000'))