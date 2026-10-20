import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import MovieIcon from "@mui/icons-material/Movie";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { posterUrl } from "../api/tmdb";
import { useWatchlist } from "../context/WatchlistContext";

export default function MovieCard({ item, onSelect }) {
  const { isSaved, toggle } = useWatchlist();
  const saved = isSaved(item);

  const title = item.title || item.name || "Untitled";
  const date = item.release_date || item.first_air_date;
  const year = date ? date.slice(0, 4) : "N/A";
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "N/A";
  const poster = posterUrl(item.poster_path);

  return (
    <Card
      sx={{
        position: "relative",
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "scale(1.05)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea onClick={() => onSelect && onSelect(item)}>
        {poster ? (
          <CardMedia
            component="img"
            image={poster}
            alt={title}
            sx={{ aspectRatio: "2 / 3", objectFit: "cover" }}
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
            }}
          >
            <MovieIcon sx={{ fontSize: 48 }} />
            <Typography variant="caption">No poster</Typography>
          </Box>
        )}

        <CardContent sx={{ p: 1.5 }}>
          <Typography variant="subtitle2" noWrap title={title}>
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="caption" color="text.secondary">
              {year}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <StarIcon sx={{ fontSize: 14 }} color="primary" />
              <Typography variant="caption">{rating}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>

      <IconButton
        onClick={() => toggle(item)}
        aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
        size="small"
        sx={{
          position: "absolute",
          top: 6,
          right: 6,
          backgroundColor: "rgba(0,0,0,0.6)",
          "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
        }}
      >
        {saved ? (
          <FavoriteIcon color="primary" fontSize="small" />
        ) : (
          <FavoriteBorderIcon fontSize="small" />
        )}
      </IconButton>
    </Card>
  );
}