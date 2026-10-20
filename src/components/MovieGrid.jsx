import { Box } from "@mui/material";
import MovieCard from "./MovieCard";

export default function MovieGrid({ items, onSelect }) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: 2,
      }}
    >
      {items.map((item) => (
        <MovieCard
          key={`${item.media_type || "item"}-${item.id}`}
          item={item}
          onSelect={onSelect}
        />
      ))}
    </Box>
  );
}