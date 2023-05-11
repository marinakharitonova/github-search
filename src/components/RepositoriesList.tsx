import React from 'react';
import RepositoryItem from "./RepositoryItem";
import {IRepositoryExtended} from "../types/IRepositoryExtended";
import {IRepository} from "../types/IRepository";
import styled from "styled-components";

type RepositoriesListProps = {
    repositories: IRepository[] | IRepositoryExtended[]
}

function RepositoriesList({repositories}: RepositoriesListProps) {
    return (
        <StyledList>
            {repositories.map(item => <RepositoryItem key={item.id} repository={item}/>)}
        </StyledList>
    );
}

export default RepositoriesList;

const StyledList = styled.ul`
  list-style: none;

  li {
    padding: 16px 0;
  }

  li:not(:last-child) {
    border-bottom: 1px dashed ${props => props.theme.palette.secondary};
  }
`