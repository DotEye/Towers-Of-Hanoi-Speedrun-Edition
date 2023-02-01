import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Disk} from './Disk';
import {Stack} from './Stack';
import {defaultSettings} from '../util/defaultSettings';
import {SettingsMenu} from './SettingsMenu';
import styled from 'styled-components';
import {NavBar} from './NavBar';
import {optimalMoves} from '../util/optimalMoves';
import {Win} from './Win';
import {setHighScore} from '../util/highScore';
import {Info} from './Info';
import {Moves, Settings} from '../util/types';
import {isWinning} from '../util/isWinning';
import {MAX_DISK_HEIGHT, MIN_DISK_WIDTH_INCREMENT, TOP_DISK_MARGIN} from '../util/constants';

export const Game = () => {
    const [stacks, setStacks] = useState([[0]]);
    const [holding, setHolding] = useState<{width: number, from: number} | null>(null);
    const [moves, setMoves] = useState<Moves>([]);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [endTime, setEndTime] = useState<number | null>(null);
    const [settings, setSettings] = useState(defaultSettings);
    const [settingsShown, setSettingsShown] = useState(false);
    const [infoShown, setInfoShown] = useState(true);
    const [timeDifference, setTimeDifference] = useState(0);
    const [, rerender] = useState(0);

    const stacksRef = useRef<HTMLDivElement>(null);

    const resetGame = useCallback((newSettings: Settings) => {
        const stacks = [];
        for (let i = 0; i < newSettings.stacks; ++i) stacks.push([]);
        stacks[Math.min(newSettings.startStack, newSettings.stacks) - 1] = Array.from({length: newSettings.disks}, (_, i) => i + 1);
        setStacks(stacks);

        setHolding(null);
        setStartTime(null);
        setEndTime(null);
        setMoves([]);
    }, []);

    const resetSettings = useCallback(() => {
        setSettings(defaultSettings);
        resetGame(defaultSettings);
    }, [resetGame]);

    const undo = useCallback(() => {
        const newStacks = [...stacks];

        if (holding) {
            newStacks[holding.from].unshift(holding.width);
            setHolding(null);
        } else {
            if (moves.length === 0) return;
            const newMoves = [...moves];
            const lastMove = newMoves.splice(newMoves.length - 1, 1)[0];
            newStacks[lastMove.from].unshift(stacks[lastMove.to][0]);
            newStacks[lastMove.to].shift();
            setMoves(newMoves);
        }

        setStacks(newStacks);
    }, [stacks, holding, moves]);

    const checkForWin = () => {
        if (isWinning(stacks, settings)) {
            const now = Date.now();
            setTimeDifference(setHighScore(settings, now - (startTime ?? now)));
            setEndTime(now);
        }
    };

    const onKeyDown = (event: KeyboardEvent) => {
        const key = event.key.toLowerCase();
        if (key === settings.keyReset) {
            resetGame(settings);
            return;
        }
        if (endTime) return;
        if (key === settings.keyUndo) {
            undo();
            return;
        }

        const newStacks = [...stacks];
        const move = (from: number, to: number) => {
            if (from >= settings.stacks || to >= settings.stacks) return;
            if (!settings.illegalMoves && stacks[to][0] < newStacks[from][0]) return;
            const disk = newStacks[from].shift();
            if (!disk) return;
            if (moves.length === 0) setStartTime(Date.now());
            setMoves(moves.concat([{from, to}]));
            newStacks[to].unshift(disk);
            setStacks(newStacks);
            checkForWin();
        }
        if (!holding) {
            if (key === settings.keyBind21) move(1, 0);
            else if (key === settings.keyBind12) move(0, 1);
            else if (key === settings.keyBind13) move(0, 2);
            else if (key === settings.keyBind31) move(2, 0);
            else if (key === settings.keyBind32) move(2, 1);
            else if (key === settings.keyBind23) move(1, 2);
        }
        const numberKey = Number(key) - 1;
        if (isNaN(numberKey)) return;
        if (numberKey < 0 || numberKey >= stacks.length) return;
        if (holding) {
            if (!settings.illegalMoves && stacks[numberKey][0] < holding.width) return;

            const newStacks = [...stacks];
            newStacks[numberKey].unshift(holding.width);
            setStacks(newStacks);
            setHolding(null);

            if (holding.from !== numberKey) setMoves(moves.concat([{from: holding.from, to: numberKey}]));
            checkForWin();
        } else {
            setHolding(stacks[numberKey][0] ? {
                width: stacks[numberKey][0],
                from: numberKey,
            } : null);
            if (moves.length === 0) setStartTime(Date.now());

            const newStacks = [...stacks];
            newStacks[numberKey].shift();
            setStacks(newStacks);
        }

        // Don't allow multiple moves per render.
        document.removeEventListener('keydown', onKeyDown);
    };

    const getWidth = (size: number) => {
        if (!stacksRef.current) return 0;
        const maxWidth = (stacksRef.current.firstChild as HTMLDivElement).offsetWidth;
        return settings.disks * MIN_DISK_WIDTH_INCREMENT > maxWidth
            ? size / settings.disks * maxWidth
            : size * MIN_DISK_WIDTH_INCREMENT;
    };

    const getColor = (size: number) => size / settings.disks;

    const resize = () => rerender(x => x + 1);

    useEffect(() => {
        document.addEventListener('keydown', onKeyDown);
        window.addEventListener('resize', resize);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
            window.removeEventListener('resize', resize);
        }
    });

    // Resize once after initial page load and when settings change.
    useEffect(resize, [settings]);

    // Load settings on initial page load.
    useEffect(() => {
        const rawSettings = window.localStorage.getItem('settings');
        if (rawSettings) {
            const newSettings = JSON.parse(rawSettings);
            setInfoShown(false);
            setSettings(newSettings);
            resetGame(newSettings);
            return;
        }
        resetGame(defaultSettings);
    }, [resetGame]);

    // Save settings on change.
    useEffect(() => {
        window.localStorage.setItem('settings', JSON.stringify(settings));
    }, [settings]);

    const stackWidth = 100 / settings.stacks;
    const diskHeight = Math.min((window.innerHeight - TOP_DISK_MARGIN) / settings.disks, MAX_DISK_HEIGHT);

    return (
        <>
            <NavBar
                startTime={startTime}
                endTime={endTime}
                numMoves={moves.length}
                optimalMoves={optimalMoves(settings)}
                settings={settings}
                undo={undo}
                reset={resetGame}
                toggleSettings={() => setSettingsShown(!settingsShown)}
                toggleInfo={() => setInfoShown(!infoShown)} />
            {infoShown && <Info onClose={() => setInfoShown(false)} settings={settings} />}
            {settingsShown && <SettingsMenu
                settings={settings}
                setSettings={setSettings}
                resetSettings={resetSettings}
                resetGame={resetGame}
                moves={moves}
                endTime={endTime}
                close={() => setSettingsShown(false)} />}
            {startTime && endTime && <Win moves={moves} settings={settings} startTime={startTime} endTime={endTime} timeDifference={timeDifference} />}

            {settings.blindfold && <Blindfold>[blindfold enabled]</Blindfold>}
            <Main blindfold={settings.blindfold}>
                {holding && <Disk $width={getWidth(holding.width)} $height={diskHeight} $color={getColor(holding.width)} $holding>{settings.diskNumbers ? holding.width : <>&nbsp;</>}</Disk>}
                <Stacks ref={stacksRef}>
                    {stacks.map((stack, key) =>
                        <Stack
                            key={key}
                            width={stackWidth}
                            showPeg={settings.showPegs}
                            numDisks={settings.disks}
                        >
                            {stack.map((index, key) => <Disk key={key} $width={getWidth(index)} $height={diskHeight} $color={getColor(index)}>{settings.diskNumbers ? index : <>&nbsp;</>}</Disk>)}
                        </Stack>
                    )}
                </Stacks>
            </Main>
        </>
    );
};

const Stacks = styled.div`
    position: fixed;
    bottom: 0;
    width: 100%;
    pointer-events: none;
    z-index: -1;
`;

const Main = styled.main<{blindfold: boolean}>`
    visibility: ${p => p.blindfold ? 'hidden' : 'unset'};
`;

const Blindfold = styled.h1`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    margin: 0;
`;
