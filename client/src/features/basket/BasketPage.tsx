import { Button, Grid, Typography } from '@mui/material';
import BasketSummary from './BasketSummary';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../app/store/configureStore';
import BasketTable from './BasketTable';
import Footer from '../../app/layout/Footer';

export default function BasketPage() {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket)
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img src='/images/empty_cart.png' alt='' style={{ width: '30%' }} />
        <Typography variant='h3' style={{}}>
          Your Basket is Empty!
        </Typography>
        <Button
          component={Link}
          to={`/catalog`}
          sx={{
            bgcolor: 'primary.dark',
            color: 'primary.contrastText',
            '&:hover': { bgcolor: 'primary.main' },
          }}
        >
          Return to Shop
        </Button>
      </div>
    );

  return (
    <>
      <BasketTable items={basket.items} />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button
            component={Link}
            to='/checkout'
            variant='contained'
            size='large'
            fullWidth
          >
            CheckOut
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
