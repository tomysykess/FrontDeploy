"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReviews } from "@/utils/getReviews";
import { IReview } from "@/interfaces/interfaz";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { RootState } from "@/store/store";
import { deleteReview } from "@/utils/deleteReviews";

export const Review = ({ review }: { review: IReview }) => {
  const [data, setData] = useState<any>();
  const dataReviews: IReview[] = useSelector(
    (state: RootState) => state.reviews.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const userDataLogin = localStorage.getItem("userDataLogin");
    const userData = userDataLogin ? JSON.parse(userDataLogin) : null;
    setData(userData);
    fetchReviews(dispatch);
    console.log("dataReviews", dataReviews);
  }, [dispatch, dataReviews]);

  const { id, rate, comment, userId } = review;
  const { name } = userId;

  const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta review?")) {
      try {
        await deleteReview(id, dispatch);
        alert("Review eliminada con éxito.");
      } catch (error) {
        console.error("Error eliminando la review:", error);
        alert("Hubo un error eliminando la review.");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-md mx-4 my-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-gray-800">{rate}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={i < rate ? "text-yellow-400" : "text-gray-300"}
              />
            ))}
          </div>
        </div>
        {data?.name === name ? (
          <button
            onClick={() => handleDelete(id)}
            className="text-red-600 hover:text-red-800 transition-colors"
          >
            <DeleteIcon />
          </button>
        ) : (
          ""
        )}
      </div>
      <p className="text-gray-600 italic">&quot;{comment}&quot;</p>
      <h3 className="text-right text-sm font-medium text-gray-500">- {name}</h3>
    </div>
  );
};
