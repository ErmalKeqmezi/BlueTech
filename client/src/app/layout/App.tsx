import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
} from "@mui/material";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";
import { useState } from "react";
import { CssVarsProvider, extendTheme, useColorScheme } from "@mui/joy";

function App() {
  // const [darkMode, setDarkMode] = useState(false);
  // const paletteType = darkMode ? "dark" : "light";
  const theme = extendTheme({
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            50: "#C0CCD9",
            100: "#A5B8CF",
            200: "#6A96CA",
            300: "#4886D0",
            400: "#2178DD",
            500: "#096BDE",
            600: "#1B62B5",
            700: "#265995",
            800: "#2F4968",
            900: "#2F3C4C",
          },
        },
      },
    },
  });

  function ModeToggle() {
    const { mode, setMode } = useColorScheme();
  }

  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        <Header />
        <Container>
          <Catalog />
        </Container>
      </CssVarsProvider>
      {/* </ThemeProvider> */}
    </>
  );
}

export default App;
