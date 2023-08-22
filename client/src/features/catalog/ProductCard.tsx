import { Product } from "../../app/models/product";
import { CardOverflow } from "@mui/joy";
import * as React from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Chip from "@mui/joy/Chip";
import Link from "@mui/joy/Link";
import Typography from "@mui/joy/Typography";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import { Elevator } from "@mui/icons-material";
import { Box } from "@mui/material";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img
            src={product.pictureUrl}
            srcSet={product.pictureUrl}
            loading="lazy"
            alt="product photo"
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body-xs">
          {product.type} / {product.brand}
        </Typography>
        <Link
          href="#product-card"
          fontWeight="md"
          color="neutral"
          textColor="text.primary"
          overlay
          // endDecorator={<ArrowOutwardIcon />}
        >
          {product.name}
        </Link>

        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: "xl" }}
          // endDecorator={
          //   <Chip component="span" size="sm" variant="soft" color="success">
          //     Lowest price
          //   </Chip>
          // }
        >
          {(product.price / 100).toFixed(2)} €
        </Typography>

        <Typography level="body-sm">
          (Only <b>{product.quantityInStock}</b> left in stock!)
        </Typography>
      </CardContent>
      <CardOverflow>
        <Button variant="solid" color="primary" size="lg">
          Add to cart
        </Button>
      </CardOverflow>
    </Card>
  );
}
