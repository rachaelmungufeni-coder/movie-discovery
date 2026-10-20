import { NavLink } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import TvIcon from "@mui/icons-material/Tv";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export const DRAWER_WIDTH = 220;

const links = [
  { label: "Home", to: "/", icon: <HomeIcon /> },
  { label: "Movies", to: "/movies", icon: <MovieIcon /> },
  { label: "TV Shows", to: "/tv", icon: <TvIcon /> },
  { label: "My Watchlist", to: "/watchlist", icon: <BookmarkIcon /> },
];

export default function Sidebar({ open, onClose }) {
  const content = (
    <>
      <Toolbar />
      <List>
        {links.map(({ label, to, icon }) => (
          <ListItemButton
            key={to}
            component={NavLink}
            to={to}
            end={to === "/"}
            onClick={onClose}
            sx={{
              "&.active": {
                color: "primary.main",
                "& .MuiListItemIcon-root": { color: "primary.main" },
              },
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={label} />
          </ListItemButton>
        ))}
      </List>
    </>
  );

  const paperStyle = {
    "& .MuiDrawer-paper": { width: DRAWER_WIDTH, boxSizing: "border-box" },
  };

  return (
    <>
      {/* Phones: slides in when opened */}
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: "block", md: "none" }, ...paperStyle }}
      >
        {content}
      </Drawer>

      {/* Desktop: always visible */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          width: DRAWER_WIDTH,
          flexShrink: 0,
          ...paperStyle,
        }}
      >
        {content}
      </Drawer>
    </>
  );
}