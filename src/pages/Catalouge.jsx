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

  const handleDownload = async (song) => {
    try {
      const pw = window.prompt("Enter download password:");
      if (pw === null) return;

      const { data: pwRow, error: pwError } = await supabase
        .from("songs")
        .select("download_password")
        .eq("id", song.id)
        .single();

      if (pwError) {
        console.error(pwError);
        alert("Unable to verify password.");
        return;
      }

      if (pwRow?.download_password !== pw) {
        alert("Wrong password.");
        return;
      }

      const { data: urlData, error: urlError } = await supabase.storage
        .from("songs")
        .createSignedUrl(song.file_url, 60);

      if (urlError || !urlData?.signedUrl) {
        console.error(urlError);
        alert("Failed to generate download link.");
        return;
      }

      const res = await fetch(urlData.signedUrl);
      if (!res.ok) {
        alert("Failed to fetch file.");
        return;
      }
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);

      const parts = (song.file_url || "file.mp3").split(".");
      const ext = parts.length > 1 ? parts.pop() : "mp3";
      const filename = `${(song.song_name || "track").replace(/[\/\\:?<>|*"']/g, "")}.${ext}`;

      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error(err);
      alert("Download failed.");
    }
  };

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
          <button className="icon-button" onClick={() => handleDownload(song)}>
            <FaDownload />
          </button>
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