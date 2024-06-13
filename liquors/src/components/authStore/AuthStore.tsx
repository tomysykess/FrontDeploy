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
  const [token, setToken]: any = useState(); // Inicializa el estado con el tipo adecuado

  useEffect(() => {
    const fetchUserData = async () => {
      const userDataLogin = localStorage.getItem("userDataLogin");

      //USERDATA LOGIN
      /*       const userDataLogin: any = {
        name: formData.name,
        email: userCredential.user.email,
        id: response.data.id,
        role: response.data.role,
        token: response.data.token,
      }; */

      if (userDataLogin) {
        const userData: UserToken = JSON.parse(userDataLogin);

        const userId = userData.id;
        const userToken = userData.token;
        setToken(userToken!);

        console.log("este es el token que tiene en el storages", token);
        try {
          const response = await axios.get(
            `https://liquors-project.onrender.com/users/${userId}`
          );
          var newUserData: any = response.data;

          if (newUserData.role !== userData.role) {
            try {
              const loginObjet = {
                email: newUserData.email,
                firebaseUid: newUserData.firebaseUid,
              };
              const response = await axios.post(
                "https://liquors-project.onrender.com/users/signin",
                loginObjet
              );
              const newData = response.data;
              newUserData.token = newData.token;
              localStorage.setItem(
                "userDataLogin",
                JSON.stringify(newUserData)
              );

              console.log("Token cambiado");
            } catch (error) {}
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
