import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const user: DocumentNode = gql`
  extend type Query {
    getMe: Me
  }
  extend type Mutation {
    register(name: String, email: String, password: String): Boolean
    login(email: String, password: String): LoginResponse
  }
  type Me {
    id: ID
    email: String
    name: String
  }
  type LoginResponse {
    id: ID
    email: String
    accessToken: String
  }
`;
export default user;
