import React, { useState } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Graph from "./Graph";
import ProductCrud from "../ProductCrud";
import AccountCrud from "../AccountCrud";

const drawerWidth = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = useState(true);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const buttonListItems = [
    { label: "Product CRUD", icon: <ShoppingCartIcon /> },
    { label: "Account CRUD", icon: <PeopleIcon /> },
  ];

  const handleItemClick = (item: string) => {
    setSelectedButton(item);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {buttonListItems.map((button) => (
              <ListItemButton
                key={button.label}
                onClick={() => handleItemClick(button.label)}
                selected={selectedButton === button.label}
              >
                <ListItemIcon>{button.icon}</ListItemIcon>
                <ListItemText primary={button.label} />
              </ListItemButton>
            ))}
            <Divider sx={{ my: 1 }} />
            {/* You can include your secondary list items here */}
          </List>
        </Drawer>
        <Box sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
          {selectedButton === "Dashboard" ? (
            <Graph />
          ) : selectedButton === "Product CRUD" ? (
            <ProductCrud />
          ) : selectedButton === "Account CRUD" ? <AccountCrud /> : selectedButton ===
            "Graph" ? null : (
            <Graph />
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
