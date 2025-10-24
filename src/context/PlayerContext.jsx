import { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // currentSong for backward compatibility
  const currentSong = playlist?.[currentIndex] ?? null;

  // Play an array of songs starting from given index
  function playFrom(list = [], index = 0) {
    setPlaylist(list);
    setCurrentIndex(index);
  }

  // Set a single-song playlist (keeps old API)
  function setCurrentSong(song) {
    if (!song) {
      setPlaylist([]);
      setCurrentIndex(0);
    } else {
      setPlaylist([song]);
      setCurrentIndex(0);
    }
  }

  return (
    <PlayerContext.Provider
      value={{
        playlist,
        setPlaylist,
        currentIndex,
        setCurrentIndex,
        currentSong,
        setCurrentSong,
        playFrom,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
