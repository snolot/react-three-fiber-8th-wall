import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import use8thWallScripts from './use8thWallScripts';


const use8thWall = (appKey, canvas, ) => {
    const areScriptsReady = use8thWallScripts(appKey);
    const [XR8Object, setXR8Object] = useState(null);

    useEffect(() => {
        if (!XR8Object && areScriptsReady && canvas) {
            const { XRExtras } = window;

            XRExtras.Loading.showLoading({
                onxrloaded: () => {
                    const { XR8 } = window;
                    window.THREE = THREE;

                    XR8.xrController().configure({ disableWorldTracking: false });
                    XR8.addCameraPipelineModules([
                        XR8.GlTextureRenderer.pipelineModule(),
                        XR8.XrController.pipelineModule(),
                        XRExtras.AlmostThere.pipelineModule(),
                        XRExtras.Loading.pipelineModule(),
                        XRExtras.RuntimeError.pipelineModule(),
                    ]);

                    XR8.run({ canvas });

                    setXR8Object(XR8);
                },
            });
        }
    }, [XR8Object, areScriptsReady, canvas]);

    return XR8Object;
};

export default use8thWall;
