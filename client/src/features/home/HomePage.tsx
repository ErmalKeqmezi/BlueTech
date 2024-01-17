import { Box, Container, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import Slider from 'react-slick';
import Catalog from '../catalog/Catalog';

export default function HomePage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slideToShow: 1,
    slideToScroll: 1,
    arrows: false,
  };
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Slider {...settings}>
        <div>
          <img
            src='/images/hero1.jpg'
            alt=''
            style={{ display: 'block', width: '100%', maxHeight: 500 }}
          />
        </div>
        <div>
          <img
            src='/images/hero2.jpg'
            alt=''
            style={{ display: 'block', width: '100%', maxHeight: 500 }}
          />
        </div>
        <div>
          <img
            src='/images/hero3.jpg'
            alt=''
            style={{ display: 'block', width: '100%', maxHeight: 500 }}
          />
        </div>
      </Slider>
      <Container>
        <Box display='flex' justifyContent='center' sx={{ p: 4 }}>
          {isMobile ? (
            <Typography variant='h3' style={{ textAlign: 'center' }}>
              Welcome to BlueTech
            </Typography>
          ) : (
            <Typography variant='h1'>Welcome to BlueTech</Typography>
          )}
        </Box>
        <Box mt={4}>
          <Catalog />
        </Box>
      </Container>
    </>
  );
}
