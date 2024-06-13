import axios from "axios";
import { AppDispatch } from "@/store/store";
import { removeReview } from "@/store/reducers/reviewsSlice";

export const deleteReview = async (reviewId: string, dispatch: AppDispatch) => {
  const detailProduct = localStorage.getItem("detailProduct");
  const userDataLogin = localStorage.getItem("userDataLogin");
  if (detailProduct && userDataLogin) {
    const idProduct = JSON.parse(detailProduct);
    const idUser = JSON.parse(userDataLogin);
    const idP = idProduct.id;
    const idU = idUser.id;
    const token = idUser.token;
    const url = `https://liquors-project.onrender.com/reviews/${reviewId}`;

    try {
      await axios.delete(url, {
        headers: {
          authorization: `Bearer: ${token}`,
        },
      });
      dispatch(removeReview(reviewId));
    } catch (error) {
      throw new Error("Error eliminando la review");
    }
  }
};
