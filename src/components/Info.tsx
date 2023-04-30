import React from 'react';
import styled from 'styled-components';
import {Button} from './Button';
import {Menu} from './Menu';
import {Settings} from '../util/types';

interface Props {
    onClose: () => void;
    settings: Settings;
}

export const Info = ({onClose, settings}: Props) =>
    <Menu title="Welcome to Towers of Hanoi - Speedrun Edition.">
        <p>This is an online version of <Link href="https://en.wikipedia.org/wiki/Tower_of_Hanoi">Towers of Hanoi</Link>,
            where the controls are optimized for speed.
            Your goal is to move all disks to the far right stack.
            You can only move one disk at a time, and you cannot place a larger disk on top of a smaller one.</p>
        <p>There are two ways to control this game.</p>
        <h2>Fast (2 keystrokes per move / easy to learn)</h2>
        <p>
            Use the number keys to pickup/place disks at the corresponding stack number.
            For example, to pick up a disk from the first stack and place it on the third stack, press <strong>1</strong> and then <strong>3</strong>.
        </p>
        <h2>Super Fast (1 keystroke per move / hard to learn)</h2>
        <p>Press the following keys to instantly perform the move.</p>
        <ul>
            <li><strong>{settings.keyBind21}</strong> - move from stack <strong>2</strong> to stack <strong>1</strong></li>
            <li><strong>{settings.keyBind12}</strong> - move from stack <strong>1</strong> to stack <strong>2</strong></li>
            <li><strong>{settings.keyBind13}</strong> - move from stack <strong>1</strong> to stack <strong>3</strong></li>
            <li><strong>{settings.keyBind31}</strong> - move from stack <strong>3</strong> to stack <strong>1</strong></li>
            <li><strong>{settings.keyBind32}</strong> - move from stack <strong>3</strong> to stack <strong>2</strong></li>
            <li><strong>{settings.keyBind23}</strong> - move from stack <strong>2</strong> to stack <strong>3</strong></li>
        </ul>
        <p><strong>Note</strong>: Super fast controls are designed for 3 stack games.
            These key binds can be customized in the settings.</p>
        <Footer>
            <span><Button onClick={onClose}>Close</Button></span>
            <span>Made with ♥ by <Link href="https://doteye.online">.i</Link></span>
            <span>Join the <Link href="https://discord.gg/tykwEuuYCt">Discord</Link></span>
            <span><Link href="https://doteye.online/privacy">Privacy Policy</Link></span>
        </Footer>
    </Menu>;

const Link = styled.a.attrs(() => ({
    target: '_blank',
}))`
    color: lightskyblue;
`;

const Footer = styled.div`
    display: flex;
    align-items: center;

    span {
        flex-grow: 1;
        text-align: center;
    }
`;
