import { gql } from "@apollo/client";

const typeDefs = gql`
  type testLocal {
    code: String!
  }

  type Query {
    testLocal: testLocal
  }
`;

export default typeDefs;
