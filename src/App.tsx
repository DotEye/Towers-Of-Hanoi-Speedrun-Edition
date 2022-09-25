import React, {useEffect} from 'react';
import {Game} from './components/Game';
import {isMobileOrTablet} from './util/isMobileOrTablet';

export const App = () => {
    useEffect(() => {
        if (isMobileOrTablet()) alert('Heads up: this website uses raw keyboard input. If you are playing on a phone or tablet, you will need to connect a keyboard.');
    }, []);

    return <Game/>;
};
