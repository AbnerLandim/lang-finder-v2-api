import { describe, it, beforeEach } from 'mocha'
import assert from 'assert'
import { makeExecutableSchema } from 'graphql-tools'
import { addMocksToSchema } from '@graphql-tools/mock'
import { graphql, GraphQLSchema } from 'graphql'
import { ApolloServer } from 'apollo-server-express'

import IRepository from '../Interfaces/Repository'
import RRepository from '../Resolvers/RepositoryResolver'

describe('Repository tests', () => {
  let schemaWithMocks: GraphQLSchema
  let schema: GraphQLSchema
  const typeDefs = `
        type Query {
          getRepositories(input: LanguageQuery!): [Repository]!
        }
        
        input LanguageQuery {
          language: String!
          page: Int!
          perPage: Int!
        }
        
        type Repository {
          fullName: String
          description: String
          url: String
          avatarUrl: String
          starsCount: Int
        }      
      `
  const resolvers = { ...RRepository }

  const instanceOfRepo = (object: any): object is IRepository =>
    'fullName' in object

  beforeEach(() => {
    schema = makeExecutableSchema({ typeDefs })
    schemaWithMocks = addMocksToSchema({ schema })
  })

  describe('searching for JS repositories', () => {
    it('should return an array of JS repositories', async () => {
      const query = `
        {
          getRepositories(input: { language: "js", page: 1, perPage: 5 }) {
            fullName
            description
            url
            avatarUrl
            starsCount
          }
        }
      `
      const result = await graphql(schemaWithMocks, query)
      if (result) {
        // console.log('Got result ->', result?.data?.getRepositories)
        assert.ok(
          result?.data?.getRepositories.every((repo: any) =>
            instanceOfRepo(repo)
          )
        )
      } else assert.fail()
    })
  })

  describe('setting up server and searching', () => {
    it('should return repositories', async () => {
      const query = `
      {
        getRepositories(input: { language: "js", page: 1, perPage: 5 }) {
          fullName
          description
          url
          avatarUrl
          starsCount
        }
      }
    `
      const testServer = new ApolloServer({ typeDefs, resolvers })
      const result = await testServer.executeOperation({
        query,
      })

      if (result) {
        assert.ok(result.errors === undefined)
        assert.ok(
          result?.data?.getRepositories.every((repo: any) =>
            instanceOfRepo(repo)
          )
        )
      } else assert.fail()
    })
  })
})
