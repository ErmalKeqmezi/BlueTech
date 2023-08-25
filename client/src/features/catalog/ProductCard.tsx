import {
  AspectRatio,
  Button,
  Card,
  CardContent,
  CardOverflow,
  Link,
  Typography,
} from "@mui/joy";
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card className="card" sx={{ boxShadow: "1px 2px 9px #808080" }}>
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
          sx={{ minHeight: "50px" }}
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
