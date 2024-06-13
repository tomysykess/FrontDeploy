"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";

interface AuthProps {
  children: React.ReactNode;
}

const AuthStore: React.FC<AuthProps> = ({ children }) => {
  const [token, setToken] = useState();
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

          if (JSON.stringify(newUserData) !== JSON.stringify(userData)) {
            console.log("datos cambiados", newUserData);
            const newToken = newUserData.token;
            setToken(newToken);
            newUserData.token = token;
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
