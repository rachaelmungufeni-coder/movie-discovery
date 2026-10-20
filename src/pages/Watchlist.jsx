import { useState } from "react";
import { Box, Typography } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { useWatchlist } from "../context/WatchlistContext";
import MovieGrid from "../components/MovieGrid";
import DetailsDialog from "../components/DetailsDialog";

export default function Watchlist() {
  const { watchlist } = useWatchlist();
  const [selected, setSelected] = useState(null);

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
        My Watchlist
      </Typography>

      {watchlist.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            py: 8,
            color: "text.secondary",
          }}
        >
          <BookmarkBorderIcon sx={{ fontSize: 64, mb: 1 }} />
          <Typography>Your watchlist is empty.</Typography>
          <Typography variant="body2">
            Tap the heart on any movie or show to save it here.
          </Typography>
        </Box>
      ) : (
        <MovieGrid items={watchlist} onSelect={setSelected} />
      )}

      {selected && (
        <DetailsDialog item={selected} onClose={() => setSelected(null)} />
      )}
    </Box>
  );
}