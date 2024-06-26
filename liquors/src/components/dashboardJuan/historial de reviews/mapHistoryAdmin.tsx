"use client";
import React, { useEffect, useState } from "react";
import { getUserReview } from "@/utils/getUserReview";
import { CardHistoryReview } from "./cardHistoryReview";
import { useDispatch, useSelector } from "react-redux";
import { IReview } from "@/interfaces/interfaz";
import { fetchReviewsAdmin } from "@/utils/getReviews";
import { CardHistoryReviewAdmin } from "./cardHistoryReviewAdmin";

export const MapUserHistorialReviewsAdmin: React.FC = (): React.ReactNode => {
  const dispatch = useDispatch();
  const reviewData = useSelector((state: any) => state.reviews.data);

  //TOKEN & ID PARA LA SOLICITUD

  const [userTokenAndId, setDataUser] = useState({
    token: "",
    id: "",
  });

  //obtengo token e item para mandarlo en la solicitud de reviews
  useEffect(() => {
    const userDataFromStorage = localStorage.getItem("userDataLogin");
    if (userDataFromStorage) {
      const dataParsed = JSON.parse(userDataFromStorage);
      setDataUser({ token: dataParsed.token, id: dataParsed.id });
    }
  }, []);

  //hago la solicitud de reviews por usuario. (por ahora guardo la data en estado local * ver de usar estado global.)
  useEffect(() => {
    if (reviewData.length === 0) {
      fetchReviewsAdmin(userTokenAndId.token, dispatch);
      console.log("reviewData", reviewData);
    }
  }, [userTokenAndId, dispatch, reviewData.length]);

  return (
    <>
      {/*MAPEA UNA CARD DE REVIEW, POR CADA REVIEW DEL USUARIO. */}
      {reviewData.map((product: IReview) => (
        <CardHistoryReviewAdmin key={product.id} product={product} />
      ))}
    </>
  );
};
