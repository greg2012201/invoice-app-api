import { gql } from 'apollo-server-express'

export default gql`
extend type Query {
    getContractors: Contractors
}
extend type Mutation {
    addContractor(nip: String): Boolean 
}

type Invoice {
    id: ID
    title: String
}

type Contractors {
    name: String,
    nip: Number,
    address: String,
    tel: String,
    email: String,
    invoices: [Invoice]

}

`