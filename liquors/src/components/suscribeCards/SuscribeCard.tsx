"use client";
import { ISuscribe } from "@/interfaces/interfaz";
import axios from "axios";
import { headers } from "next/headers";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("APP_USR-9e5c6b96-b88e-4b42-ba57-944a9c10dcf9");

const SuscribeCard = ({ product }: { product: ISuscribe }) => {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState(0);
  const [userData, setUserData] = useState();
  const [token, setToken] = useState<any>(null);

  /*  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);  */

  useEffect(() => {
    const userDataLogin = localStorage.getItem("userDataLogin");
    if (userDataLogin) {
      const userData = JSON.parse(userDataLogin);
      const token = userData.token;
      setToken(token);
      console.log("este es el token", token);
      setUserData(userData);
      setRole(userData.role);
      setUserId(userData.id);
    }
  }, []);

  const customization = {
    visual: {
      buttonBackground: "black",
      borderRadius: "6px",
    },
  };

  const handlePaymentMP = async () => {
    try {
      if (role === product.role) {
        console.log(role);
        alert(`Ya eres un usuario ${product.type}`);
        return;
      }
      if (role === 4 && product.role === 3) {
        const response = await axios.post(
          `https://liquors-project.onrender.com/subscription/${userId}`,
          {
            type: "seller",
            amount: 200,
            amountDif: 100,
          },
          {
            headers: {
              authorization: `Bearer: ${token}`,
            },
          }
        );
        console.log(response);
        router.push(response.data.init_point);
        return;
      }
      if (role === 3 && product.role === 4) {
        alert("Ya eres un usuario seller");
        return;
      }
      if (userData) {
        const res = await axios.post(
          `https://liquors-project.onrender.com/subscription/${userId}`,
          {
            type: product.type,
            amount: product.price,
          },
          {
            headers: {
              authorization: `Bearer: ${token}`,
            },
          }
        );
        console.log(res);
        router.push(res.data.init_point);
      } else {
        alert("Debes ingresar para poder suscribirte");
      }
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  };

  const handlePaymentPP = async () => {
    try {
      if (role === product.role) {
        console.log(role);
        alert(`Ya eres un usuario ${product.type}`);
        return;
      }
      if (role === 4 && product.role === 3) {
        const response = await axios.post(
          `https://liquors-project.onrender.com/paypal/create-order/?userId=${userId}`,
          {
            type: "seller",
            amount: 200,
            amountDif: 100,
          },
          {
            headers: {
              authorization: `Bearer: ${token}`,
            },
          }
        );
        console.log(response);
        router.push(response.data.links[1].href);
        return;
      }
      if (role === 3 && product.role === 4) {
        alert("Ya eres un usuario seller");
        return;
      }
      if (userData) {
        const res = await axios.post(
          `https://liquors-project.onrender.com/paypal/create-order/?userId=${userId}`,
          {
            type: product.type,
            amount: product.price,
          },
          {
            headers: {
              authorization: `Bearer: ${token}`,
            },
          }
        );
        console.log(res.data.links);
        router.push(res.data.links[1].href);
      } else {
        alert("Debes ingresar para poder suscribirte");
      }
    } catch (error) {
      console.error("Error handling payment:", error);
    }
  };

  return (
    <div className="max-w-sm w-full bg-white dark:bg-darkMode-grey1 rounded-xl shadow-2xl overflow-hidden my-4 bg-opacity-85">
      <div className="p-8">
        <div className="flex justify-between text-wine">
          <h2 className="block mt-1 text-center text-2xl leading-tight font-plus-jakarta-sans text-gray-900 dark:text-darkMode-white ">
            {product.title}
          </h2>
          <WorkspacePremiumIcon className=" top-0 right-0" fontSize="large" />
        </div>
        <p className="mt-2 text-gray-600 font-semibold dark:text-darkMode-white">
          {product.description1}
        </p>
        <ul className="mt-4 text-gray-600 list-disc list-inside dark:text-darkMode-white">
          <li>{product.description2}</li>
          <li>{product.description3}</li>
          <li>{product.description4}</li>
        </ul>
        <div className="mt-6">
          <span className="block text-3xl font-bold text-gray-900">
            ${product.price}/mes
          </span>
          <div className="align-center">
            <div className="flex flex-col">
              <div id="wallet_container">
                <button
                  className="mt-4 px-6 py-2 w-full bg-MP dark:bg-darkMode-MP flex justify-center text-white font-semibold rounded-lg shadow-md  focus:outline-none focus:ring-2  focus:ring-opacity-75 transition duration-200"
                  onClick={handlePaymentMP}
                >
                  <div>
                    <img
                      src="mercado-pago-logo-0 1.png"
                      className="w-auto h-5"
                    />
                  </div>
                </button>
              </div>
              <button
                className="mt-4 px-6 py-2 w-full bg-PP dark:bg-darkMode-PP flex justify-center text-white font-semibold rounded-lg shadow-lg  focus:outline-none focus:ring-2  focus:ring-opacity-75 transition duration-200"
                onClick={handlePaymentPP}
              >
                <div>
                  <img
                    src="paypal-logo-0-2048x2048-1 1.png"
                    className="w-auto h-5"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuscribeCard;
