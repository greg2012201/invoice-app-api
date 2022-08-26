import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const contractor: DocumentNode = gql`
  extend type Query {
    getContractors: [Contractor]
  }
  extend type Mutation {
    addContractor(
      name: String
      nip: String
      address: String
      tel: String
      email: String
    ): Boolean
  }

  type Invoice {
    id: ID
    title: String
  }

  type Contractor {
    id: ID
    name: String
    nip: String
    address: String
    tel: String
    email: String
    invoices: [Invoice]
  }
`;
export default contractor;
