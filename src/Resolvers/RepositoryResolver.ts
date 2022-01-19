import { IResolvers } from 'graphql-tools'
import LanguageQuery from '../Interfaces/LanguageQuery'
import Repository from '../Interfaces/Repository'
import parseRepositories from '../Helpers/parseRepositories'
import api from '../Services/api'

const RepositoryResolver: IResolvers = {
  Query: {
    async getRepositories(
      _: void,
      args: { input: LanguageQuery }
    ): Promise<Repository | Repository[]> {
      const { language, page, perPage } = args.input

      try {
        const response = await api.get(
          `/repositories?q=language:${language}&order=desc&sort=star&page=${page}&per_page=${perPage}`
        )

        const { data } = response
        return parseRepositories(data || {})
      } catch (error: any) {
        return error.toString()
      }
    },
  },
}

export default RepositoryResolver
