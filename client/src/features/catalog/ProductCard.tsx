import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "../../app/models/product";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card
      elevation={6}
      sx={{
        "&:hover": {
          transition: "transform .2s",
          transform: "scale(1.02)",
        },
      }}
    >
      <Box
        component={Link}
        to={`/catalog/${product.id}`}
        sx={{ textDecoration: "none" }}
      >
        <CardHeader
          title={product.name}
          titleTypographyProps={{
            sx: {
              fontWeight: "bold",
              color: "text.primary",
              fontSize: "17px",
            },
          }}
          sx={{ maxHeight: "50px" }}
        />
        <CardMedia
          sx={{ height: 140, backgroundSize: "contain" }}
          image={product.pictureUrl}
          title={product.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" color="text.primary">
            {(product.price / 100).toFixed(2)}€
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.type} / {product.brand}
          </Typography>
        </CardContent>
      </Box>
      <CardActions>
        <Button
          size="small"
          sx={{
            p: "10px",
            width: "100%",
            bgcolor: "primary.main",
            color: "white",
            "&:hover": {
              backgroundColor: "primary.dark",
            },
          }}
        >
          Add to Cart
        </Button>
        {/* <Button size="small" component={Link} to={`/catalog/${product.id}`}>
          View
        </Button> */}
      </CardActions>
    </Card>
  );
}
