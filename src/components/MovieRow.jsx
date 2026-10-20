import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import MovieCard from "./MovieCard";

export default function MovieRow({ title, items, loading, error, onSelect }) {
  return (
    <Box sx={{ mb: 5 }}>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
        {title}
      </Typography>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && items.length === 0 && (
        <Typography color="text.secondary">Nothing to show here yet.</Typography>
      )}

      {!loading && !error && items.length > 0 && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            py: 1.5,
            px: 0.5,
            scrollbarWidth: "thin",
            scrollbarColor: "#444 transparent",
            "&::-webkit-scrollbar": { height: 8 },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "#444",
              borderRadius: 4,
            },
            "&::-webkit-scrollbar-thumb:hover": { backgroundColor: "#666" },
          }}
        >
          {items.map((item) => (
            <Box
              key={`${item.media_type || "item"}-${item.id}`}
              sx={{ flex: "0 0 150px", width: 150 }}
            >
              <MovieCard item={item} onSelect={onSelect} />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}