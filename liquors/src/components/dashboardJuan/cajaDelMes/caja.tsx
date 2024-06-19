import React, { useEffect, useState } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import { postCajaMensual, deleteCajaMensual } from "@/utils/cajaMensual";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Product, ProductsState } from "@/interfaces/interfaz";

const SubscriptionBox: React.FC = () => {

  const dispatch = useDispatch();

  // Utiliza useSelector para obtener el estado global de productos (en un futuro solo traeria dato del estado global de cajaAdmin)
  const dataCajaMes: Product[] = useSelector((state: RootState) => state.products.data);

  // Estados locales
  const [wineSubscribed, setWineSubscribed] = useState(false);
  const [ginSubscribed, setGinSubscribed] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [idProduct, setProductId] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');

  
  useEffect(() => {
    if (dataCajaMes.length > 0) {
      const selectedProduct = dataCajaMes[1];
      setProductId(selectedProduct.id);
      setImgUrl(selectedProduct.imgUrl);
      console.log(selectedProduct.imgUrl); //nose porque no me aparece nada cuando llamo a la propiedad imgUrl
    }
  }, [dataCajaMes]);

  
  useEffect(() => {
    const userData = localStorage.getItem("userDataLogin");
    if (userData) {
      const idParsed = JSON.parse(userData);
      setUserId(idParsed.id);
    }
  }, []);

 // Handler para POST O DELETE BOX
 const toggleWineSubscription = () => {
  const newSubscriptionState = !wineSubscribed;
  setWineSubscribed(newSubscriptionState);
  if (newSubscriptionState) {
    postCajaMensual(idProduct, userId);
  } else {
    deleteCajaMensual(dispatch, idProduct, userId);
  }
};

 // Handler para POST O DELETE BOX
const toggleGinSubscription = () => {
  const newSubscriptionState = !ginSubscribed;
  setGinSubscribed(newSubscriptionState);
  if (newSubscriptionState) {
    postCajaMensual(idProduct, userId);
  } else {
    deleteCajaMensual(dispatch, idProduct, userId);
  }
};

  return (
    <div className="flex justify-center space-x-10">
      {/* Caja de Vino */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-plus-jakarta-sans font-normal">
          <CardGiftcardIcon /> Caja de Vino
        </h1>
        <ArrowDownwardIcon />
        <div className="relative bg-white shadow-md rounded-t-3xl overflow-hidden w-80 h-96">
          <div className="bg-red-500 h-1/2"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src={imgUrl} alt="Caja de Vino" className="w-40 h-48 object-cover" />
          </div>
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center">
            <h3 className="text-lg font-semibold"></h3>
          </div>
          <button
            onClick={toggleWineSubscription}
            className={`absolute bottom-0 w-full ${wineSubscribed ? "bg-red-500" : "bg-green-500"} text-white py-3 font-semibold flex items-center justify-center`}
          >
            <span className="absolute left-4">{wineSubscribed ? "-" : "+"}</span>
            {wineSubscribed ? "Anular la suscripción" : "Suscribirse a la caja"}
          </button>
        </div>
      </div>

      {/* Caja de Gin */}
      <div className="flex flex-col font-plus-jakarta items-center">
        <h1 className="text-2xl font-plus-jakarta-sans font-normal">
          <CardGiftcardIcon /> Caja de Gin
        </h1>
        <ArrowDownwardIcon />
        <div className="relative bg-white shadow-md rounded-t-3xl overflow-hidden w-80 h-96">
          <div className="bg-blue-500 h-1/2"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <img src="https://firebasestorage.googleapis.com/v0/b/liquors-12b23.appspot.com/o/Gin_Aviation-removebg-preview.webp?alt=media&token=db580926-e00d-4e0a-857c-1bcb4ae2f4fe" alt="Caja de Gin" className="w-40 h-48 object-cover " />
          </div>
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center">
            <h3 className="text-lg font-semibold"></h3>
          </div>
          <button
            onClick={toggleGinSubscription}
            className={`absolute bottom-0 w-full ${ginSubscribed ? "bg-red-500" : "bg-green-500"} text-white py-3 font-semibold flex items-center justify-center`}
          >
            <span className="absolute left-4">{ginSubscribed ? "-" : "+"}</span>
            {ginSubscribed ? "Anular la suscripción" : "Suscribirse a la caja"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBox;