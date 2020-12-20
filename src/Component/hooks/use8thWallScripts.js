import { useEffect, useState } from 'react';
import useScript from './useScript';

const use8thwallScripts = (appKey) => {
    const [isReady, setIsReady] = useState(false);
    const isScriptXrwebReady = useScript(`//apps.8thwall.com/xrweb?appKey=${appKey}`);
    const isScriptXrextrasReady = useScript('//cdn.8thwall.com/web/xrextras/xrextras.js');

    useEffect(() => {
        if (isScriptXrwebReady && isScriptXrextrasReady) {
            setIsReady(true);
        }
    }, [isScriptXrwebReady, isScriptXrextrasReady]);

    return isReady;
};

export default use8thwallScripts;
