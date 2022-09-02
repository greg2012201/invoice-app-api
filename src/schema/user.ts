import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const user: DocumentNode = gql`
  extend type Query {
    getMe: Me
  }
  extend type Mutation {
    register(email: String, password: String): Boolean
    login(email: String, password: String): LoginResponse
  }
  type Me {
    _id: ID
    email: String
  }
  type LoginResponse {
    _id: ID
    email: String
    accessToken: String
  }
`;
export default user;
