import { useEffect, useRef, useState } from "react";

// Background clips play back-to-back on a loop. Drop more .mp4 files into
// public/videos/ and list them here to add them to the rotation.
const BACKGROUND_CLIPS = [
  `${import.meta.env.BASE_URL}videos/pokemon-tcg-sun-moon-team-up.mp4`,
  `${import.meta.env.BASE_URL}videos/pokemon-movie-edit.mp4`,
];

function BackgroundVideo() {
  const videoRef = useRef(null);
  const [clipIndex, setClipIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;

    video.load();
    video.play().catch(() => {});
  }, [clipIndex, failed]);

  function handleEnded() {
    setClipIndex((prev) => (prev + 1) % BACKGROUND_CLIPS.length);
  }

  if (failed) {
    return <div className="bg-video-wrap" aria-hidden="true" />;
  }

  return (
    <div className="bg-video-wrap" aria-hidden="true">
      <video
        ref={videoRef}
        className="bg-video"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        onError={() => setFailed(true)}
      >
        <source src={BACKGROUND_CLIPS[clipIndex]} type="video/mp4" />
      </video>
    </div>
  );
}

export default BackgroundVideo;
