import React from 'react';

import Book from './Book'

const BookList = ({ books }) => {

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
				{books.map((book) => {
					console.log(book)
					return (
						<Book 
							{...book}
							key={book.id}
						/>
					);
				})}
			</tbody>
		</table>
	);
}

export default BookList;
