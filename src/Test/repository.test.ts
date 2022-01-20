import { describe, it } from 'mocha'
import assert from 'assert'
import { makeExecutableSchema } from 'graphql-tools'
import { addMocksToSchema } from '@graphql-tools/mock'
import { graphql } from 'graphql'

import Repository from '../Interfaces/Repository'

describe('Repositoy tests', () => {
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
  const schema = makeExecutableSchema({ typeDefs })
  const schemaWithMocks = addMocksToSchema({ schema })

  describe('search for Mock data', () => {
    it('should return an array of Mock repositories', async () => {
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

        const instanceOfRepo = (object: any): object is Repository =>
          'fullName' in object

        assert.ok(
          result?.data?.getRepositories.every((repo: any) =>
            instanceOfRepo(repo)
          )
        )
      } else assert.fail()
    })
  })
})
