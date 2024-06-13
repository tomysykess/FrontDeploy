"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
  const [token, setToken] = useState<string | null>(null); // Inicializa el estado con el tipo adecuado

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataLogin = localStorage.getItem("userDataLogin");

      if (userDataLogin) {
        const userData: UserToken = JSON.parse(userDataLogin);
        const userId = userData.id;
        const userToken = userData.token;
        setToken(userToken);
        console.log("first TOKEN", userToken);

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
          console.error("Error al iniciar sesión:", error);
        }

        try {
          const response = await axios.get(
            `https://liquors-project.onrender.com/users/${userId}`
          );
          const newUserData: any = response.data;

          if (
            newUserData.role !== userData.role ||
            newUserData.token !== token
          ) {
            console.log("Datos del usuario han cambiado");

            // Actualizar el token en los datos del usuario
            newUserData.token = token;
            localStorage.setItem("userDataLogin", JSON.stringify(newUserData));
          }
        } catch (fetchError) {
          console.error("Error al obtener datos del usuario:", fetchError);
        }
      }
    };

    fetchUserData();
  }, []); // Dependencias vacías para que se ejecute solo una vez al montar el componente

  return <div>{children}</div>;
};

export default AuthStore;
