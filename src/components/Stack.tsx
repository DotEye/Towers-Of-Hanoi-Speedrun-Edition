import React from 'react';
import styled from 'styled-components';
import {MAX_DISK_HEIGHT} from '../util/constants';

const Wrapper = styled.div<{width: number}>`
    display: inline-block;
    width: ${p => p.width}%;
`;

const PegWrapper = styled.div`
    position: absolute;
    width: inherit;
    bottom: 0;
`;

const Peg = styled.div<{numDisks: number}>`
    left: 50%;
    transform: translateX(-50%);
    z-index: -1;
    position: relative;
    background-color: orange;
    width: 10px;
    border-radius: 4px;
    height: min(calc(100vh - 125px), ${p => (p.numDisks + 3) * MAX_DISK_HEIGHT}px);
`;

interface Props {
    width: number;
    showPeg: boolean;
    children: React.ReactNode;
    numDisks: number;
}

export const Stack = ({width, showPeg, children, numDisks}: Props) =>
    <Wrapper width={width}>
        {children}
        {showPeg &&
            <PegWrapper>
                <Peg numDisks={numDisks} />
            </PegWrapper>
        }
    </Wrapper>;
