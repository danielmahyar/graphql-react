import React from 'react'

//All book list components
import BookList from './BookList'
import BookAdd from './BookAdd'


export default function BookMain() {
	return (
		<>
			{/* Books list from db*/}
			<BookList />

			<hr className="section-divider"/>
			
			{/* Adding a book component */}
			<BookAdd />
		</>
	)
}
