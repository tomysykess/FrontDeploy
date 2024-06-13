"use client";
import axios from "axios";
import React, { useEffect } from "react";

interface AuthProps {
  children: React.ReactNode;
}

const AuthStore: React.FC<AuthProps> = ({ children }) => {
  useEffect(() => {
    const userDataLogin = localStorage.getItem("userDataLogin");

    if (userDataLogin) {
      const userData = JSON.parse(userDataLogin);
      const userId = userData.id;

      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `https://liquors-project.onrender.com/users/${userId}`
          );
          const newUserData = response.data;

          if (JSON.stringify(newUserData) !== JSON.stringify(userData)) {
            localStorage.setItem("userDataLogin", JSON.stringify(newUserData));
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  return <div>{children}</div>;
};

export default AuthStore;
