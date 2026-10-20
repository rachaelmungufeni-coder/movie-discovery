import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import Navbar from "./components/Navbar";
import Sidebar from "./components/SidebarTemp";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import TVShows from "./pages/TVShows";
import Watchlist from "./pages/Watchlist";
import SearchResults from "./pages/SearchResults";

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar onMenuClick={() => setMobileOpen(true)} />
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <Box component="main" sx={{ flexGrow: 1, p: 3, minWidth: 0 }}>
        <Toolbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/tv" element={<TVShows />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;