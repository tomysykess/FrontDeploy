import axios from "axios";
import { AppDispatch } from "@/store/store";
import { readGinProducts } from "@/store/reducers/productsSlice";
import { clearGinProducts } from "@/store/reducers/productsSlice";
import { Product } from "@/interfaces/interfaz";

export const fetchProductsGin = async (dispatch: AppDispatch) => {
  try {
    //que solo traiga 4 paginas
      const res = await axios.get<Product[]>("https://liquors-project.onrender.com/products/?category=Gin&page=1&limit=10");
      dispatch(clearGinProducts());
      dispatch(readGinProducts(res.data));
  } catch (err) {
      console.error(err);
  }
};