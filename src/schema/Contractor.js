import { gql } from 'apollo-server-express'

export default gql`
extend type Query {
    getContractors: Contractor
}
extend type Mutation {
    addContractor(ContractorInput): Boolean 
}

type Invoice {
    id: ID
    title: String
}

type Contractor {
    name: String,
    nip: Number,
    address: String,
    tel: String,
    email: String,
    invoices: [Invoice]

}
input ContractorInput {
    name: String,
    nip: Number,
    address: String,
    tel: String,
    email: String,
  

}

`