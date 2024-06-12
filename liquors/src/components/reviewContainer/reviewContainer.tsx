"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "@/utils/getReviews";
import { Review } from "../review/review";
import { IReview } from "@/interfaces/interfaz";
import { clearReviews } from "@/store/reducers/reviewsSlice";
import { RootState } from "@/store/store";

export const ReviewContainer: React.FC = () => {
  const dataReviews: IReview[] = useSelector(
    (state: RootState) => state.reviews.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearReviews());
  }, [dispatch]);

  useEffect(() => {
    if (dataReviews.length === 0 || dataReviews.length <= 5) {
      fetchReviews(dispatch);
    }
  }, [dispatch, dataReviews.length]);

  console.log("dataReviews", dataReviews);

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md ">
      {dataReviews.length > 0 ? (
        dataReviews.map((review: IReview) => (
          <Review key={review.id} review={review} />
        ))
      ) : (
        <p className="text-gray-500">Sé el primero en hacer una reseña!</p>
      )}
    </div>
  );
};
