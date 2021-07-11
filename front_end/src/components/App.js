/**
 * Name: Book Shower application
 * Author: Daniel Cargar Mahyar
 * 
 * 
 */

//React imports
import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'

//Queries import
import { GET_ALL_BOOKS_AND_AUTHORS } from '../GraphQL/Queries'
import { DELETE_BOOK, ADD_BOOK } from '../GraphQL/Mutations'


//import main css file
import '../css/app.css'

//All book list components
import BookMain from './BookComponents/BookMain'
import AuthorMain from './AuthorComponents/AuthorMain'

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
  const [books, setBooks] = useState([])
  const [authors, setAuthors] = useState([])

  const { loading, error, data, refetch } = useQuery(GET_ALL_BOOKS_AND_AUTHORS)

  const [deleteBook] = useMutation(DELETE_BOOK, {
    refetchQueries: [{
      query: GET_ALL_BOOKS_AND_AUTHORS
    }]
  })
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{
      query: GET_ALL_BOOKS_AND_AUTHORS
    }]
  })

  /**
   * Effect for rendering App.js first time
   * @returns {Object} - of books
   */
    useEffect(() => {
      //Error handler: If data is empty (usually first req)
      if(!data) return null

      //Set books state to data recieved from DB
      setBooks({...data}.books)
      setAuthors({...data}.authors)

    }, [data])


  /**
     * Context values that contains functions
     * updating the UI
     * @type {Object}
     */
    const BookContextUIFunctions = {
      handleBookRemove,
      handleBookAdd,
      books,
      authors
    }

    /**
     * Function that handles book removes.
     * Mostly for UI purposes
     * @param {number} id - The ID of the book that shall be removed
     * @returns {Object} Updates 'books' state 
     */
    function handleBookRemove(bookId){

      console.log(bookId)
      //Add DELETE func for GRAPHQL
      deleteBook({ variables: { bookId }})

      refetch()

      //For the UI filter the the books state array
      const filteredBooksArray = books.filter(book => book.id !== bookId)
      
      //Set book state to new filtered array
      setBooks(filteredBooksArray)
    }

  /**
   * Function that handles button removes.
   * Mostly for UI purposes
   * @param {number} id - The ID of the book that shall be removed
   * @returns {Object} Updates 'books' state 
   */
    function handleBookAdd({ name, authorId }){

      //Add ADD func for GRAPHQL
      addBook({ variables: { name, authorId }})

      refetch()
    }

  return (
    <>
      {/* Show if error from apollo is present */}
      {loading &&
        <div className="app__loading">
          <h2 className="app__error-message">Loading books</h2>
        </div>
      }

      {/* Show if error from apollo is present */}
      {error &&
        <div className="app__error">
          <h2 className="app__error-message">An error occurred: {error.message}</h2>
        </div>
      }

      {/* 
        The main header. To add an header
        then add html elements above this comment
      */}
      <h1 className="app__h1">Book listings</h1>

      <BookContext.Provider
          value={BookContextUIFunctions}
      >
        {/* 
          Renders main booking list if loading and error are falsey
        */}
        {(!loading && !error) && 
          <>
            {/* 
              Renders all books by passing
              books from from App.js as prop to BookList
            */}
            <BookMain />

            <AuthorMain />
          </>
        }

      </BookContext.Provider>
    </>
  )
}


export default App;
