import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { currencyFormat } from "../../app/util/util";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width:767px)");

  return (
    <Card
      elevation={6}
      sx={{
        "&:hover": {
          transition: "transform .2s",
          transform: "scale(1.02)",
        },
        margin: isMobile ? "-8px" : "0px",
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
              fontSize: isMobile ? "14px" : "17px",
              mt: 2,
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
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: isMobile ? "11px" : "14px" }}
          >
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
          loading={status.includes("pendingAddItem" + product.id)}
          onClick={() =>
            dispatch(addBasketItemAsync({ productId: product.id, quantity: 1 }))
          }
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
