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


const errorLink = onError(({ graphqlErrors, networkError }) => {
  if(graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      return console.log(message)
    })
  }
})

const link = from([
  errorLink,
  new HttpLink({uri: "http://192.168.0.109:5000/graphql"})
]) 

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
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
