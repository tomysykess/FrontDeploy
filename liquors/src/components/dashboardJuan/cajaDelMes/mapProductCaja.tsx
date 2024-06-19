import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { RootState } from "@/store/store";
import { getCajaMensual, deleteCajaMensual } from "@/utils/cajaMensual";

export const MapProductCaja: React.FC = () => {
  const dispatch = useDispatch();
  const dataSuscribedBox = useSelector((state: RootState) => state.users.userBox);
  const [userId, setUserId] = useState<string>('');

  useEffect(() => {
    const userData = localStorage.getItem("userDataLogin");
    if (userData) {
      const idParsed = JSON.parse(userData);
      setUserId(idParsed.id);
    }
  }, []);

  useEffect(() => {
    if (dataSuscribedBox.length === 0) {
      getCajaMensual(dispatch);
    }
  }, [userId, dataSuscribedBox.length, dispatch]);

  const handleUnsubscribe = (productId: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¿Deseas anular la suscripción?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, anular',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCajaMensual(dispatch, productId, userId).then(() => {
          getCajaMensual(dispatch);
          Swal.fire(
            '¡Anulado!',
            'Tu suscripción ha sido anulada.',
            'success'
          );
        });
      }
    });
  };

  if (dataSuscribedBox.length === 0) {
    return <div>No estás suscrito a ninguna caja.</div>;
  }

  const subscribedBox = dataSuscribedBox[0];

  return (
    <div className="max-w-sm mx-auto my-10 bg-white shadow-md rounded-lg overflow-hidden">
      <img className="w-full h-48 object-cover" src={subscribedBox.imgUrl} alt={subscribedBox.name} />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-2">{subscribedBox.name}</h2>
        <p className="text-gray-700 mb-2">Marca: {subscribedBox.brand}</p>
        <p className="text-gray-700 mb-2">Categoría: {subscribedBox.category}</p>
        <p className="text-gray-700 mb-2">País: {subscribedBox.country}</p>
        <p className="text-gray-700 mb-2">Descripción: {subscribedBox.description}</p>
        <p className="text-gray-700 mb-2">ABV: {subscribedBox.abv}%</p>
        <p className="text-gray-700 mb-2">Tamaño: {subscribedBox.size}</p>
        <p className="text-gray-700 mb-2">Calificación: {subscribedBox.rate} estrellas</p>
      </div>
      {subscribedBox.active && (
        <button
          onClick={() => handleUnsubscribe(subscribedBox.id)}
          className="w-full bg-red-500 text-white py-3 font-semibold flex items-center justify-center"
        >
          Anular suscripción
        </button>
      )}
    </div>
  );
};

export default MapProductCaja;