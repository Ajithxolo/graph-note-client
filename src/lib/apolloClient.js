// lib/apolloClient.js
import React from 'react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL || 'http://localhost:3000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(), 
});

export default client;
