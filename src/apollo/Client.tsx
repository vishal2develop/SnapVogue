import React, {useMemo} from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  TypePolicies,
} from '@apollo/client';
import {AUTH_TYPE, AuthOptions, createAuthLink} from 'aws-appsync-auth-link';
import {createSubscriptionHandshakeLink} from 'aws-appsync-subscription-link';
import appSyncConfig from '../aws-exports';
import {useAuthContext} from '../contexts/AuthContext';

interface IClient {
  children: React.ReactNode;
}

const url = appSyncConfig.aws_appsync_graphqlEndpoint;

const region = appSyncConfig.aws_appsync_region;

const httpLink = new HttpLink({uri: url});

const mergeLists = (existing = {items: []}, incoming = {items: []}) => {
  return {
    ...existing,
    ...incoming,
    items: [...(existing.items || []), ...incoming.items],
  };
};

const typePolicies: TypePolicies = {
  Query: {
    fields: {
      commentsByPost: {
        keyArgs: ['postID', 'createdAt', 'sortDirection', 'filter'],
        merge: mergeLists,
      },
      postsByDate: {
        keyArgs: ['type', 'createdAt', 'sortDirection', 'filter'],
        merge: mergeLists,
      },
    },
  },
};

const Client = ({children}: IClient) => {
  const {userJwtToken} = useAuthContext();

  // Using useMemo so that a new Apollo client is not created on every re-render
  const client = useMemo(() => {
    const jwtToken = userJwtToken.toString() || '';

    const auth: AuthOptions = {
      type: appSyncConfig.aws_appsync_authenticationType as AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
      jwtToken: jwtToken,
      // jwtToken: async () => token, // Required when you use Cognito UserPools OR OpenID Connect. token object is obtained previously
      // credentials: async () => credentials, // Required when you use IAM-based auth.
    };
    const link = ApolloLink.from([
      createAuthLink({url, region, auth}),
      createSubscriptionHandshakeLink({url, region, auth}, httpLink),
    ]);

    return new ApolloClient({
      link,
      cache: new InMemoryCache({typePolicies}),
    });
  }, [userJwtToken]);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default Client;
