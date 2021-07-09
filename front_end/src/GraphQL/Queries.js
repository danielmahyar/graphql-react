import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
	query{
		books{
			id,
			name,
			authorId
		},
		authors{
			id,
			name
		}
	}

`