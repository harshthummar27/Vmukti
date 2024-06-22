import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const HlsPlayer = ({ src, controls, autoPlay, muted, width, height }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const initPlayer = () => {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (autoPlay) {
            videoRef.current.play();
          }
        });
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        videoRef.current.src = src;
        videoRef.current.addEventListener('loadedmetadata', () => {
          if (autoPlay) {
            videoRef.current.play();
          }
        });
      } else {
        console.error('HLS is not supported and no compatible player found.');
      }
    };

    if (src) {
      initPlayer();
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeAttribute('src');
      }
    };
  }, [src, autoPlay]);

  return (
    <video
      ref={videoRef}
      controls={controls}
      muted={muted}
      style={{ width: width, height: height }}
    />
  );
};

export default HlsPlayer;
