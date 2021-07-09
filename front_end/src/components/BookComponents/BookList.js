import React from 'react';

import Book from './Book'

const BookList = ({ books, authors }) => {

	//JSX return
	return (
		<table className="book-list__table">
			<thead>
				<tr>
					<td className="book-list__th">ID</td>
					<td className="book-list__th">Name</td>
					<td className="book-list__th">Authors</td>
					<td className="book-list__th"></td>
				</tr>
			</thead>
			<tbody>
				{/* Maps all the books into 4*td elements */}
				{books.map((book, index) => {
					//Index incremented to display order
					const displayId = index + 1

					//Find the author of the book
					const author = authors.find(author => book.authorId === author.id)

					//Assign index as display ID for react app
					const bookInfo = { ...book, displayId }
					//Return the book and author to Book component
					return (
						<Book 
							book={bookInfo}
							key={book.id}
							author={author}
						/>
					);
				})}
			</tbody>
		</table>
	);
}

export default BookList;
