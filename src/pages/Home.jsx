import { useState } from "react";
import { Box } from "@mui/material";
import MovieRow from "../components/MovieRow";
import DetailsDialog from "../components/DetailsDialog";
import useFetch from "../hooks/useFetch";
import { getTrending, getPopularMovies, getPopularTV } from "../api/tmdb";

export default function Home() {
  const [selected, setSelected] = useState(null);

  const trending = useFetch(() => getTrending(), []);
  const movies = useFetch(() => getPopularMovies(), []);
  const shows = useFetch(() => getPopularTV(), []);

  return (
    <Box>
      <MovieRow
        title="Trending This Week"
        items={trending.data?.results || []}
        loading={trending.loading}
        error={trending.error}
        onSelect={setSelected}
      />
      <MovieRow
        title="Popular Movies"
        items={movies.data?.results || []}
        loading={movies.loading}
        error={movies.error}
        onSelect={setSelected}
      />
      <MovieRow
        title="Popular TV Shows"
        items={shows.data?.results || []}
        loading={shows.loading}
        error={shows.error}
        onSelect={setSelected}
      />

      {selected && (
        <DetailsDialog item={selected} onClose={() => setSelected(null)} />
      )}
    </Box>
  );
}