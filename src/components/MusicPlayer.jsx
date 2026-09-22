import { useEffect, useRef, useState } from "react";

// Built-in songs shipped with the app, served from public/songs/.
// Drop more .mp3 files in that folder and list them here to add them.
const DEFAULT_TRACKS = [
  {
    name: "Pokémon - Gotta Catch 'Em All",
    url: `${import.meta.env.BASE_URL}songs/OST_Pokemon_Gotta_Catch_Em_All.mp3`,
  },
];

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${minutes}:${secs.toString().padStart(2, "0")}`;
}

function MusicPlayer() {
  const audioRef = useRef(null);
  const tracksRef = useRef([]);

  const [tracks, setTracks] = useState(DEFAULT_TRACKS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  const currentTrack = tracks[currentIndex] ?? null;

  useEffect(() => {
    tracksRef.current = tracks;
  }, [tracks]);

  // Release object URLs when the player unmounts.
  useEffect(() => {
    return () => {
      tracksRef.current.forEach((track) => URL.revokeObjectURL(track.url));
    };
  }, []);

  function handleFiles(event) {
    const files = Array.from(event.target.files);
    if (files.length === 0) return;

    const newTracks = files.map((file) => ({
      name: file.name.replace(/\.[^/.]+$/, ""),
      url: URL.createObjectURL(file),
    }));

    const wasEmpty = tracks.length === 0;
    setTracks((prev) => [...prev, ...newTracks]);
    if (wasEmpty) setCurrentIndex(0);

    event.target.value = "";
  }

  function togglePlay() {
    const audio = audioRef.current;
    if (!currentTrack || !audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  }

  function playTrackAt(index) {
    if (tracks.length === 0) return;
    setCurrentIndex((index + tracks.length) % tracks.length);
  }

  function handleNext() {
    playTrackAt(currentIndex + 1);
  }

  function handlePrev() {
    playTrackAt(currentIndex - 1);
  }

  function handleSeek(event) {
    const time = Number(event.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    setCurrentTime(time);
  }

  // Autoplay the next/previous track when skipping while music is playing.
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className="music-player">
      <div className="music-screen">
        <p className="music-track-name">
          {currentTrack ? currentTrack.name : "No song loaded"}
        </p>
        <div className="music-visualizer" aria-hidden="true">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className={isPlaying ? "music-bar music-bar-animated" : "music-bar"}
              style={{ animationDelay: `${i * 0.09}s` }}
            />
          ))}
        </div>
      </div>

      <input
        type="range"
        className="music-slider"
        min={0}
        max={duration || 0}
        step={0.1}
        value={currentTime}
        onChange={handleSeek}
        disabled={!currentTrack}
        aria-label="Seek song position"
      />
      <div className="music-time">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div className="music-controls">
        <button
          type="button"
          onClick={handlePrev}
          disabled={tracks.length < 2}
          className="music-btn"
          aria-label="Previous song"
        >
          ⏮
        </button>
        <button
          type="button"
          onClick={togglePlay}
          disabled={!currentTrack}
          className="music-btn music-btn-play"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={tracks.length < 2}
          className="music-btn"
          aria-label="Next song"
        >
          ⏭
        </button>
        <button
          type="button"
          onClick={() => setIsLooping((prev) => !prev)}
          disabled={!currentTrack}
          className={`music-btn ${isLooping ? "music-btn-active" : ""}`}
          aria-pressed={isLooping}
          aria-label={isLooping ? "Turn off repeat" : "Repeat this song"}
          title={isLooping ? "Turn off repeat" : "Repeat this song"}
        >
          🔁
        </button>
      </div>

      <label className="music-upload">
        + Add MP3
        <input
          type="file"
          accept="audio/*"
          multiple
          onChange={handleFiles}
          hidden
        />
      </label>

      {tracks.length > 1 && (
        <ol className="music-playlist">
          {tracks.map((track, index) => (
            <li
              key={track.url}
              className={index === currentIndex ? "music-playlist-active" : ""}
              onClick={() => playTrackAt(index)}
            >
              {track.name}
            </li>
          ))}
        </ol>
      )}

      <audio
        ref={audioRef}
        src={currentTrack?.url}
        loop={isLooping}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={(event) => setCurrentTime(event.target.currentTime)}
        onLoadedMetadata={(event) => setDuration(event.target.duration)}
        onEnded={handleNext}
      />
    </div>
  );
}

export default MusicPlayer;
