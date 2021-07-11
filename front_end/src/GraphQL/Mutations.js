import { gql } from '@apollo/client'

export const DELETE_BOOK = gql`
	mutation deleteBook($bookId: String!){
		deleteBook(bookId: $bookId)	
	}
`

export const ADD_BOOK = gql`
	mutation addBook($name: String!, $authorId: String!){
		addBook(name: $name, authorId: $authorId){
			_id
		}
	}
`