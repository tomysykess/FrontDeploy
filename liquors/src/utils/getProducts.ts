import axios from "axios";
import { AppDispatch } from "@/store/store";
import { readProducts } from "@/store/reducers/productsSlice";
import { clearProducts } from "@/store/reducers/productsSlice";
import { Product } from "@/interfaces/interfaz";

export const fetchProducts = async (dispatch: AppDispatch) => {
  
  try {
      const res = await axios.get<Product[]>(`https://liquors-project.onrender.com/products/?page=1&limit=15`);
      dispatch(clearProducts());
      dispatch(readProducts(res.data))
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
      const res = await axios.get<Product[]>(`https://liquors-project.onrender.com/products/?${queryParam}&limit=15`);
      dispatch(readProducts(res.data))
  } catch (err) {
      console.error(err);
  }

}