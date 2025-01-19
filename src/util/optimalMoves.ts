import {Settings} from './types';

/**
 * A memoized implementation of the Frame-Stewart algorithm for
 * calculating the optimal moves given the number of disks and stacks.
 *
 * https://en.wikipedia.org/wiki/Tower_of_Hanoi#Frame%E2%80%93Stewart_algorithm
 */
const memo: {[disks: number]: {[stacks: number]: number}} = {};
const frameStewartMemo = (disks: number, stacks: number) => {
    if (disks in memo && stacks in memo[disks]) return memo[disks][stacks];
    const result = frameStewart(disks, stacks);
    if (!(disks in memo)) memo[disks] = {};
    memo[disks][stacks] = result;
    return result;
};

const frameStewart = (disks: number, stacks: number) => {
    if (disks === 0) return 0;
    if (stacks > 1 && disks === 1) return 1;
    if (stacks === 3) return 2 ** disks - 1;
    if (stacks >= 3 && disks > 0) {
        let min = Infinity;
        for (let i = 1; i < disks; ++i) {
            const moves = 2 * frameStewartMemo(i, stacks) + frameStewartMemo(disks - i, stacks - 1);
            if (moves < min) min = moves;
        }
        return min;
    }
    return Infinity;
};

export const optimalMoves = (settings: Settings) => {
    if (!settings.anyEndStack && settings.startStack === settings.endStack) return 0;
    if (settings.illegalMoves && !(settings.stacks < 3 && settings.disks > 1)) return settings.disks * 2 - 1;
    return frameStewartMemo(settings.disks, settings.stacks);
};
