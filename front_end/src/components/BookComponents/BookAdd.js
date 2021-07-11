import React, { useContext, useState } from 'react'
import { BookContext } from '../App'


export default function BookAdd() {
	const { authors, handleBookAdd } = useContext(BookContext)
	const [bookInformation, setBookInformation] = useState({})

	const handleChange = (changes) => {
		setBookInformation({ ...bookInformation, ...changes})
	}

	const handleBookNameAdd = (e) => {
		handleChange({name: e.target.value })
	}

	const handleBookAuthorAdd = (e) => {
		handleChange({ authorId: e.target.value })
	}

	const handleAdd = () => {
		const book = (!bookInformation.authorId) 
		? { ...bookInformation, authorId: authors[0]._id }
		: { ...bookInformation }

		handleBookAdd(book)
	}


	return (
		<>
			<h1 className="app__h1">Book Add</h1>


			<label htmlFor="bookName">Book Name</label>
			<input
				onChange={(e) => handleBookNameAdd(e)}
				type="text" 
				name="bookName"
				className="book-add__input"
			/>

			<br />

			<label htmlFor="authorSelect">Author Selection</label>
			<select 
				onChange={(e) => handleBookAuthorAdd(e)}
				name="authorSelect"
				className="book-add__input"
			>
				{authors.map(author => {
					return (
						<option 
							value={author._id}
							key={author._id}
						>
							{author.name}
						</option>
					)
				})}
			</select>

			<button
				className="btn book-add__btn"
				onClick={() => handleAdd()}
			>
				Add Book
			</button>
		</>
	)
}
