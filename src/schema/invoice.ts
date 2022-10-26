import { gql } from 'apollo-server-express';
import { DocumentNode } from 'graphql';

const invoice: DocumentNode = gql`
  extend type Mutation {
    issueInvoice(
      serviceName: String
      quantity: Float
      priceNet: Float
      valueNet: Float
      VATRate: Float
      sumVAT: Float
      grossValue: Float
      comments: Float
    ): Boolean
  }
`;

export default invoice;
