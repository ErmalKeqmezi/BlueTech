import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../../features/catalog/Catalog";
import { Typography } from "@mui/material";

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  function addProduct() {
    setProducts((prevState) => [
      ...prevState,
      {
        id: prevState.length + 101,
        name: "prod" + (prevState.length + 1),
        price: prevState.length * 100 + 100,
        brand: "brand",
        description: "description ads",
        // pictureUrl: "http://photo1.jpg",
      },
    ]);
  }

  return (
    <>
      <Typography>BlueTech</Typography>
      <Catalog products={products} addProduct={addProduct} />
    </>
  );
}

export default App;