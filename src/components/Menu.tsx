import React from 'react';
import styled from 'styled-components';

interface Props {
    title: string;
    children: React.ReactNode;
}

export const Menu = ({title, children}: Props) =>
    <Wrapper>
        <Title>{title}</Title>
        {children}
    </Wrapper>;

const Wrapper = styled.div`
    float: right;
    background-color: black;
    padding: 15px;
    width: 500px;
    margin-left: 25px;
    
    h2 {
        text-align: center;
        font-size: 15px;
    }
`;

const Title = styled.h1`
    text-align: center;
    font-size: 20px;
    margin-top: 0;
`;