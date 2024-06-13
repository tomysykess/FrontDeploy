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
interface UserTokenLogin {
  email: string;
  firebaseUid: string;
  id: string;
  name: string;
  profileImage: any;
  provider: any;
  role: number;
  token: any;
}

const AuthStore: React.FC<AuthProps> = ({ children }) => {
  const [token, setToken]: any = useState();
  const [userData, setUserData]: any = useState();
  const [loginData, setLoginData]: any = useState();
  useEffect(() => {
    const fetchUserData = async () => {
      const userDataLogin = localStorage.getItem("userDataLogin");

      if (userDataLogin) {
        const userData: UserToken = JSON.parse(userDataLogin);
        setUserData(userData);
        const { id, token } = userData;
        setToken(token);
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
          const newDataLogin = res.data;
          const { token } = newDataLogin;
          setToken(token);
          console.log("Nuevo token obtenido:", token);

          const response = await axios.get(
            `https://liquors-project.onrender.com/users/${id}`
          );
          const newUserData: any = response.data;
          setLoginData(newUserData);
          console.log("Datos del usuario nuevos", newUserData);

          if (loginData.role !== userData.role) {
            console.log("Datos del usuario han cambiado", newUserData);

            // Actualizar el token en los datos del usuario
            newUserData.token = token;
            localStorage.setItem("userDataLogin", JSON.stringify(newUserData));
          }
        } catch (fetchError) {
          console.error("Error al obtener datos del usuario:", fetchError);
        }
      }
    };
    /* nuevo  */
    fetchUserData();
  }, [userData]); // Dependencias vacías para que se ejecute solo una vez al montar el componente

  return <div>{children}</div>;
};

export default AuthStore;
