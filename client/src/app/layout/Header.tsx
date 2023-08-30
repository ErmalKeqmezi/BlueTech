import { ShoppingBag, ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";

const navLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const loginLinks = [
  { title: "register", path: "/register" },
  { title: "login", path: "/login" },
];

const style = {
  color: "inherit",
  "&:hover": {
    color: "grey.500", // Hover color
  },
  "&.active": {
    color: "text.secondary", // Active color
  },
  textDecoration: "none",
};

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Header({ darkMode, handleThemeChange }: Props) {
  function handleClose(
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ): void {
    throw new Error("Function not implemented.");
  }

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography variant="h6" component={NavLink} to="/" sx={style}>
            BlueTech
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>

        <List sx={{ display: "flex" }}>
          {navLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={style}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box display="flex" alignItems="center">
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <Badge badgeContent="2" color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: "flex" }}>
            {loginLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={style}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
function setAnchorEl(arg0: null) {
  throw new Error("Function not implemented.");
}
