import styled from 'styled-components';

export const Button = styled.button`
    background: none;
    color: white;
    border: 2px solid white;
    padding: 10px;

    :focus-visible {
        border-style: dashed;
        outline: none;
    }
    
    :active, :disabled {
        background-color: #222222;
    }
`;
