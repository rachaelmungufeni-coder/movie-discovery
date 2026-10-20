import { createContext, useContext, useState, useEffect } from "react";

const WatchlistContext = createContext(null);

const getType = (item) => item.media_type || (item.title ? "movie" : "tv");

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("watchlist"));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("watchlist", JSON.stringify(watchlist));
    } catch {
      // storage unavailable: the list still works until the page closes
    }
  }, [watchlist]);

  const isSaved = (item) =>
    watchlist.some(
      (i) => i.id === item.id && getType(i) === getType(item)
    );

  const toggle = (item) => {
    const type = getType(item);
    setWatchlist((prev) =>
      prev.some((i) => i.id === item.id && getType(i) === type)
        ? prev.filter((i) => !(i.id === item.id && getType(i) === type))
        : [...prev, { ...item, media_type: type }]
    );
  };

  return (
    <WatchlistContext.Provider value={{ watchlist, isSaved, toggle }}>
      {children}
    </WatchlistContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useWatchlist() {
  return useContext(WatchlistContext);
}