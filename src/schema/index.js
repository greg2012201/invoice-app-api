import { gql } from 'apollo-server-express'
import contractor from './Contractor.js'

const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

`
export default [linkSchema, contractor]