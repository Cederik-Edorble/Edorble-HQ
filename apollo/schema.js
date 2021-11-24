/* eslint-disable import/prefer-default-export */
/* because this is server part */
import { makeExecutableSchema } from "graphql-tools";
import typeDefs from "./type-defs";
import resolvers from "./resolvers";

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
