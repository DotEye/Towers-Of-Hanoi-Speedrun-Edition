import React from 'react';
import {defaultSettings} from '../util/defaultSettings';
import {SettingsSlider} from './SettingsSlider';
import {estimatedTime} from '../util/time';
import styled from 'styled-components';
import {compareObjects} from '../util/compareObjects';
import {Button} from './Button';
import {Menu} from './Menu';
import {KeyBind} from './KeyBind';
import {Moves, Settings} from '../util/types';
import {getHighScore} from '../util/highScore';
import {MS_IN_SECOND} from '../util/constants';

interface Props {
    settings: Settings;
    setSettings: (settings: Settings) => void;
    resetGame: (settings: Settings) => void;
    resetSettings: () => void;
    moves: Moves;
    endTime: number | null;
    close: () => void;
}

export const SettingsMenu = ({settings, setSettings, resetGame, resetSettings, moves, endTime, close}: Props) => {
    const disabled = moves.length > 0 && !endTime;

    const highScore = getHighScore(settings);
    return (
        <Menu title="Settings">
            <table>
                <tbody>
                    <tr>
                        <td><SettingsSlider disabled={disabled} settings={settings} setSettings={setSettings} settingsKey="disks" resetGame={resetGame} min={1} max={30} /></td>
                        <td>Disks ({settings.disks})</td>
                    </tr>
                    <tr>
                        <td><SettingsSlider disabled={disabled} settings={settings} setSettings={setSettings} settingsKey="stacks" resetGame={resetGame} min={2} max={9} /></td>
                        <td>Stacks ({settings.stacks})</td>
                    </tr>
                    <tr>
                        <td><SettingsSlider disabled={disabled} settings={settings} setSettings={setSettings} settingsKey="startStack" resetGame={resetGame} min={1} max={settings.stacks} /></td>
                        <td>Start Stack ({Math.min(settings.startStack, settings.stacks)})</td>
                    </tr>
                    <tr>
                        <td><SettingsSlider disabled={disabled} settings={settings} setSettings={setSettings} settingsKey="endStack" resetGame={resetGame} min={1} max={settings.stacks} /></td>
                        <td>End Stack ({Math.min(settings.endStack, settings.stacks)})</td>
                    </tr>
                    <tr>
                        <RightAligned><input type="checkbox" disabled={disabled} checked={settings.illegalMoves} onChange={event => {
                            const newSettings = {...settings, illegalMoves: event.target.checked};
                            setSettings(newSettings);
                            resetGame(newSettings);
                        }}/></RightAligned>
                        <td>Illegal moves</td>
                    </tr>
                    <tr>
                        <RightAligned><input type="checkbox" disabled={disabled} checked={settings.blindfold} onChange={event => {
                            const newSettings = {...settings, blindfold: event.target.checked};
                            setSettings(newSettings);
                            resetGame(newSettings);
                        }}/></RightAligned>
                        <td>Blindfold</td>
                    </tr>
                    <tr>
                        <RightAligned><input type="checkbox" checked={settings.showPegs} onChange={event => setSettings({...settings, showPegs: event.target.checked})}/></RightAligned>
                        <td>Show pegs</td>
                    </tr>
                    <tr>
                        <RightAligned><input type="checkbox" checked={settings.diskNumbers} onChange={event => setSettings({...settings, diskNumbers: event.target.checked})}/></RightAligned>
                        <td>Disk numbers</td>
                    </tr>
                    <tr>
                        <RightAligned><KeyBind value={settings.keyUndo} onChange={value => setSettings({...settings, keyUndo: value})} /></RightAligned>
                        <td>Undo shortcut</td>
                    </tr>
                    <tr>
                        <RightAligned><KeyBind value={settings.keyReset} onChange={value => setSettings({...settings, keyReset: value})} /></RightAligned>
                        <td>Reset shortcut</td>
                    </tr>
                    <tr>
                        <RightAligned><KeyBind value={settings.keyBind12} onChange={value => setSettings({...settings, keyBind12: value})} /></RightAligned>
                        <td>Super fast move 1 &rarr; 2</td>
                    </tr>
                    <tr>
                        <RightAligned><KeyBind value={settings.keyBind13} onChange={value => setSettings({...settings, keyBind13: value})} /></RightAligned>
                        <td>Super fast move 1 &rarr; 3</td>
                    </tr>
                    <tr>
                        <RightAligned><KeyBind value={settings.keyBind21} onChange={value => setSettings({...settings, keyBind21: value})} /></RightAligned>
                        <td>Super fast move 2 &rarr; 1</td>
                    </tr>
                    <tr>
                        <RightAligned><KeyBind value={settings.keyBind23} onChange={value => setSettings({...settings, keyBind23: value})} /></RightAligned>
                        <td>Super fast move 2 &rarr; 3</td>
                    </tr>
                    <tr>
                        <RightAligned><KeyBind value={settings.keyBind31} onChange={value => setSettings({...settings, keyBind31: value})} /></RightAligned>
                        <td>Super fast move 3 &rarr; 1</td>
                    </tr>
                    <tr>
                        <RightAligned><KeyBind value={settings.keyBind32} onChange={value => setSettings({...settings, keyBind32: value})} /></RightAligned>
                        <td>Super fast move 3 &rarr; 2</td>
                    </tr>
                </tbody>
            </table>
            <Bottom>
                <Button onClick={() => resetSettings()} disabled={compareObjects(settings, defaultSettings) || disabled}>Default Settings</Button>{' '}
                <div>
                    {highScore === Infinity ? 'There is no high score for these settings.' : `Your high score for these settings: ${(highScore / MS_IN_SECOND).toFixed(3)} seconds`}<br />
                    Estimated time for an expert player: {estimatedTime(settings)}
                </div>
            </Bottom>
            <CloseWrapper>
                <Button onClick={() => close()}>Close</Button>
            </CloseWrapper>
            {settings.stacks < 3 && settings.disks > 1 &&
                <Warning>Warning: Game is impossible. Increase number of stacks or decrease number of disks.</Warning>
            }
            {disabled &&
                <Warning>Some settings are disabled because a game is in progress. Reset the game to enable them.</Warning>
            }
        </Menu>
    );
};

const Warning = styled.div`
    font-weight: bold;
    margin-top: 10px;
    color: #ff6a6a;
`;

const RightAligned = styled.td`
    text-align: right;
`;

const Bottom = styled.div`
    display: flex;
    gap: 5px;
`;

const CloseWrapper = styled.div`
    text-align: center;
    margin-top: 10px;
`;
