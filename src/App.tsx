import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider, Query, QueryResult } from 'react-apollo';
import 'ress';
import styles from './App.scss';
import AppQuery from './App.graphql';
import { AppQuery as AppQueryTypes } from './@types/graphql';

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        authorization: `Bearer ${process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN}`
      }
    });
  }
});

const App = () => (
  <Query query={AppQuery} variables={{ login: 'apollographql' }}>
    {({ loading, data }: QueryResult<AppQueryTypes>) => {
      if (loading) return <p>Loading...</p>;

      if (typeof data === 'undefined') return null;

      if (data.organization === null) return null;

      const repositories = data.organization.repositories.nodes;

      if (repositories === null) return null;

      return (
        <ul className={styles.app}>
          {repositories.map(repo =>
            repo !== null ? (
              <li key={repo.id}>
                <a href={repo.url}>{repo.name}</a>
                <button>{repo.stargazers.totalCount} Star</button>
              </li>
            ) : null
          )}
        </ul>
      );
    }}
  </Query>
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);
