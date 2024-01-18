import { useCallback, useEffect, useState } from 'react';
import Header from './Header';
import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingComponent from './LoadingComponent';
import { useAppDispatch } from '../store/configureStore';
import { getBasketAsync } from '../../features/basket/basketSlice';
import { getCurrentUser } from '../../features/account/accountSlice';
import HomePage from '../../features/home/HomePage';
import Footer from './Footer';

function App() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const initApp = useCallback(async () => {
    try {
      await dispatch(getCurrentUser());
      await dispatch(getBasketAsync());
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);

  useEffect(() => {
    initApp().then(() => setLoading(false));
  }, [initApp]);

  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#1b1b1b ',
      },
      primary: {
        main: paletteType === 'light' ? '#0288d1' : '#0F52BA ',
      },
    },
  });

  function handleThemeChange() {
    setDarkMode(!darkMode);
  }

  if (loading) return <LoadingComponent message='Initializing app...' />;

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer
          position='bottom-right'
          hideProgressBar
          theme='colored'
        />
        <CssBaseline />
        <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
        {loading ? (
          <LoadingComponent message='Initializing app...' />
        ) : location.pathname === '/' ? (
          <HomePage />
        ) : (
          <Container sx={{ mt: 4 }}>
            <Outlet />
          </Container>
        )}
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
