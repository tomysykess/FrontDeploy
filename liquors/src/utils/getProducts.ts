import axios from "axios";
import { AppDispatch } from "@/store/store";
import {
  readProducts,
  readProductsFiltered,
} from "@/store/reducers/productsSlice";
import { clearProducts } from "@/store/reducers/productsSlice";
import { Product } from "@/interfaces/interfaz";

export const fetchProducts = async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get<Product[]>(
      `https://liquors-project.onrender.com/products/?page=1&limit=15`
    );
    dispatch(clearProducts());
    dispatch(readProducts(res.data));
  } catch (err) {
    console.error(err);
  }
};

export const fetchProductsPage = async (dispatch: AppDispatch, page: any) => {
  let queryParam = "";
  if (page) {
    queryParam = `page=${page}`;
  }
  try {
      const res = await axios.get<Product[]>(
        `https://liquors-project.onrender.com/products/?${queryParam}&limit=15`
      );
      dispatch(readProducts(res.data));
  } catch (err) {
      console.error(err);
  }
};

/* LE FALTA TERMINAR */
export const deleteProductAdmin = async (
  id: string,
  dispatch: AppDispatch,
  token: string
) => {
  try {
    const res = await axios.put(
      `https://liquors-project.onrender.com/products/delete/${id}`,
      {},
      {
        headers: { authorization: `Bearer: ${token} ` },
      }
    );

    dispatch(readProductsFiltered(id));
    dispatch(readProducts(res.data));
  } catch (err) {
    console.error(err);
  }
};
