import axios from "axios";
import { IProductUpdatedData } from "@/components/productForm/types";
import Swal from "sweetalert2";

export const putProduct = async (productId: string, dataProduct: IProductUpdatedData, token: string) => {
  console.log("productdata", dataProduct)
  try {
      const response = await axios.put<IProductUpdatedData>(`https://liquors-project.onrender.com/products/${productId}`, 
        dataProduct,
        {headers: {authorization: `bearer ${token}`}
      })
      console.log(response);
      if (response.status === 200 && window.location.href !== 'https://liquors-project.onrender.com/') {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `El producto ${dataProduct.name} se edito con exito`,
            showConfirmButton: false,
            timer: 2000
          });
      }
  } catch (error) {
      console.error("error al agregar el producto", error);
  }
}