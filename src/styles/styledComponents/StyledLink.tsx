import styled from "styled-components";

const StyledLink = styled.button`
  color: inherit;
  transition: opacity ${props => props.theme.transition};
  text-decoration: none;

  &:hover {
    opacity: 0.7;
  }
`;

export default StyledLink