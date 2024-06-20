import axios from "axios";
import { AppDispatch } from "@/store/store";
import { readReviews, clearReviews } from "@/store/reducers/reviewsSlice";
import { IReview } from "@/interfaces/interfaz";

export const fetchReviews = async (dispatch: AppDispatch) => {
  const detailProduct = localStorage.getItem("detailProduct");
  const idProduct = JSON.parse(detailProduct!);
  const idP = idProduct.id;

  if (detailProduct) {
    try {
      const res = await axios.get<any>(
        `https://liquors-project.onrender.com/reviews/product/${idP}`
      );
      dispatch(clearReviews());
      dispatch(readReviews(res.data.reviews));
    } catch (err) {
      console.error(err);
    }
  }
};

export const averageReviews = async ({ idProduct }: any) => {
  if (!idProduct) {
    console.error("Product ID is required");
    return null;
  }

  try {
    const res = await axios.get(
      `https://liquors-project.onrender.com/reviews/product/${idProduct}`
    );
    const average = res.data.promRate;
    return average;
  } catch (error) {
    console.error("Error fetching average reviews:", error);
    return null;
  }
};

export const fetchReviewsAdmin = async (
  token: string,
  dispatch: AppDispatch
) => {
  {
    try {
      const res = await axios.get<any>(
        `https://liquors-project.onrender.com/reviews`,
        {
          headers: { authorization: `Bearer: ${token}` },
        }
      );

      dispatch(readReviews(res.data));
    } catch (err) {
      console.error(err);
    }
  }
};
