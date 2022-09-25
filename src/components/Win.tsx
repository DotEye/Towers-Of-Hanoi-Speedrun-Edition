import styled from 'styled-components';
import React from 'react';
import {optimalMoves} from '../util/optimalMoves';
import {getHighScore} from '../util/highScore';
import {Moves, Settings} from '../util/types';
import {MS_IN_SECOND} from '../util/constants';

interface Props {
    moves: Moves;
    settings: Settings;
    startTime: number;
    endTime: number;
    timeDifference: number;
}

export const Win = ({moves, settings, startTime, endTime, timeDifference}: Props) =>
    <>
        <Text>
            <Emoji>🏆</Emoji>
            <h2>Game complete!</h2>
        </Text>
        <NoBulletList>
            {moves.length === optimalMoves(settings) && <li>You had the optimal solution!</li>}
            <li>
                <strong>Average moves per second</strong>:{' '}
                {(MS_IN_SECOND * moves.length / (endTime - startTime)).toFixed(2)}
            </li>
            <li>
                <strong>Average optimal moves per second</strong>:{' '}
                {(MS_IN_SECOND * optimalMoves(settings) / (endTime - startTime)).toFixed(2)}
            </li>
            <li>
                <strong>Your best time</strong>: {(getHighScore(settings) / MS_IN_SECOND).toFixed(3)} seconds
            </li>
            <li>
                {timeDifference < 0
                    ? <><NewHighScore>New high score!</NewHighScore>{timeDifference > -Infinity && <strong> Difference: </strong>}</>
                    : <><strong>High score difference:</strong> +</>}{timeDifference > -Infinity && <>{(timeDifference / MS_IN_SECOND).toFixed(3)} seconds</>}
            </li>
        </NoBulletList>
    </>;

const Emoji = styled.span`
    font-size: 48px;
`;

const Text = styled.div`
    display: flex;
`;

const NoBulletList = styled.ul`
    list-style: none;
    padding-left: 15px;
    margin-top: 5px;
`;

const NewHighScore = styled.strong`
    color: orange;
`;
