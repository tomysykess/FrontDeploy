//react
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Product } from "@/interfaces/interfaz";
import { RootState } from "@/store/store";
import { getCajaMensual } from "@/utils/cajaMensual";

export const MapProductCaja: React.FC = (): React.ReactNode => {

  const dispatch = useDispatch();
  const dataSuscribedBox = useSelector((state: RootState) => state.users.data);

  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const userData = localStorage.getItem("userDataLogin");
    if (userData) {
      const idParsed = JSON.parse(userData);
      setUserId(idParsed.id);
    }
  }, []);

  console.log("data box",dataSuscribedBox);
  

  //GET PRODUCTS A LA API + CARGA DE DATOS EN LA STORE.
  useEffect(() => {
    if (dataSuscribedBox.length === 0) {
        getCajaMensual(dispatch, userId)
    }
  }, [userId, dataSuscribedBox.length]);



  return (
    <>
      <p>algoo</p>
    </>
  );
};

export default  MapProductCaja;
