import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{width: number}>`
    display: inline-block;
    width: ${p => p.width}%;
`;

const PegWrapper = styled.div`
    position: absolute;
    width: inherit;
    bottom: 0;
`;

const Peg = styled.div`
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
    position: relative;
    background-color: orange;
    width: 10px;
    border-radius: 4px;
    height: calc(100vh - 125px);
`;

interface Props {
    width: number;
    showPeg: boolean;
    children: React.ReactNode;
}

export const Stack = ({width, showPeg, children}: Props) =>
    <Wrapper width={width}>
        {children}
        {showPeg &&
            <PegWrapper>
                <Peg />
            </PegWrapper>
        }
    </Wrapper>;
