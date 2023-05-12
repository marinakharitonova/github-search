import React from 'react';
import {useParams} from "react-router-dom";
import {useGetRepositoryQuery} from "../features/apiSlice";
import StyledLink from "../styles/styledComponents/StyledLink";
import {AiFillGithub, AiOutlineStar} from "react-icons/ai";
import {IconText} from "../styles/styledComponents/IconText";
import {H1} from "../styles/styledComponents/H1";
import {InfoContainer} from "../styles/styledComponents/InfoContainer";
import styled from "styled-components";
import {Avatar} from "../styles/styledComponents/Avatar";
import ContentLoader from "./ContentLoader";

function RepositoryPage() {
    let {owner, repo} = useParams();

    const {data, isLoading, isSuccess, isError} = useGetRepositoryQuery({owner: owner!, repo: repo!})

    return (
        <ContentLoader isLoading={isLoading} isSuccess={isSuccess} isError={isError}>
            {
                data && <>
                    <PageH1>{data.name}</PageH1>

                    <InfoContainer>
                        <Label>{data.language}</Label>
                        <p>{data.description}</p>
                        <IconText><AiOutlineStar/><p>{data.stargazers_count}</p></IconText>
                        <p>{`Last commit date: ${new Date(data.pushed_at).toLocaleDateString()}`}</p>
                        <IconText>
                            <p>Owner:</p>
                            <IconText>
                                <StyledLink as="a" href={`https://github.com/${data.owner.login}`}
                                            target="_blank">{data.owner.login}</StyledLink>
                                <AiFillGithub/>
                            </IconText>
                        </IconText>

                        {data.owner.avatar_url && <Avatar src={data.owner.avatar_url} alt={data.owner.login}/>}
                    </InfoContainer>
                </>
            }
        </ContentLoader>
    );
}

export default RepositoryPage;

const PageH1 = styled(H1)`
  margin-bottom: 36px;
  
  @media (max-width: 768px) {
    margin-bottom: 16px;
  }
`

const Label = styled.span`
  justify-self: flex-start;
  padding: 4px 8px;
  background: ${props => props.theme.palette.secondary};
  border-radius: ${props => props.theme.borderRadius};
`