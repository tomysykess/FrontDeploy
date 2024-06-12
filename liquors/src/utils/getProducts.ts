import axios from "axios";
import { AppDispatch } from "@/store/store";
import { readProducts } from "@/store/reducers/productsSlice";
import { clearProducts } from "@/store/reducers/productsSlice";
import { Product } from "@/interfaces/interfaz";

export const fetchProducts = async (dispatch: AppDispatch, page: any) => {
  
  let queryParam = ""; 
  if (page) {
    queryParam = `?page=${page}`; 
  }
  try {
      const res = await axios.get<Product[]>(`https://liquors-project.onrender.com/products/${queryParam}`);
      dispatch(clearProducts());
      dispatch(readProducts(res.data))
  } catch (err) {
      console.error(err);
  }
};