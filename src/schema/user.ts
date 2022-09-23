import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const user: DocumentNode = gql`
  extend type Query {
    getMe: Me
  }
  extend type Mutation {
    register(name: String, email: String, password: String): String
    login(email: String, password: String): LoginResponse
    logout: Boolean
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
