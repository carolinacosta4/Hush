import { ApolloClient, InMemoryCache, split, HttpLink, ApolloLink } from '@apollo/client/core';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';

const getToken = () => localStorage.getItem('authToken');

const httpLink = new HttpLink({
    uri: 'http://localhost:3000/graphql'
});

const authLink = new ApolloLink((operation, forward) => {
    const token = getToken();
    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            Authorization: token ? token : ''
        }
    }));

    return forward(operation);
});

const wsLink = new GraphQLWsLink(
    createClient({
        url: 'ws://localhost:3000/graphql',
        connectionParams: () => {
            const token = getToken();
            return token ? { Authorization: `Bearer ${token}` } : {};
        }
    })
);

const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
    },
    wsLink,
    authLink.concat(httpLink)
);

const apolloClient = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache()
});

export default apolloClient;
