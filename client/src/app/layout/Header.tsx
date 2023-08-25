// import { AppBar, Toolbar, Typography } from "@mui/material";

// export default function Header() {
//   return (
//     <AppBar position="static" sx={{ mb: 4, mt: 0 }}>
//       <Toolbar>
//         <Typography variant="h6">BlueTech</Typography>
//       </Toolbar>
//     </AppBar>
//   );
// }

import * as React from "react";
import Box from "@mui/joy/Box";
import List from "@mui/joy/List";
import ListDivider from "@mui/joy/ListDivider";
import ListItem from "@mui/joy/ListItem";
import ListItemButton from "@mui/joy/ListItemButton";
import Home from "@mui/icons-material/Home";
import Person from "@mui/icons-material/Person";
import { Button, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { MoreVert } from "@mui/icons-material";

export default function HorizontalList() {
  return (
    <Box
      component="nav"
      aria-label="My site"
      sx={{
        flexGrow: 1,
        bgcolor: "#0b6bcb",
        mb: "25px",
        p: "10px",
      }}
    >
      <List role="menubar" orientation="horizontal">
        <ListItem role="none" sx={{ color: "white" }}>
          <b>BlueTech</b>
        </ListItem>
        <ListDivider />
        <ListItem role="none">
          <Button>Products</Button>
        </ListItem>
        <ListDivider />
        <ListItem role="none">
          <Button>Products</Button>
        </ListItem>
        <ListItem role="none" sx={{ marginInlineStart: "auto" }}>
          {/* <Button
            role="menuitem"
            component="a"
            href="#horizontal-list"
            aria-label="Profile"
          >
            <Person />
          </Button> */}

          <Dropdown className="buttonBar">
            <MenuButton sx={{ border: "none" }}>
              <Person sx={{ color: "white" }} />
            </MenuButton>
            <Menu>
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </Dropdown>
        </ListItem>
      </List>
    </Box>
  );
}
