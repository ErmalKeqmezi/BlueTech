import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import React from "react";
import { Link } from "react-router-dom";


interface Props {
    product: Product;
}

export default function ProductCard({product} : Props) { 
    return (
        <Card>
            <CardHeader 
            avatar={
                <Avatar>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar> 
            }
            title={product.name}
            titleTypographyProps={{
                sx: {fontWeight: 'bold', color: 'black'}
            }}
            />
        <CardMedia
          sx={{ height: 140, backgroundSize: 'contain'}}
          image={product.pictureUrl}    
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5">
          {(product.price / 100).toFixed(2)}€
          </Typography>
          <Typography variant="body2" color="text.secondary">
           {product.type} / {product.brand}
          </Typography>
          
        </CardContent>
        <CardActions>
          <Button size="small">Add to Cart</Button>
          <Button size="small" component={Link} to={`/catalog/${product.id}`}>View</Button>
        </CardActions>
      </Card>
    )
}