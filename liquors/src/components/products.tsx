"use client";

import { Product } from "@/interfaces/interfaz";
import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  //   createProducts,
  readProducts,
  //   clearProducts,
  //   readGinProducts,
  //   clearGinProducts,
  //   readProductsFiltered,
  //   clearProductsFiltered,
  //   readWineProducts,
  //   clearWineProducts,
} from "@/store/reducers/productsSlice";

export const Products = () => {
  const data = useSelector((state: RootState) => state.products.data);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<Product[]>(
          "https://liquors-project.onrender.com/products"
        );
        dispatch(readProducts(res.data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    if (!data || data.length === 0) {
      fetchProducts();
    }
  }, [data, dispatch]);
  /*  const fetchGinProducts = async () => {
      try {
        const res = await axios.get<Product[]>(
          "https://liquors-project.onrender.com/products/gin"
        );
        dispatch(readGinProducts(res.data));
      } catch (error) {
        console.error("Error fetching gin products:", error);
      }
    };

    const fetchWineProducts = async () => {
      try {
        const res = await axios.get<Product[]>(
          "https://liquors-project.onrender.com/products/wine"
        );
        dispatch(readWineProducts(res.data));
      } catch (error) {
        console.error("Error fetching wine products:", error);
      }
    };
 */

  // if (!ginProducts || ginProducts.length === 0) {
  //   fetchGinProducts();
  // }

  // if (!wineProducts || wineProducts.length === 0) {
  //   fetchWineProducts();
  // }

  return (
    <div>
      {data?.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}

      {/*  <h2>Gin Products</h2>
      {ginProducts?.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}

      <h2>Wine Products</h2>
      {wineProducts?.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))}

      <h2>Filtered Products</h2>
      {dataFiltered?.map((product) => (
        <p key={product.id}>{product.name}</p>
      ))} */}

      {/*  <button onClick={() => dispatch(createProducts({ id: "new-product", name: "New Product" }))}>
        Create Product
      </button>
      <button onClick={() => dispatch(clearProducts())}>Clear Products</button>
      <button onClick={() => dispatch(clearGinProducts())}>Clear Gin Products</button>
      <button onClick={() => dispatch(clearWineProducts())}>Clear Wine Products</button>
      <button onClick={() => dispatch(clearProductsFiltered())}>Clear Filtered Products</button> */}
    </div>
  );
};

export default Products;
