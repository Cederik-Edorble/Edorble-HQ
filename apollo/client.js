/* eslint-disable import/prefer-default-export */
/* because this is server part */
import { useMemo } from "react";
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient, InMemoryCache, from, makeVar } from "@apollo/client";

let apolloClient;

function createIsomorphLink() {
  if (typeof window === "undefined") {
    const { schema } = require("./schema");
    const { SchemaLink } = require("@apollo/client/link/schema");
    return new SchemaLink({ schema });
  }

  return createUploadLink({
    uri: process.env.API_URL,
    credentials: "same-origin",
  });
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: from([ createIsomorphLink() ]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
  });
}

export function initializeApollo(initialState = null) {
  const initApolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    initApolloClient.cache.restore(initialState);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") {
    return initApolloClient;
  }
  // Create the Apollo Client once in the client
  if (!apolloClient) {
    apolloClient = initApolloClient;
  }

  return initApolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
