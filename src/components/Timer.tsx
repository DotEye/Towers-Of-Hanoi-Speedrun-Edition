import {useEffect, useState} from 'react';
import {timeDifference} from '../util/time';

interface Props {
    startTime: number | null;
    endTime: number | null;
}

export const Timer = ({startTime, endTime}: Props) => {
    const [dummy, setDummy] = useState(0);

    useEffect(() => {
        if (endTime) return;

        // Force a re-render every 10 milliseconds.
        const interval = setInterval(() => setDummy(dummy + 1), 10);

        return () => clearInterval(interval);
    });

    return startTime ? <>{timeDifference(startTime, endTime)} seconds</> : <>Not started</>;
};
