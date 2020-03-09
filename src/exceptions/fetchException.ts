import { ApolloError } from 'apollo-boost';

export enum FetchExceptionErrorTypes {
  NETWORK = 'NETWORK',
  GRAPHQL = 'GRAPHQL'
}

export default class FetchException {
  constructor(public error: ApolloError) {
    return this;
  }

  public get type() {
    if (typeof this.error.graphQLErrors !== 'undefined' && this.error.graphQLErrors.length > 0) {
      return FetchExceptionErrorTypes.GRAPHQL;
    }

    if (typeof this.error.networkError !== 'undefined' || this.error.networkError !== null) {
      return FetchExceptionErrorTypes.NETWORK;
    }

    return;
  }
}
