import { useState, useEffect } from "react";
import { FaPlay, FaDownload, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient";
import "../index.css";
import { usePlayer } from "../context/PlayerContext";

function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

async function fetchAllSongs() {
  const { data, error } = await supabase
    .from("songs")
    .select("*")
    .order("full_catalouge_index", { ascending: true });

  if (error) {
    console.error("Error fetching songs:", error);
    return [];
  }
  return data || [];
}

export default function Catalouge() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const data = await fetchAllSongs();
      if (mounted) setSongs(data);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="releases-page">
      <h2 className="releases-title">Welcome to my Full Catalogue</h2>
      <p style={{ textAlign: "center", marginBottom: "1rem" }}>
        All tracks (including demos and unreleased songs) sorted oldest to latest.
      </p>

      <section className="album-songs">
        {songs.map((song, idx) => (
          <CatalogueSong key={song.id || idx} song={song} index={idx} songs={songs} />
        ))}
      </section>
    </div>
  );
}

function CatalogueSong({ song, index, songs }) {
  const [expanded, setExpanded] = useState(false);
  const { playFrom } = usePlayer();

  return (
    <div className="song-item">
      <div className="song-main">
        <span className="song-title">
          {song.full_catalouge_index ?? index + 1}. {song.song_name} ({formatDuration(song.duration)})
        </span>
        <div className="song-actions">
          <button className="icon-button" onClick={() => playFrom(songs, index)}>
            <FaPlay />
          </button>
          <a
            className="icon-button"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Download"
            title="Download"
          >
            <FaDownload />
          </a>
          <button
            className="icon-button"
            onClick={() => setExpanded((e) => !e)}
          >
            {expanded ? <FaChevronUp /> : <FaChevronDown />}
          </button>
        </div>
      </div>
      {expanded && <p className="song-description">{song.description}</p>}
    </div>
  );
}