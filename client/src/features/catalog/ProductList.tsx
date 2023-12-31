import { Grid, useMediaQuery } from "@mui/material";
import { Product } from "../../app/models/product";
import ProductCard from "./ProductCard";
import React from "react";
import { useAppSelector } from "../../app/store/configureStore";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.catalog);
  const isMobile = useMediaQuery("(max-width:767px)");
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <Grid item xs={isMobile ? 6 : 4} key={product.id}>
          {!productsLoaded ? (
            <ProductCardSkeleton />
          ) : (
            <ProductCard product={product} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
