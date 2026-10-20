import { useState } from "react";
import { Box, Typography, Chip, CircularProgress, Alert } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { getGenres, discover } from "../api/tmdb";
import MovieGrid from "./MovieGrid";
import DetailsDialog from "./DetailsDialog";

export default function BrowsePage({ type, title }) {
  const [genreId, setGenreId] = useState(null);
  const [selected, setSelected] = useState(null);

  const genres = useFetch(() => getGenres(type), [type]);
  const list = useFetch(() => discover(type, genreId), [type, genreId]);

  const items = (list.data?.results || []).map((i) => ({
    ...i,
    media_type: type,
  }));

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2, fontWeight: 700 }}>
        {title}
      </Typography>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
        <Chip
          label="All"
          clickable
          color={genreId === null ? "primary" : "default"}
          variant={genreId === null ? "filled" : "outlined"}
          onClick={() => setGenreId(null)}
        />
        {(genres.data?.genres || []).map((g) => (
          <Chip
            key={g.id}
            label={g.name}
            clickable
            color={genreId === g.id ? "primary" : "default"}
            variant={genreId === g.id ? "filled" : "outlined"}
            onClick={() => setGenreId(g.id)}
          />
        ))}
      </Box>

      {list.loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {list.error && <Alert severity="error">{list.error}</Alert>}

      {!list.loading && !list.error && items.length === 0 && (
        <Typography color="text.secondary">
          Nothing found in this category.
        </Typography>
      )}

      {!list.loading && !list.error && items.length > 0 && (
        <MovieGrid items={items} onSelect={setSelected} />
      )}

      {selected && (
        <DetailsDialog item={selected} onClose={() => setSelected(null)} />
      )}
    </Box>
  );
}