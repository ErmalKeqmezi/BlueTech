import { Box, Typography } from "@mui/material";
import React from "react";
import Slider from "react-slick";


export default function HomePage() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slideToShow: 1,
        slideToScroll: 1
    };

    return (
       <>
       <Slider {...settings}> 
        <div>
            <img src="/images/hero1.jpg" alt="" style={{display: 'block', width: '100%', maxHeight: 500}}/>
        </div>
        <div>
            <img src="/images/hero2.jpg" alt="" style={{display: 'block', width: '100%', maxHeight: 500}}/>
        </div>
        <div>
            <img src="/images/hero3.jpg" alt="" style={{display: 'block', width: '100%', maxHeight: 500}}/>
        </div>
       </Slider>
       <Box display='flex' justifyContent='center' sx={{p: 4}}>
        <Typography variant='h1'>Welcome to BlueTech</Typography>
       </Box>
       </>
    )
}