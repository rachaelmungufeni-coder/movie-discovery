import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { searchMulti } from "../api/tmdb";
import MovieGrid from "../components/MovieGrid";
import DetailsDialog from "../components/DetailsDialog";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [selected, setSelected] = useState(null);

  const { data, loading, error } = useFetch(() => searchMulti(query), [query]);

  const results = (data?.results || []).filter(
    (r) => r.media_type !== "person"
  );

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
        {query ? `Search results for "${query}"` : "Search"}
      </Typography>

      {!query && (
        <Typography color="text.secondary">
          Type a movie or TV show title in the search box above.
        </Typography>
      )}

      {query && loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      )}

      {query && error && <Alert severity="error">{error}</Alert>}

      {query && !loading && !error && results.length === 0 && (
        <Typography color="text.secondary">
          No results found for "{query}". Try a different title.
        </Typography>
      )}

      {query && !loading && !error && results.length > 0 && (
        <MovieGrid items={results} onSelect={setSelected} />
      )}

      {selected && (
        <DetailsDialog item={selected} onClose={() => setSelected(null)} />
      )}
    </Box>
  );
}