import React, { FC } from 'react';
import { Query, QueryResult } from 'react-apollo';
import { RouteProps, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import HomeQuery from './queries.graphql';
import { SEARCH_QUERY_PARAM } from '../../constants/searchQuery';
import { TopQuery as HomeQueryTypes } from '../../@types/graphql';
import { default as TopComponent, TopProps, TopCommunicationTypes } from '../../components/layouts/Top';
import FetchException, { FetchExceptionErrorTypes } from '../../exceptions/fetchException';
import { ApolloError } from 'apollo-boost';

function usersMapper(data?: HomeQueryTypes): TopProps['users'] {
  if (typeof data === 'undefined') {
    return;
  }

  const users = data.search.nodes?.map(node => {
    if (node?.__typename !== 'User') {
      return;
    }

    return {
      id: node.id,
      login: node.login,
      url: `${node.url}`,
      avatarUrl: `${node.avatarUrl}`,
      name: node.name,
      bio: node.bio
    };
  });

  // return users?.filter(current => typeof current !== 'undefined');

  // 上記だと型が解決しないので以下で対応。
  // やっていることは同じ。

  const trimmedUsers: TopProps['users'] = [];

  users?.forEach(current => {
    if (typeof current === 'undefined') {
      return;
    }

    trimmedUsers.push(current);
  });

  return trimmedUsers;
}

function formatQueryString(query: ValueOf<queryString.ParsedQuery<string>>) {
  if (typeof query === 'undefined' || query === null) {
    return '';
  }

  if (Array.isArray(query)) {
    return query.join(' ').trim();
  }

  return query;
}

function getTopCommunicationTypes(query?: string, data?: HomeQueryTypes, exception?: FetchException) {
  if (query === '' && query.length <= 0) {
    return TopCommunicationTypes.INITIAL;
  }

  if (exception instanceof FetchException) {
    switch (exception.type) {
      case FetchExceptionErrorTypes.NETWORK: {
        return TopCommunicationTypes.NETWORK_ERROR;
      }
      default: {
        return TopCommunicationTypes.ERROR;
      }
    }
  }

  if (
    typeof data === 'undefined' ||
    typeof data.search.nodes === 'undefined' ||
    (typeof data.search.nodes !== 'undefined' && data?.search.nodes !== null && data.search.nodes.length <= 0)
  ) {
    return TopCommunicationTypes.ZERO_MATCH;
  }
}

const Top: FC<{ routeProps: RouteProps }> = ({ routeProps }) => {
  const history = useHistory();
  const query = formatQueryString(queryString.parse(routeProps.location?.search || SEARCH_QUERY_PARAM).q);

  return (
    <Query query={HomeQuery} variables={{ query }}>
      {({ loading, data, error }: QueryResult<HomeQueryTypes>) => {
        let exception;

        if (error instanceof ApolloError) {
          exception = new FetchException(error);
        }

        return (
          <TopComponent
            query={query}
            isLoading={loading}
            users={usersMapper(data)}
            onSearchSubmit={(value?: string) => {
              history.push(queryString.stringifyUrl({ url: '', query: { q: value } }));
            }}
            communicationType={getTopCommunicationTypes(query, data, exception)}
          />
        );
      }}
    </Query>
  );
};

export default Top;
