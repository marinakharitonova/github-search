import React from 'react';
import {IRepository} from "../types/IRepository";
import {Link} from "react-router-dom";
import StyledLink from "../styles/styledComponents/StyledLink";
import styled from "styled-components";
import {AiOutlineStar} from "react-icons/ai";
import {BiLinkExternal} from "react-icons/bi";
import {IconText} from "../styles/styledComponents/IconText";
import {InfoContainer} from "../styles/styledComponents/InfoContainer";

type RepositoryItemProps = {
    repository: IRepository
}

function RepositoryItem({repository}: RepositoryItemProps) {
    return (
        <InfoContainer as="li">
            <Name to={`/${repository.owner.login}/${repository.name}`}>{repository.full_name}</Name>
            <IconText>
                <StyledLink as="a" href={repository.html_url} target="_blank">View on Github</StyledLink>
                <BiLinkExternal/>
            </IconText>
            <IconText>
                <AiOutlineStar/>
                <p>{repository.stargazers_count}</p>
            </IconText>
            <p>{`Last commit date: ${new Date(repository.pushed_at).toLocaleDateString()}`}</p>
        </InfoContainer>
    );
}

export default RepositoryItem;

const Name = styled(Link)`
  color: inherit;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2em;
`

