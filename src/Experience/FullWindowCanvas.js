import * as THREE from 'three';
import React, { useEffect, useState, useRef } from 'react';
import { Canvas, useThree } from 'react-three-fiber';

const FullWindowCanvas = () => {
	const {gl} = useThree();

	const {
	    XR8,
	    THREE,
	} = window;

	const vsize_ = {}
  	let orientation_ = 0
  	let mycanvas_ = gl.domElement
  	let canvas_ 

  	const canvasStyle_ = {
	    position: 'static',
	    width: '100%',
	    height: '100%',
	    margin: '0px',
	    padding: '0px',
	    border: '0px',
	    display: 'block',
	    top: '0px',
	    left: '0px',
  	}

	const mycanvasStyle_ = {
	    position: 'fixed',
	    width: '100%',
	    height: '100%',
	    margin: '0px',
	    padding: '0px',
	    border: '0px',
	    display: 'block',
	    top: '0px',
	    left: '0px'
  	}

  	const bodyStyle_ = {
		width: '100%',
		height: '100%',
			margin: '0px',
		padding: '0px',
		border: '0px',
	}

	const fillScreenWithCanvas = () => {
		if (!canvas_) { return }
		// Get the pixels of the browser window.
	    const uww = window.innerWidth
	    const uwh = window.innerHeight
	    const ww = uww * devicePixelRatio
	    const wh = uwh * devicePixelRatio

		// Wait for orientation change to take effect before handline resize.
		if (((orientation_ === 0 || orientation_ === 180) && ww > wh) || ((orientation_ === 90 || orientation_ === -90) && wh > ww)) {
				window.requestAnimationFrame(fillScreenWithCanvas)
				return
		}
		
		// Compute the portrait-orientation aspect ratio of the browser window.
	    const ph = Math.max(ww, wh)
	    const pw = Math.min(ww, wh)
	    const pa = ph / pw
	    // Compute the portrait-orientation dimensions of the video.
	    const pvh = Math.max(vsize_.w, vsize_.h)
	    const pvw = Math.min(vsize_.w, vsize_.h)
	    // Compute the cropped dimensions of a video that fills the screen, assuming that width is
	    // cropped.
	    let ch = pvh
	    let cw = Math.round(pvh / pa)
		// Figure out if we should have cropped from the top, and if so, compute a new cropped video
		// dimension.
		if (cw > pvw) {
			cw = pvw
			ch = Math.round(pvw * pa)
		}
		
		// If the video has more pixels than the screen, set the canvas size to the screen pixel
		// resolution.
		if (cw > pw || ch > ph) {
			cw = pw
			ch = ph
		}

		// Switch back to a landscape aspect ratio if required.
		if (ww > wh) {
			let tmp = cw
			cw = ch
			ch = tmp
		}

		// Set the canvas geometry to the new window size.
		Object.assign(canvas_.style, canvasStyle_)
		canvas_.width = cw
		canvas_.height = ch
		Object.assign(mycanvas_.style, mycanvasStyle_)
		mycanvas_.width = cw
		mycanvas_.height = ch

		// on iOS, rotating from portrait to landscape back to portrait can lead to a situation where
	    // address bar is hidden and the content doesn't fill the screen. Scroll back up to the top in
	    // this case. In chrome this has no effect. We need to scroll to something that's not our
	    // scroll position, so scroll to 0 or 1 depending on the current position.
	    setTimeout(() => window.scrollTo(0, (window.scrollY + 1) % 2), 300)
	}

	const updateVideoSize = ({videoWidth, videoHeight}) => {
		vsize_.w = videoWidth
		vsize_.h = videoHeight
	}

	useEffect(() => {
		XR8.addCameraPipelineModule({
			name: 'fullwindow-canvas',
			onUpdate,
			onStart,
			onDeviceOrientationChange,
			onCanvasSizeChange,
			onVideoSizeChange,
			onCameraStatusChange
		});
	});

	const onUpdate = () => {
		if (canvas_.style.width === canvasStyle_.width && canvas_.style.height === canvasStyle_.height) {
  			return
		}

		fillScreenWithCanvas()
	}

	const onStart = ({canvas, orientation}) => {

		canvas_ = canvas
		orientation_ = orientation
		canvas_.style = canvasStyle_
		mycanvas_.style = mycanvasStyle_
		const body = document.getElementsByTagName('body')[0]
		Object.assign(body.style, bodyStyle_)
		body.appendChild(canvas_)

		fillScreenWithCanvas()
	}

	const onVideoSizeChange = ({videoWidth, videoHeight}) => {
		updateVideoSize({videoWidth, videoHeight})
		fillScreenWithCanvas()
	}

	const onCanvasSizeChange = () => {
		fillScreenWithCanvas()
	}

	const onDeviceOrientationChange = ({orientation}) => {

		orientation_ = orientation
		fillScreenWithCanvas()
	}

	const onCameraStatusChange = ({status, video}) => {
		if (status !== 'hasVideo') {
  			return
		}

		updateVideoSize(video)
	}

	return (
		<>
		</>
	)
} 

export default FullWindowCanvas;