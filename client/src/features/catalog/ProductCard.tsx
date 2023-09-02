import {
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
import { Link } from "react-router-dom";
import { useState } from "react";
import agent from "../../app/api/agent";
import { LoadingButton } from "@mui/lab";
import { useStoreContext } from "../../app/context/StoreContext";
import { currencyFormat } from "../../app/util/util";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {

    const [loading, setLoading] = useState(false);
    const {setBasket} = useStoreContext();

    function handleAddItem(productId: number, quantity = 1) {
      setLoading(true);
      agent.Basket.addItem(productId)
      .then(basket => setBasket(basket))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
    }

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
            {currencyFormat(product.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.type} / {product.brand}
          </Typography>
        </CardContent>
      </Box>
      <CardActions>
        <LoadingButton
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
          loading={loading}
          onClick={() => handleAddItem(product.id)}
        >
          Add to Cart
        </LoadingButton>
        {/* <Button size="small" component={Link} to={`/catalog/${product.id}`}>
          View
        </Button> */}
      </CardActions>
    </Card>
  );
}
