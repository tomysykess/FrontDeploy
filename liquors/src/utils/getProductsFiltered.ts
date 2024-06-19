import axios from "axios";
import { AppDispatch } from "@/store/store";
import { clearProductsFiltered, readProductsFiltered} from "@/store/reducers/productsSlice";
import { Product } from "@/interfaces/interfaz";

export const fetchProductsFiltered = async (dispatch: AppDispatch, filters: any, router: any) => {
  try {
      const abv = filters.abvRange
      const category = filters.categoryButton ? `category=${filters.categoryButton}&` : '';
      const averageRate = filters.selectedRating? `averageRate=${filters.selectedRating}&` : '';
      console.log("valor que envio de category si no se selcciona nada", averageRate);
      const res = await axios.get<Product[]>(`https://liquors-project.onrender.com/products?${category}abv=${abv}&${averageRate}limit=200`);
      console.log("respuesta back", res);
      dispatch(clearProductsFiltered());
      dispatch(readProductsFiltered(res.data));
      router.push("/product/productFilteredBackEnd")
  } catch (err) {
      console.error(err);
  }
};