import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import {IRepositories} from "../types/IRepositories";
import {IRepositoryPage} from "../types/IRepositoryPage";
import {IRepositoryExtended} from "../types/IRepositoryExtended";

const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.github.com/',
    prepareHeaders: (headers) => {
        headers.set('Accept', 'application/vnd.github+json')
        headers.set('X-GitHub-Api-Version', '2022-11-28')
        return headers
    }
})


export const mainApi = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: (builder) => ({
        searchRepositories: builder.query<IRepositories, { q: string, perPage: number, page: number }>({
            query: (arg) => `search/repositories?q=${encodeURI(arg.q)}&per_page=${arg.perPage}&page=${arg.page}`,
        }),
        getRepository: builder.query<IRepositoryPage, { owner: string, repo: string }>({
            query: (arg) => `repos/${arg.owner}/${arg.repo}`,
        }),
        getUsersRepositories: builder.query<IRepositoryExtended[], string>({
            query: (userName) => `users/${userName}/repos`,
        }),
    }),
})

export const {
    useSearchRepositoriesQuery,
    useGetRepositoryQuery,
    useGetUsersRepositoriesQuery
} = mainApi


