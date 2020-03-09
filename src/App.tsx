import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import ApolloClient, { IntrospectionFragmentMatcher, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import 'ress';
import './App.scss';
import Top from './pages/Top';
import QueryTypes from './@types/graphql';

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: QueryTypes
});

const cache = new InMemoryCache({ fragmentMatcher });

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  cache,
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
      }
    });
  }
});

const App: FC = () => (
  <BrowserRouter>
    <Route render={props => <Top routeProps={props} />} />
  </BrowserRouter>
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);
