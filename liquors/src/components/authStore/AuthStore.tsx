"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

interface AuthProps {
  children: React.ReactNode;
}

const AuthStore: React.FC<AuthProps> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null); // Inicializa el estado con el tipo adecuado

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataLogin = localStorage.getItem("userDataLogin");

      if (userDataLogin) {
        const userData = JSON.parse(userDataLogin);
        const userId = userData.id;
        const userToken = userData.token;
        setToken(userToken);

        try {
          const response = await axios.get(
            `https://liquors-project.onrender.com/users/${userId}`
          );
          const newUserData = response.data;

          if (newUserData.token !== userToken) {
            console.log("Token cambiado");
            setToken(newUserData.token);
            newUserData.token = newUserData.token; // Corregir si hay lógica específica aquí
            localStorage.setItem("userDataLogin", JSON.stringify(newUserData));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [Provider]);

  return <div>{children}</div>;
};

export default AuthStore;
