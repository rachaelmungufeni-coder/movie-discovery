import {
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Typography,
  Chip,
  CircularProgress,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import MovieIcon from "@mui/icons-material/Movie";
import useFetch from "../hooks/useFetch";
import { getDetails, posterUrl } from "../api/tmdb";

export default function DetailsDialog({ item, onClose }) {
  const type = item.media_type || (item.title ? "movie" : "tv");

  const { data, loading, error } = useFetch(
    () => getDetails(type, item.id),
    [type, item.id]
  );

  const title = data?.title || data?.name || item.title || item.name;
  const date = data?.release_date || data?.first_air_date;
  const year = date ? date.slice(0, 4) : "N/A";
  const rating = data?.vote_average ? data.vote_average.toFixed(1) : "N/A";
  const overview = data?.overview || "No description available.";
  const genres = data?.genres || [];
  const poster = posterUrl(data?.poster_path);

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="md">
      <IconButton
        onClick={onClose}
        sx={{ position: "absolute", right: 8, top: 8, zIndex: 1 }}
        aria-label="Close"
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ p: 3 }}>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
            <CircularProgress />
          </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && data && (
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 3,
            }}
          >
            <Box sx={{ flex: "0 0 260px", maxWidth: { xs: "100%", sm: 260 } }}>
              {poster ? (
                <Box
                  component="img"
                  src={poster}
                  alt={title}
                  sx={{ width: "100%", borderRadius: 2, display: "block" }}
                />
              ) : (
                <Box
                  sx={{
                    aspectRatio: "2 / 3",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "action.hover",
                    color: "text.secondary",
                    borderRadius: 2,
                  }}
                >
                  <MovieIcon sx={{ fontSize: 64 }} />
                  <Typography variant="caption">No poster</Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" sx={{ fontWeight: 700, pr: 4 }}>
                {title}
              </Typography>

              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, my: 1.5 }}
              >
                <Typography color="text.secondary">{year}</Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <StarIcon color="primary" fontSize="small" />
                  <Typography>{rating}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {genres.length > 0 ? (
                  genres.map((g) => (
                    <Chip key={g.id} label={g.name} size="small" />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Genre not available
                  </Typography>
                )}
              </Box>

              <Typography variant="h6" sx={{ mb: 1 }}>
                Overview
              </Typography>
              <Typography color="text.secondary">{overview}</Typography>
            </Box>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}