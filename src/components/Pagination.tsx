import React, {useEffect, useState} from 'react';
import styled from "styled-components";

const BUTTONS_COUNT = 10

type PaginationProps = {
    totalCount: number
    perPage: number
    activePage: number
    handlePageChange: (page: number) => void
}

function createButtons(totalPagesCount: number, currentPage: number) {
    const buttons = []
    const middlePage = BUTTONS_COUNT / 2

    if (totalPagesCount > BUTTONS_COUNT) {
        if (currentPage > middlePage) {
            for (let i = currentPage - middlePage + 1; i <= currentPage + middlePage; i++) {
                buttons.push(i)
                if (i === totalPagesCount) break
            }
        } else {
            for (let i = 1; i <= BUTTONS_COUNT; i++) {
                buttons.push(i)
                if (i === totalPagesCount) break
            }
        }
    } else {
        for (let i = 1; i <= totalPagesCount; i++) {
            buttons.push(i)
        }
    }

    return buttons
}

function Pagination({totalCount, perPage, activePage, handlePageChange}: PaginationProps) {

    const totalPagesCount = Math.ceil(totalCount / perPage)

    const [buttons, setButtons] = useState([] as number[])

    useEffect(() => {
        const initialButtons = createButtons(totalPagesCount, activePage)
        setButtons(initialButtons)

    }, [totalPagesCount, activePage])

    const handleClick = (i: number) => {
        handlePageChange(i)

        setButtons(createButtons(totalPagesCount, i))
    }

    return (
        <PaginationContainer>
            {buttons.map(button => <PaginationButton
                key={button}
                isActive={activePage === button}
                onClick={() => handleClick(button)}
            >{button}</PaginationButton>)}
        </PaginationContainer>
    );
}

export default Pagination;

const PaginationContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 30px);
  grid-gap: 5px;
  margin: 36px 0 0;

  @media (max-width: 768px) {
    grid-template-columns: repeat(10, 27px);
    margin-top: 16px;
  }
`

interface PaginationButtonProps {
    isActive: boolean;
}

const PaginationButton = styled.button<PaginationButtonProps>`
  height: 30px;
  cursor: pointer;
  border-radius: 50%;
  border: 2px solid ${props => props.isActive ? props.theme.palette.primary : props.theme.palette.secondary};
  background: ${props => props.isActive ? props.theme.palette.primary : props.theme.palette.white};
  color: ${props => props.isActive ? props.theme.palette.white : props.theme.palette.black};

  @media (max-width: 768px) {
    height: 27px;
  }
`