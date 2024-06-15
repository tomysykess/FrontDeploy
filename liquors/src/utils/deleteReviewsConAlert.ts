import axios from "axios";
import { AppDispatch } from "@/store/store";
import { removeReview } from "@/store/reducers/reviewsSlice";
import Swal from 'sweetalert2';

export const deleteReviewConAlert = async (reviewId: string, dispatch: AppDispatch) => {
  const detailProduct = localStorage.getItem("detailProduct");
  const userDataLogin = localStorage.getItem("userDataLogin");
  
  if (detailProduct && userDataLogin) {
    const idProduct = JSON.parse(detailProduct);
    const idUser = JSON.parse(userDataLogin);
    const token = idUser.token;
    const url = `https://liquors-project.onrender.com/reviews/${reviewId}`;

    try {
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("respuesta de back al delete", res);

      // Si la eliminación fue exitosa, actualiza el estado local y muestra la alerta
      dispatch(removeReview(reviewId));

      return true; // Indica éxito al eliminar
    } catch (error: any) {
      console.log("error al borrar review", error.response.data.message);
      throw new Error(`${error.response.data.message}`);
    }
  }

  return false; // Indica que no se pudo eliminar debido a datos faltantes
};