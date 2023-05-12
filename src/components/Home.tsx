import React, {useEffect, useState} from 'react';
import {useGetUsersRepositoriesQuery, useSearchRepositoriesQuery} from "../features/apiSlice";
import RepositoriesList from "./RepositoriesList";
import {IRepository} from "../types/IRepository";
import {IRepositoryExtended} from "../types/IRepositoryExtended";
import styled from "styled-components";
import ContentLoader from "./ContentLoader";
import Pagination from "./Pagination";
import {useSearchParams} from "react-router-dom";

const CURRENT_USER_LOGIN = 'marinakharitonova'
const PER_PAGE = 10
const MIN_QUERY_LENGTH = 3


function Home() {
    let [searchParams, setSearchParams] = useSearchParams();
    const searchPage = Number(searchParams.get('page')) || 1
    const searchQuery = searchParams.get('query') || ''

    const [page, setPage] = useState(searchPage)
    const [query, setQuery] = useState(searchQuery)

    useEffect(() => {
        if (page !== searchPage) {
            setPage(searchPage)
        }
    }, [searchPage, page])

    useEffect(() => {
        if (query.length >= MIN_QUERY_LENGTH && query !== searchQuery) {
            setQuery(searchQuery)
        }
    }, [query, searchQuery])


    const handlePageChange = (page: number) => {
        setPage(page)
        setSearchParams({page: page.toString(), query})
    }
    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setQuery(query)
        setPage(1)
        if (query.length >= 3) {
            setSearchParams({page: 1..toString(), query})
        } else {
            setSearchParams({})
        }
    }

    const {
        data: searchResults,
        isFetching,
        isLoading: isSearchResultsLoading,
        isSuccess: isSearchSuccess,
        isError: isSearchError
    } = useSearchRepositoriesQuery({
        q: `${query} in:name`,
        page,
        perPage: PER_PAGE
    }, {skip: query.length < MIN_QUERY_LENGTH})

    const {
        data: currentRepositories,
        isLoading: isCurrentRepositoriesLoading,
        isSuccess: isCurrentRepositoriesSuccess,
        isError: isCurrentRepositoriesError
    } = useGetUsersRepositoriesQuery(CURRENT_USER_LOGIN, {skip: query.length >= MIN_QUERY_LENGTH})

    let repositories: IRepository[] | IRepositoryExtended[] = []
    let totalCount = 0
    if (query.length >= MIN_QUERY_LENGTH) {
        if (searchResults && searchResults.items.length) {
            repositories = searchResults.items
            totalCount = searchResults.total_count
        }
    } else {
        if (currentRepositories) {
            repositories = currentRepositories
            totalCount = repositories.length
        }
    }


    return (
        <div>
            <Input type="text"
                   value={query}
                   placeholder="Input the name of the repository (at least 3 characters)"
                   onChange={handleQueryChange}/>


            <ContentLoader isLoading={isSearchResultsLoading || isCurrentRepositoriesLoading}
                           isError={isSearchError || isCurrentRepositoriesError}
                           isSuccess={isSearchSuccess || isCurrentRepositoriesSuccess}
            >
                <Content isFetching={isFetching}>
                    {repositories.length > 0 &&
                        <>
                            <RepositoriesList repositories={repositories}/>

                            {totalCount > PER_PAGE &&
                                <Pagination totalCount={totalCount} perPage={PER_PAGE} activePage={page}
                                            handlePageChange={handlePageChange}/>}
                        </>
                    }

                    {repositories.length === 0 && <p>Nothing found</p>}
                </Content>


            </ContentLoader>
        </div>
    );
}

export default Home;

const Input = styled.input`
  width: 100%;
  border-radius: ${props => props.theme.borderRadius};
  outline: none;
  border: 2px solid ${props => props.theme.palette.secondary};
  font-size: inherit;
  line-height: inherit;
  padding: 4px 8px;
  margin-bottom: 36px;
  transition: border-color ${props => props.theme.transition};

  &:focus {
    border-color: ${props => props.theme.palette.primary};
  }

  @media (max-width: 768px) {
    margin-bottom: 12px;
  }
`

interface ContentProps {
    isFetching: boolean;
}

const Content = styled.div<ContentProps>`
  transition: opacity ${props => props.theme.transition};
  opacity: ${props => props.isFetching ? '0.7' : '1'};
`