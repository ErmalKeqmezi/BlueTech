import { AppBar, Toolbar, Typography } from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static" sx={{ mb: 4, mt: 0 }}>
      <Toolbar>
        <Typography variant="h6">BlueTech</Typography>
      </Toolbar>
    </AppBar>
  );
}
