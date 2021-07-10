//Import all nedded modules
const express = require('express')
const expressGraphQL = require('express-graphql').graphqlHTTP
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const schema = require('./GraphQL/Schema')

/**
 * Contains the application from express library
 */
const app = express()

//Use CORS to get rid off Allow-Cross-Origin
app.use(cors())

/**
 * Apply graphql to 'graphql route
 */
app.use('/graphql', expressGraphQL({
	schema: schema,
	graphiql: true
}))

/**
 * ONLY UNCOMMENT THIS PART IN PRODUCTION
 * 
 * Takes the build from react and serves it on server
 */
app.use(express.static('../front_end/build'))

/**
 * Connection to MongoDB server
 */
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
	console.log('Connected to DB');
});

/**
 * Start the server on port 5000
 */
app.listen(5000, () => console.log('Server Running on port http://localhost:5000'))