import {Settings} from './types';
import {compareObjects} from './compareObjects';

export const isWinning = (stacks: number[][], settings: Settings) => {
    const endStack = settings.anyEndStack
        ? stacks.findIndex(stack => stack.length > 0)
        : Math.min(settings.endStack, settings.stacks) - 1;
    return endStack !== settings.startStack - 1 && stacks[endStack].length === settings.disks && compareObjects(
        stacks[endStack],
        Array.from({length: settings.disks}, (_, i) => i + 1),
    );
};
