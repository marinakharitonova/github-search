import React from 'react';
import {H1} from "../styles/styledComponents/H1";
import Preloader from "./Preloader";
import styled from "styled-components";

type ContentLoaderProps = {
    children: React.ReactNode
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
}

/**
 * ContentLoader renders
 * the preloader while the content is being loaded,
 * the content on success,
 * an error on failure.
 */
function ContentLoader({children, isLoading, isSuccess, isError}: ContentLoaderProps) {

    return (
        <>
            {isLoading && <Preloader/>}
            {isSuccess && children}
            {isError && <ErrorBox>
                <H1>Error!</H1>
                <p>Failed to load resource</p>
            </ErrorBox>}
        </>
    )

}

export default ContentLoader;

const ErrorBox = styled.div`
  border: 2px solid ${props => props.theme.palette.error};
  border-radius: ${props => props.theme.borderRadius};
  padding: 8px 16px;
`