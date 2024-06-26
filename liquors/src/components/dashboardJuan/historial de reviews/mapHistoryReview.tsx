'use client'
import React,{ useEffect, useState } from "react";
import { getUserReview } from "@/utils/getUserReview";
import { CardHistoryReview } from "./cardHistoryReview";
import { useDispatch, useSelector } from "react-redux";
import { IReview } from "@/interfaces/interfaz";
import FmdBadOutlinedIcon from '@mui/icons-material/FmdBadOutlined';

export const MapUserHistorialReviews: React.FC = (): React.ReactNode => {

    const dispatch = useDispatch();
    const reviewData = useSelector((state: any) => state.reviews.userProductReview);

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
        if (reviewData.length === 0 && userTokenAndId.token && userTokenAndId.id) {
            getUserReview(userTokenAndId, dispatch);
        }
    }, [userTokenAndId, dispatch, reviewData.length]);

    if (reviewData.length === 0) {
        return <div className="font-plus-jakarta-sans flex justify-center dark:text-darkMode-greyMLfilter"><FmdBadOutlinedIcon/>Aun no has hecho reseñas.</div>;
      }
    

    return (
        <>  
            {/*MAPEA UNA CARD DE REVIEW, POR CADA REVIEW DEL USUARIO. */}
            {reviewData.map((product: IReview) => (
                <div key={product.id} className="flex flex-col  ">
                    <CardHistoryReview  key={product.id} product={product}/>
                </div>
            ))}
        </>
    )
}
