import axios from "axios";
import { IProductUpdatedData } from "@/components/productForm/types";

export const postProduct = async (userId: string, dataProduct: IProductUpdatedData, token: string) => {
  try {
      const response = await axios.post<IProductUpdatedData>(`https://liquors-project.onrender.com/products/${userId}`, 
        dataProduct,
        {headers: {authorization: `Bearer: ${token}`}})
      console.log(response);
  } catch (error) {
      console.error("error al agregar el producto", error);
  }
}
