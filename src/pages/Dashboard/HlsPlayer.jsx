import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HlsPlayer = React.forwardRef(
  ({ src, controls, autoPlay, muted, width, height }, ref) => {
    const videoRef = useRef(null);

    useEffect(() => {
      let hls = null;

      const initPlayer = () => {
        if (Hls.isSupported()) {
          hls = new Hls();
          hls.loadSource(src);
          hls.attachMedia(videoRef.current);
          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            if (autoPlay) {
              videoRef.current.play();
            }
          });
        } else if (
          videoRef.current &&
          videoRef.current.canPlayType("application/vnd.apple.mpegurl")
        ) {
          videoRef.current.src = src;
          videoRef.current.addEventListener("loadedmetadata", () => {
            if (autoPlay) {
              videoRef.current.play();
            }
          });
        } else {
          console.error("HLS is not supported and no compatible player found.");
        }
      };

      if (src) {
        initPlayer();
      }

      return () => {
        if (hls) {
          hls.destroy();
        }
        if (videoRef.current) {
          videoRef.current.removeAttribute("src");
          videoRef.current.load();
        }
      };
    }, [src, autoPlay]);

    // Forward the ref to the video element
    React.useImperativeHandle(ref, () => ({
      getVideoElement: () => videoRef.current,
    }));

    return (
      <video
        ref={videoRef}
        controls={controls}
        muted={muted}
        autoPlay={autoPlay}
        width={width}
        height={height}
        style={{ width, height }}
      />
    );
  }
);

export default HlsPlayer;
