import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
	query{
		books{
			_id,
			name,
			author{
				_id,
				name
			}
		}
	}

`