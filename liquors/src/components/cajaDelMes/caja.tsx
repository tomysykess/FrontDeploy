import React, { useState } from "react";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const SubscriptionBox: React.FC = () => {
  const [wineSubscribed, setWineSubscribed] = useState(false);
  const [ginSubscribed, setGinSubscribed] = useState(false);

  const toggleWineSubscription = () => {
    setWineSubscribed(!wineSubscribed);
  };

  const toggleGinSubscription = () => {
    setGinSubscribed(!ginSubscribed);
  };

  return (
    <div className="flex justify-center space-x-10">
      {/* Caja de Vino */}
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-plus-jakarta-sans font-bold">Caja de Vino</h1>
        <ArrowDownwardIcon />
        <div className="relative bg-white shadow-md rounded-lg overflow-hidden w-80 h-96">
          <div className="bg-red-500 h-1/2"></div>
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
            <img src="/path/to/wine-image.jpg" alt="Caja de Vino" className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg" />
          </div>
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center">
            <h3 className="text-lg font-semibold">Vino + Ron</h3>
          </div>
          <button
            onClick={toggleWineSubscription}
            className="absolute bottom-0 w-full bg-green-500 text-white py-3 font-semibold flex items-center justify-center"
          >
            Suscribirse a la caja {wineSubscribed ? "-" : "+"}
          </button>
        </div>
      </div>

      {/* Caja de Gin */}
      <div className="flex flex-col font-plus-jakarta items-center">
        <h1 className="text-2xl font-plus-jakarta-sans font-bold">Caja de Gin</h1>
        <ArrowDownwardIcon />
        <div className="relative bg-white shadow-md rounded-lg overflow-hidden w-80 h-96">
          <div className="bg-blue-500 h-1/2"></div>
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
            <img src="/path/to/gin-image.jpg" alt="Caja de Gin" className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg" />
          </div>
          <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-center">
            <h3 className="text-lg font-semibold">Gin + Vodka</h3>
          </div>
          <button
            onClick={toggleGinSubscription}
            className="absolute bottom-0 w-full bg-green-500 text-white py-3 font-semibold flex items-center justify-center"
          >
            Suscribirse a la caja {ginSubscribed ? "-" : "+"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBox;