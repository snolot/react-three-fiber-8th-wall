import React, { useEffect, useState } from 'react';

const useScript = (url) => {
    const [isReady, setIsReady] = useState(false);
    const [script, setScript] = useState(null);

    useEffect(() => {
        if (url) {
            const scr = document.createElement('script');
            scr.type = 'text/javascript';
            scr.src = url;
            scr.async = true;

            scr.addEventListener('load', () => {
                setIsReady(true);
            });

            document.body.append(scr);
            setScript(scr);
        }
    }, [url]);

    // eslint-disable-next-line unicorn/consistent-function-scoping
    useEffect(() => () => {
        if (script) {
            document.body.removeChild(script);
        }
    }, [script]);

    return isReady;
};

export default useScript;
