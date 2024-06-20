import React, { useEffect, useState } from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import Swal from "sweetalert2";
import { postCajaMensual, getCajaStatus } from "@/utils/cajaMensual";
import { useDispatch } from "react-redux";

const SubscriptionBox: React.FC = (): React.ReactNode => {
  const dispatch = useDispatch();

  //caja mensual
  const [dataCajaMesParsed, setDataCajaMesParsed] = useState<any>(null);

  //producto de caja mensual
  const [selectedProductWine, setSelectedProductWine] = useState<any>(null);
  console.log(selectedProductWine);

  //estado de suscripcion a caja
  const [boxActive, setBoxActive] = useState<boolean>(false);

  const [wineSubscribed, setWineSubscribed] = useState(false);
  const [userId, setUserId] = useState<string>("");
  const [idProductWine, setProductIdWine] = useState<any>();
  const [imgUrlWine, setImgUrlWine] = useState<any>();

  //obtengo userId
  useEffect(() => {
    const userData = localStorage.getItem("userDataLogin");
    if (userData) {
      const idParsed = JSON.parse(userData);
      setUserId(idParsed.id || "");
    }

    //useEffect para obtener la caja mensual
    const cajaMesStorage = localStorage.getItem("cajaDelMes");
    if (cajaMesStorage) {
      const cajaMesParsed = JSON.parse(cajaMesStorage);
      setDataCajaMesParsed(cajaMesParsed);
      const selectedProduct =
        cajaMesParsed.length > 3 ? cajaMesParsed[3] : null;
      setSelectedProductWine(selectedProduct);
      // Aquí actualizamos idProductWine cuando selectedProductWine cambie
      setProductIdWine(selectedProduct ? selectedProduct.id : null);
      setImgUrlWine(selectedProduct ? selectedProduct.imgUrl : null);
    }
  }, []);

  //useEffect para obtener el estado de la suscripcion
  useEffect(() => {
    getCajaStatus((status: boolean) => {
      setBoxActive(status);
      setWineSubscribed(status);
    });
  }, []);

  //HANDLER POST CAJA
  const subscribeToWineBox = () => {
    if (!wineSubscribed) {
      postCajaMensual(idProductWine, userId).then(() => {
        setWineSubscribed(true);
        setBoxActive(true);
        Swal.fire({
          title: "¡Suscrito con éxito!",
          icon: "success",
          confirmButtonText: "OK",
        });
      });
    }
  };

  if (!dataCajaMesParsed || !selectedProductWine) {
    return null; // O manejar el caso cuando los datos de localStorage no están disponibles
  }

  return (
    <div className="flex justify-center space-x-10">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-plus-jakarta-sans font-normal dark:text-darkMode-white">
          <CardGiftcardIcon /> Caja de {selectedProductWine.name}
        </h1>
        <ArrowDownwardIcon className="dark:text-darkMode-white" />
        <div className="relative bg-white dark:bg-grey3 shadow-md rounded-t-3xl overflow-hidden w-80 h-96">
          <div className="bg-red-500 h-1/2"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img
              src={imgUrlWine}
              alt="Caja de Vino"
              className="w-40 h-48 object-cover"
            />
          </div>
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center">
            <h3 className="text-lg font-semibold"></h3>
          </div>
          <button
            onClick={subscribeToWineBox}
            className={`absolute bottom-0 w-full ${
              wineSubscribed ? "bg-green-500 opacity-60" : "bg-green-500"
            } text-white py-3 font-semibold flex items-center justify-center`}
            disabled={boxActive}
          >
            {boxActive ? (
              "Suscrito con éxito"
            ) : (
              <>
                <span className="absolute left-4">+</span>
                Suscribirse a la caja
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBox;
