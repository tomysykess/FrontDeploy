import axios from "axios";
import { IProductUpdatedData } from "@/components/productForm/types";

export const putProduct = async (productId: string, dataProduct: IProductUpdatedData, token: string) => {
  try {
      const response = await axios.put<IProductUpdatedData>(`https://liquors-project.onrender.com/products/${productId}`, 
        dataProduct,
        {headers: {Authorization: `bearer ${token}`}
      })
      console.log(response);
  } catch (error) {
      console.error("error al agregar el producto", error);
  }
}