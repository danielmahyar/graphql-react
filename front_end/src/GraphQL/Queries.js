import { gql } from '@apollo/client'

export const GET_ALL_BOOKS_AND_AUTHORS = gql`
	query{
		books{
			_id,
			name,
			author{
				_id,
				name
			}
		},
		authors{
			_id,
			name
		}
	}

`