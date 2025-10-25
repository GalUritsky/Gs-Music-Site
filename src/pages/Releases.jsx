import { useState, useEffect } from "react";
import { FaPlay, FaDownload, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient"; // Make sure this path is correct
import "../index.css";
import { usePlayer } from "../context/PlayerContext";

function formatDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

// Fetch albums + songs from Supabase
async function fetchAlbums() {
  const { data, error } = await supabase
    .from("albums")
    .select("*, songs(*)")
    .order("release_date", { ascending: false });

  if (error) {
    console.error("Error fetching albums:", error);
    return [];
  }

  return data;
}

export default function Releases() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const getAlbums = async () => {
      const data = await fetchAlbums();
      setAlbums(data);
    };
    getAlbums();
  }, []);

  return (
    <div className="releases-page">
      <h2 className="releases-title">Welcome to G's' Releases, where you can find all my official releases!</h2>
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
}

function AlbumCard({ album }) {
  const sortedSongs = [...(album.songs || [])].sort(
    (a, b) => a.track_number - b.track_number
  );

  return (
    <section className="album-card">
      <div className="album-info">
        <img
          src={album.cover_url || "https://via.placeholder.com/300"}
          alt={album.album_name}
          className="album-cover"
        />
        <h3 className="album-name">{album.album_name}</h3>
        <p className="album-artist">{album.artist}</p>
        <p className="album-description">{album.description}</p>
      </div>

      <div className="album-songs">
        {sortedSongs.map((song, index) => (
          <SongItem
            key={song.id}
            song={song}
            index={index}
            songs={sortedSongs}
          />
        ))}
      </div>
    </section>
  );
}

function SongItem({ song, index, songs }) {
  const [expanded, setExpanded] = useState(false);
  const { playFrom } = usePlayer();

  const handleDownload = async (song) => {
    try {
      const pw = window.prompt("Enter download password:");
      if (pw === null) return; // user cancelled

      // fetch stored password for this song (note: exposes password to client)
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

      // create signed url and download
      const { data: urlData, error: urlError } = await supabase.storage
        .from("songs")
        .createSignedUrl(song.file_url, 60); // 60s validity

      if (urlError || !urlData?.signedUrl) {
        console.error(urlError);
        alert("Failed to generate download link.");
        return;
      }

      // fetch the file and trigger download (safer cross-origin)
      const res = await fetch(urlData.signedUrl);
      if (!res.ok) {
        alert("Failed to fetch file.");
        return;
      }
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);

      // determine extension/name
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
          {song.track_number}. {song.song_name} ({formatDuration(song.duration)})
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
