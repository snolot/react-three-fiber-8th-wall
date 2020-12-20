import {
    string,
    shape,
    func,
} from 'prop-types';

import React, { useEffect, useRef, useState } from 'react';
import PortalModal from './elements/PortalModal';
import use8thWall from './hooks/use8thWall';

// eslint-disable-next-line import/prefer-default-export
export function withLauncher(Experience) {
    function WrappedExperience({
        appKey,
        xr8Config,
        updateCtx,
        ...props
    }) {
        

        // 8th wall loading
        const cameraFeed = useRef(null);
        
        const XR8 = use8thWall(appKey, cameraFeed.current);

        return (
            <>
                <PortalModal rootElement={document.body}>
                    <canvas
                        ref={cameraFeed}
                    />
                </PortalModal>
                {XR8 && (
                    <Experience
                        XR8={XR8}
                        xr8Config={xr8Config}
                        {...props}
                    />
                )}
            </>
        );
    }

    WrappedExperience.propTypes = {
        baseUrl: string.isRequired,
        appKey: string.isRequired,
        xr8Config: shape({}).isRequired,
        onComplete: func.isRequired,
        updateCtx: func,
    };

    WrappedExperience.defaultProps = {
        updateCtx: undefined,
    };

    return (props) => <WrappedExperience {...props} />;
}

