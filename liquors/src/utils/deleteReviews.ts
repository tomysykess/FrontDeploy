import axios from "axios";
import { AppDispatch } from "@/store/store";
import { removeReview } from "@/store/reducers/reviewsSlice";
import Swal from 'sweetalert2'

export const deleteReview = async (reviewId: string, dispatch: AppDispatch) => {
  const detailProduct = localStorage.getItem("detailProduct");
  const userDataLogin = localStorage.getItem("userDataLogin");
  if (detailProduct && userDataLogin) {
    const idProduct = JSON.parse(detailProduct);
    const idUser = JSON.parse(userDataLogin);
    const idP = idProduct.id;
    const idU = idUser.id;
    const token = idUser.token;
    const url = `https://liquors-project.onrender.com/reviews/delete/${reviewId}`;

    try {
      const res = await axios.put(
        url,
        {},
        {
          headers: {
            authorization: `Bearer: ${token}`,
          },
        }
      );
      console.log("respuesta de back al delete", res);
      dispatch(removeReview(reviewId));
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Favorito eliminado con exito",
        showConfirmButton: false,
        timer: 1500
      });
    } catch (error) {
      console.log("error al borrar review", error);

      throw new Error("Error eliminando la review");
    }
  }
};
