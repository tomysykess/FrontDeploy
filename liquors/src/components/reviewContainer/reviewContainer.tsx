"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "@/utils/getReviews";
import { IReview } from "@/interfaces/interfaz";
import { clearReviews, readReviews } from "@/store/reducers/reviewsSlice";
import { RootState } from "@/store/store";
import { Review } from "../review/review";

export const ReviewContainer: React.FC = () => {
  const dataReviews: IReview[] = useSelector(
    (state: RootState) => state.reviews.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearReviews());
  }, [dispatch]);
  /* ESTE USE EFFECT */
  useEffect(() => {
    fetchReviews(dispatch);
  }, [dispatch]);

  console.log("dataReviews", dataReviews);

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-darkMode-grey1 p-6 rounded-xl shadow-md">
      {dataReviews.length > 0 ? (
        dataReviews.map((review: IReview) => (
          <Review key={review.id} review={review} />
        ))
      ) : (
        <p className="text-gray-500 dark:text-darkMode-white">¡Sé el primero en hacer una reseña!</p>
      )}
    </div>
  );
};
