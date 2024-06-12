"use client";
import { IReview } from "@/interfaces/interfaz";
import { RootState } from "@/store/store";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { readReviews } from "@/store/reducers/reviewsSlice"; // Asumimos que tienes una acción llamada setReviews

export const Reviews = () => {
  const data = useSelector((state: RootState) => state.reviews.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get<IReview[]>(
          "https://liquors-project.onrender.com/reviews/product/2f9c8e2f-6dab-4818-bc18-52fe0f958067"
        );
        dispatch(readReviews(res.data));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    if (!data || data.length === 0) {
      fetchReviews();
    }
  }, [data, dispatch]);

  return (
    <div>
      {data?.map((review) => (
        <p key={review.id}>{review.comment}</p>
      ))}
    </div>
  );
};
