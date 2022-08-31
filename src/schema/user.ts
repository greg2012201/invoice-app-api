import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const user: DocumentNode = gql`
  extend type Query {
    getMe: Me
  }
  type Me {
    _id: ID
    email: String
  }
`;
export default user;
