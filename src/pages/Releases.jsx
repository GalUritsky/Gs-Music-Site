import { useState, useEffect } from "react";
import { FaPlay, FaDownload, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { supabase } from "../lib/supabaseClient"; // Make sure this path is correct
import "../index.css";

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
        {album.songs?.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </div>
    </section>
  );
}

function SongItem({ song }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="song-item">
      <div className="song-main">
        <span className="song-title">
          {song.track_number}. {song.song_name} ({formatDuration(song.duration)})
        </span>
        <div className="song-actions">
          <button className="icon-button">
            <FaPlay />
          </button>
          <button className="icon-button">
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
