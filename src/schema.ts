import 'graphql-import-node'
import { Repository } from './Types'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'
import RepositoryResolver from './Resolvers/RepositoryResolver'

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs: [Repository],
  resolvers: [RepositoryResolver],
})

export default schema
