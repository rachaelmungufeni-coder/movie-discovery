import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MovieIcon from "@mui/icons-material/Movie";

export default function Navbar({ onMenuClick }) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "background.paper",
        backgroundImage: "none",
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuClick}
          sx={{ mr: 1, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <MovieIcon color="primary" sx={{ mr: 1 }} />
        <Typography
          variant="h6"
          noWrap
          sx={{ fontWeight: 700, mr: { xs: 1, md: 3 }, flexShrink: 0 }}
        >
          CineVault
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ flexGrow: 1, maxWidth: 500, ml: "auto", minWidth: 0 }}
        >
          <TextField
            fullWidth
            size="small"
            placeholder="Search movies or TV shows"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
                        slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}