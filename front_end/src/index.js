import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

import { 
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from '@apollo/client'
import { onError } from '@apollo/client/link/error'


const errorLink = onError(({ graphqlErrors, networkError}) => {
  if(graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      return alert(`Graphql error ${message}`)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: "http://localhost:5000/graphql"})
]) 

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:5000/graphql"
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider
        client={client}
    >
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
