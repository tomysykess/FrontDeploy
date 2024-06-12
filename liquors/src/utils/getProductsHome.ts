import axios from "axios";
import { AppDispatch } from "@/store/store";
import { readProducts } from "@/store/reducers/productsSlice";
import { clearProducts } from "@/store/reducers/productsSlice";
import { Product } from "@/interfaces/interfaz";

export const fetchProductsHome = async (dispatch: AppDispatch, page: any) => {
  
 
    try {
        const res = await axios.get<Product[]>(`https://liquors-project.onrender.com/products/?page=1&limit=10`);
        dispatch(clearProducts());
        dispatch(readProducts(res.data))
    } catch (err) {
        console.error(err);
    }
  };