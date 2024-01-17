import { ShoppingCart } from '@mui/icons-material';
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import { useAppSelector } from '../store/configureStore';
import SignedInMenu from './SignedInMenu';
import NavResponsive from './NavResponsive';

const navLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
];

const loginLinks = [
  { title: 'register', path: '/register' },
  { title: 'login', path: '/login' },
];

const allLinks = [
  { title: 'Catalog', path: '/catalog' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Basket', path: '/basket' },
  { title: 'Register', path: '/register' },
  { title: 'Login', path: '/login' },
];

const style = {
  color: 'inherit',
  '&:hover': {
    color: 'grey.500', // Hover color
  },
  '&.active': {
    color: 'text.secondary', // Active color
  },
  textDecoration: 'none',
};

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

export default function Header({ darkMode, handleThemeChange }: Props) {
  const { basket } = useAppSelector((state) => state.basket);
  const { user } = useAppSelector((state) => state.account);
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Box display='flex' alignItems='center'>
          <Typography variant='h6' component={NavLink} to='/' sx={style}>
            BlueTech
          </Typography>
          <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>
        {isMobile ? (
          <SignedInMenu />
        ) : (
          <List sx={{ display: 'flex' }}>
            {navLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={style}>
                {title.toUpperCase()}
              </ListItem>
            ))}

            {user && user.roles?.includes('Admin') && (
              <ListItem component={NavLink} to={'/dashboard'} sx={style}>
                DASHBOARD
              </ListItem>
            )}
          </List>
        )}

        {isMobile ? (
          <NavResponsive navLinks={allLinks} />
        ) : (
          <Box display='flex' alignItems='center'>
            <IconButton
              size='large'
              edge='start'
              component={Link}
              to='/basket'
              color='inherit'
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={itemCount} className='shoppingCart'>
                <ShoppingCart />
              </Badge>
            </IconButton>
            {user ? (
              <SignedInMenu />
            ) : (
              <List sx={{ display: 'flex' }}>
                {loginLinks.map(({ title, path }) => (
                  <ListItem component={NavLink} to={path} key={path} sx={style}>
                    {title.toUpperCase()}
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}
