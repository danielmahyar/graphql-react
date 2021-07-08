import React, { useContext } from 'react'
import { BookContext } from '../App'

/**
	 * @typedef {object} bookInformation
	 * @property {number} id - book id
	 * @property {string} name - book name
	 * @property {number} authorId - book author id
*/


const Book = (bookInformation) => {

	/** 
	 * Deconstructing book information
	 * @type {bookInformation} 
	*/
	const {
		id,
		name,
		authorId
	} = bookInformation

	/**
	 * Import the UI remove function from App.js
	 * @type {UIFunctions} 
	 * @returns {void} - Updates books array by removing book information
	 */
	const { handleBookRemove } = useContext(BookContext)

	return (
		<tr>
			<td className="book-list__th">{id}</td>
			<td className="book-list__th">{name}</td>
			<td className="book-list__th">{authorId}</td>
			<td className="book-list__th">
				{/* Input detection */}
				<button
					className="btn btn--primary"
					onClick={() => handleBookRemove(id)}
				>
				 	Delete
				</button>
			</td>
		</tr>
	);
}

export default Book;
