import React, {useState} from 'react';
import {useGetUsersRepositoriesQuery, useSearchRepositoriesQuery} from "../features/apiSlice";
import RepositoriesList from "./RepositoriesList";
import {IRepository} from "../types/IRepository";
import {IRepositoryExtended} from "../types/IRepositoryExtended";
import styled from "styled-components";
import ContentLoader from "./ContentLoader";

const CURRENT_USER_LOGIN = 'marinakharitonova'


function Home() {
    const [page, setPage] = useState(1)
    const [query, setQuery] = useState('')
    const handlePageChange = (page: number) => {
        setPage(page)
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
        perPage: 10
    }, {skip: query.length < 3})

    const {
        data: currentRepositories,
        isLoading: isCurrentRepositoriesLoading,
        isSuccess: isCurrentRepositoriesSuccess,
        isError: isCurrentRepositoriesError
    } = useGetUsersRepositoriesQuery(CURRENT_USER_LOGIN, {skip: query.length >= 1})

    let repositories: IRepository[] | IRepositoryExtended[] = []
    if (query.length >= 3) {
        if (searchResults && searchResults.items.length) repositories = searchResults.items
    } else {
        if (currentRepositories) repositories = currentRepositories
    }

    return (
        <div>
            <Input type="text"
                   value={query}
                   placeholder="Input the name of the repository"
                   onChange={(e) => setQuery(e.target.value)}/>


            <ContentLoader isLoading={isSearchResultsLoading || isCurrentRepositoriesLoading}
                           isError={isSearchError || isCurrentRepositoriesError}
                           isSuccess={isSearchSuccess || isCurrentRepositoriesSuccess}
            >
                <Content isFetching={isFetching}>
                    {repositories.length > 0 && <RepositoriesList repositories={repositories}/>}

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
`

interface ContentProps {
    isFetching: boolean;
}

const Content = styled.div<ContentProps>`
  transition: opacity ${props => props.theme.transition};
  opacity: ${props => props.isFetching ? '0.7' : '1'};
`