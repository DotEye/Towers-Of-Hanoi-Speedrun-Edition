import {optimalMoves} from './optimalMoves';
import {Settings} from './types';
import {MS_IN_SECOND} from './constants';

const getNumberAndUnit = (settings: Settings) => {
    const seconds = optimalMoves(settings) / 3;
    if (seconds < 60) return {number: seconds, unit: 'seconds'};

    const minutes = (seconds / 60);
    if (minutes < 60) return {number: minutes, unit: 'minutes'};

    const hours = (minutes / 60);
    if (hours < 60) return {number: hours, unit: 'hours'};

    const days = (hours / 24);
    if (days < 365) return {number: days, unit: 'days'};

    const years = (days / 365);
    return {number: years, unit: 'years'};
};

export const estimatedTime = (settings: Settings) => {
    const {number, unit} = getNumberAndUnit(settings);
    return `${number === Infinity ? '∞' : `${number.toFixed(2)} ${unit}`}`;
};

export const timeDifference = (startTime: number, endTime: number | null) =>
    (((endTime ?? Date.now()) - startTime) / MS_IN_SECOND).toFixed(3);
