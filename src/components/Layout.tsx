import React from 'react';
import styled from "styled-components";
import StyledLink from "../styles/styledComponents/StyledLink";

type LayoutProps = {
    children: React.ReactNode
}

function Layout({children}: LayoutProps) {
    return (
        <StyledLayout>
            <Wrapper as="header">
                <Content>
                    <p>Github search</p>
                </Content>
            </Wrapper>
            <Main>
                <Content>
                    {children}
                </Content>
            </Main>
            <Wrapper as="footer">
                <Content>
                    <StyledLink as="a" href="https://github.com/marinakharitonova">marinakharitonova</StyledLink>
                </Content>
            </Wrapper>
        </StyledLayout>
    );
}

export default Layout;


const StyledLayout = styled.div`
  color: ${props => props.theme.palette.black};
  font-size: ${props => props.theme.fontSize};
  line-height: ${props => props.theme.lineHeight};
`

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`

const Wrapper = styled.div`
  min-height: 60px;
  background: ${props => props.theme.palette.primary};
  color: ${props => props.theme.palette.white};
  padding: 20px 0;
`

const Main = styled.main`
  min-height: calc(100vh - 120px);
  padding: 30px 0;
`