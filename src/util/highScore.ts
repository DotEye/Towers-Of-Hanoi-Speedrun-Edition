import {Settings} from './types';

const makeKey = (settings: Settings) => `HighScore/${settings.disks}/${settings.stacks}/${settings.illegalMoves}/${settings.blindfold}/${settings.startStack === settings.endStack}`;

export const getHighScore = (settings: Settings) => {
    const score = localStorage.getItem(makeKey(settings));
    return score ? parseInt(score) : Infinity;
};

export const setHighScore = (settings: Settings, score: number) => {
    const diff = score - getHighScore(settings);
    if (diff < 0) localStorage.setItem(makeKey(settings), score.toString());
    return diff;
};
