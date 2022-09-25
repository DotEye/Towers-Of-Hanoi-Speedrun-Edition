import {isMobileOrTablet} from './isMobileOrTablet';
import {Settings} from './types';
import {timeDifference} from './time';
import {MS_IN_SECOND} from './constants';
import {optimalMoves} from './optimalMoves';

export const share = async (startTime: number, endTime: number, numMoves: number, numOptimalMoves: number, settings: Settings) =>
    await shareText(
        '⬛⬛🟩⬛⬛' +
        '\n⬛🟦🟦🟦⬛' +
        '\n🟥🟥🟥🟥🟥' +
        '\nTowers of Hanoi - Speedrun Edition Result:' +
        `\n📚 ${settings.disks} disks` +
        `\n⌛ ${timeDifference(startTime, endTime)} seconds` +
        `\n♟️ ${numMoves}/${numOptimalMoves} moves` +
        `\n🚀 ${(MS_IN_SECOND * optimalMoves(settings) / (endTime - startTime)).toFixed(2)} optimal moves/second` +
        (numMoves === numOptimalMoves ? '\n✨ Optimal solution' : '') +
        (settings.blindfold ? '\n🙈 Blindfolded' : '') +
        (settings.illegalMoves ? '\n🚨 Illegal moves' : '') +
        (settings.startStack === settings.endStack ? '\n😞 Cheater' : '')
    );

export const shareText = async (text: string) => {
    if (isMobileOrTablet() && navigator.share) {
        try {
            await navigator.share({
                title: 'Towers of Hanoi - Speedrun Edition',
                text,
            })
        } catch {
            await copyToClipboard(text);
        }
    } else {
        await copyToClipboard(text);
    }
};

export const copyToClipboard = async (text: string) => new Promise((resolve, reject) =>
    navigator.clipboard.writeText(text).then(resolve).catch(() => {
        alert('Sharing failed or was cancelled.');
        reject();
    }));
