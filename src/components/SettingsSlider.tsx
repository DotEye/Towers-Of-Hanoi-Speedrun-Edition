import React from 'react';
import styled from 'styled-components';
import {Settings} from '../util/types';

interface Props {
    settings: Settings;
    setSettings: (settings: Settings) => void;
    settingsKey: 'disks' | 'stacks' | 'startStack' | 'endStack';
    min: number;
    max: number;
    disabled: boolean;
    resetGame: (settings: Settings) => void;
}

export const SettingsSlider = ({settings, setSettings, settingsKey, min, max, disabled, resetGame}: Props) =>
    <LongInput
        type="range"
        min={min}
        max={max}
        value={settings[settingsKey]}
        disabled={disabled}
        onChange={event => {
            const newSettings = {...settings, [settingsKey]: parseInt(event.target.value)};
            setSettings(newSettings);
            resetGame(newSettings);
        }}
    />;

const LongInput = styled.input`
    width: 300px;

    // For consistency with Safari.
    ::-webkit-slider-runnable-track {
        background-color: #222;
        border-radius: 10px;
    }
`;
