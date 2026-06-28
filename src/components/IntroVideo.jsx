import { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

const IntroVideo = ({ src = '/intro.mp4', autoPlay = true, storageKey = 'introPlayed' }) => {
  const [visible, setVisible] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(storageKey)) return;

    let mounted = true;
    const checkVideo = async () => {
      try {
        const res = await fetch(src, { method: 'HEAD' });
        if (!mounted) return;
        if (res.ok) setVisible(true);
      } catch (err) {
        // network or missing file -> skip showing
      }
    };
    checkVideo();

    const onStop = () => setVisible(false);
    window.addEventListener('intro:stop', onStop);
    return () => { mounted = false; window.removeEventListener('intro:stop', onStop); };
  }, [src, storageKey]);

  useEffect(() => {
    if (!visible) return;
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        video.muted = false;
        await video.play();
      } catch (err) {
        // if autoplay is blocked, keep the background video invisible until user interacts
      }
    };

    tryPlay();
  }, [visible]);

  if (!visible) return null;

  return (
    <video
      ref={videoRef}
      className="intro-video-background"
      src={src}
      autoPlay={autoPlay}
      muted={false}
      playsInline
      loop
      onError={() => setVisible(false)}
    />
  );
};

IntroVideo.propTypes = {
  src: PropTypes.string,
  autoPlay: PropTypes.bool,
  storageKey: PropTypes.string,
};

export default IntroVideo;
