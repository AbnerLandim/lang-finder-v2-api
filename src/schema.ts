import 'graphql-import-node'
import * as typeDefs from './Types/Repository.graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { GraphQLSchema } from 'graphql'
import RepositoryResolver from './Resolvers/RepositoryResolver'

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers: [RepositoryResolver],
})

export default schema
