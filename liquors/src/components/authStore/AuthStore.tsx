"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

interface AuthProps {
  children: React.ReactNode;
}
interface UserToken {
  email: string;
  firebaseUid: string;
  id: string;
  name: string;
  provider: any;
  role: number;
  token: string;
}

const AuthStore: React.FC<AuthProps> = ({ children }) => {
  const [token, setToken]: any = useState();

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataLogin = localStorage.getItem("userDataLogin");

      if (userDataLogin) {
        const userData: UserToken = JSON.parse(userDataLogin);

        const userId = userData.id;
        const userToken = userData.token;
        setToken(userToken!);
        console.log("first TOKEN", token);
        const loginObjet = {
          email: userData.email,
          firebaseUid: userData.firebaseUid,
        };
        try {
          const res = await axios.post(
            "https://liquors-project.onrender.com/users/signin",
            loginObjet
          );
          const newToken = res.data.token;
          setToken(newToken);
          console.log("Nuevo token obtenido:", newToken);
        } catch (error) {
          console.log(error);
        }

        /* -------------------------------------------------- */
        try {
          const response = await axios.get(
            `https://liquors-project.onrender.com/users/${userId}`
          );
          const newUserData: UserToken = response.data;

          if (newUserData.role !== userData.role) {
            console.log("Datos del usuario han cambiado");

            // Actualizar el token en los datos del usuario
            newUserData.token = token!;
            localStorage.setItem("userDataLogin", JSON.stringify(newUserData));
          }
        } catch (fetchError) {
          console.error("Error al obtener datos del usuario:", fetchError);
        }
      }
    };
    fetchUserData();
  }, [Provider]);

  return <div>{children}</div>;
};

export default AuthStore;
