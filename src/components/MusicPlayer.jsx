import { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";
import { usePlayer } from "../context/PlayerContext";

export default function MusicPlayer(/* props ignored - using context */) {
  const { playlist, currentIndex, setCurrentIndex } = usePlayer();
  const song = playlist?.[currentIndex] ?? null;

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);

  // Fetch signed URL from Supabase when song changes
  useEffect(() => {
    if (!song || !song.file_url) {
      setAudioUrl(null);
      return;
    }

    let cancelled = false;

    const getSignedUrl = async () => {
      const { data, error } = await supabase.storage
        .from("songs") // your bucket name in Supabase Storage
        .createSignedUrl(song.file_url, 60 * 60); // 1-hour validity

      if (error) {
        console.error("Error fetching signed URL:", error);
        return;
      }

      if (!cancelled) setAudioUrl(data.signedUrl);
    };

    getSignedUrl();

    return () => {
      cancelled = true;
    };
  }, [song]);

  // auto-play when audioUrl is ready
  useEffect(() => {
    if (!audioRef.current) return;
    if (!audioUrl) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    audioRef.current.src = audioUrl;
    audioRef.current.currentTime = 0;
    const tryPlay = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        // autoplay may be blocked by browser; keep isPlaying false
        setIsPlaying(false);
      }
    };
    tryPlay();
  }, [audioUrl]);

  // Update current time as the song plays
  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  // When metadata loads (duration known)
  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleEnded = async () => {
    if (currentIndex < playlist.length - 1) {
      setCurrentIndex(currentIndex + 1);
      // next track will auto-play via audioUrl effect
    } else {
      setIsPlaying(false);
    }
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={audioUrl || ""}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />
      <div className="player-info">
        <h4>{song ? song.song_name : "No song selected"}</h4>
        <p>{song ? song.album_name : ""}</p>
      </div>

      <div className="player-controls">
        <button onClick={togglePlay} className="play-button">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <div className="player-progress">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.currentTime = e.target.value;
                setCurrentTime(e.target.value);
              }
            }}
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>
    </div>
  );
}
