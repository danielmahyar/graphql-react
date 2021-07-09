/**
 * Name: Book Shower application
 * Author: Daniel Cargar Mahyar
 * 
 * 
 */

//React imports
import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/client'

//Queries import
import { GET_BOOKS } from '../GraphQL/Queries'

//import main css file
import '../css/app.css'

//All book list components
import BookList from './BookComponents/BookList'


/**
 * Books array 
 * @type {Array<Object>}
 */
const sampleBooks = [
  {
    id: 1,
    name: "Placeholder text",
    authorId: 1
  }
]

export const BookContext = React.createContext()


/**
 * This is the main application function.
 * Created by react itself.
 * @returns {JSX} main application
 */
function App() {
  /**
   * books state that dynamically updates UI
   * @returns {Array<Object>}
   */
  const [books, setBooks] = useState(sampleBooks)

  /**
   * Authors state that dynamically populates UI
   */
  const [authors, setAuthors] = useState(sampleBooks)

  const {error, loading, data} = useQuery(GET_BOOKS)

  /**
   * Effect for rendering App.js first time
   * @returns {Object} - of books
   */
    useEffect(() => {
      //Error handler: If data is empty (usually first req)
      if(!data) return null
      console.log({...data})
      //Set books state to data recieved from DB
      setBooks({...data}.books)

      //Set authors state to data recieved from DB
      setAuthors({...data}.authors)
    }, [data])


  /**
     * Context values that contains functions
     * updating the UI
     * @type {Object}
     */
    const BookContextUIFunctions = {
      handleBookRemove
    }

    /**
     * Function that handles book removes.
     * Mostly for UI purposes
     * @param {number} id - The ID of the book that shall be removed
     * @returns {Object} Updates 'books' state 
     */
    function handleBookRemove(id){
      //Add DELETE func for GRAPHQL

      //For the UI filter the the books state array
      const filteredBooksArray = books.filter(book => book.id !== id)
      
      //Set book state to new filtered array
      setBooks(filteredBooksArray)
    }

  /**
   * Function that handles button removes.
   * Mostly for UI purposes
   * @param {number} id - The ID of the book that shall be removed
   * @returns {Object} Updates 'books' state 
   */
     function handleBookAdd(){
      //Add ADD func for GRAPHQL
  
      //Make temporary book object
      const newBookTemp = {
        id: books.length + 1,
        name: '',
        authorId: 1 
      }

      //Get array dublicate
      const booksDublicate = [...books]

      //Add new Book to the array
      booksDublicate.push(newBookTemp)

      //Update books state with new array
      setBooks(booksDublicate)
    }

  return (
    <>
      {/* 
        The main header. To add an header
        then add html elements above this comment
      */}
      <h1 className="app__h1">Book listings</h1>


      <BookContext.Provider
          value={BookContextUIFunctions}
      >
        
        {/* 
          Renders all books by passing
          books from from App.js as prop to BookList
        */}
        <BookList 
          books={books}
          authors={authors}
        />

        <button
          className="btn"
          onClick={() => handleBookAdd()}
        >
          Add Book
        </button>

      </BookContext.Provider>
    </>
  )
}


export default App;
