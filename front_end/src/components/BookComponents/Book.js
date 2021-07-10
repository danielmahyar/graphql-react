import React, { useContext } from 'react'
import { BookContext } from '../App'

/**
	 * @typedef {object} bookInformation
	 * @property {number} id - book id
	 * @property {string} name - book name
	 * @property {number} authorId - book author id
*/


const Book = (props) => {

	/** 
	 * Deconstructing book information
	 * @type {bookInformation} 
	*/
	const {
		book
	} = props

	console.log(book)

	/**
	 * Import the UI remove function from App.js
	 * @type {UIFunctions} 
	 * @returns {void} - Updates books array by removing book information
	 */
	const { handleBookRemove } = useContext(BookContext)

	return (
		<tr>
			<td className="book-list__th">{book.displayId}</td>
			<td className="book-list__th">{book.name}</td>
			<td className="book-list__th">{book.author.name}</td>
			<td className="book-list__th">
				{/* Input detection */}
				<button
					className="btn btn--primary"
					onClick={() => handleBookRemove(book.id)}
				>
				 	Delete
				</button>
			</td>
		</tr>
	);
}

export default Book;
