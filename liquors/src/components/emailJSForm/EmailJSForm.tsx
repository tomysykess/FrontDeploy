"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const NewsletterForm = () => {
  const [userData, setUserData] = useState(null);
  const [rolData, setRolData] = useState(null);

  useEffect(() => {
    const userDataLogin: any = localStorage.getItem("userDataLogin");
    if (userDataLogin) {
      const parsedData = JSON.parse(userDataLogin);
      setUserData(parsedData.id);
      setRolData(parsedData.role);
    }
  }, []);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Userdataee: ", userData);
      const response = await axios.get<any>(
        `https://liquors-project.onrender.com/users/newsletter/${userData}`
      );
      console.log(response.data);

      Swal.fire({
        icon: "success",
        title: "¡Éxito!",
        text: "Usuario suscrito con éxito",
        confirmButtonText: "OK",
      });
    } catch (error: any) {
      console.log(error.message);

      alert("Error al suscribirse");
    }
  };

  return (
    <div className="flex justify-center items-center  bg-greyVivino p-10 dark:bg-darkMode-greyVivino">
      <form
        onSubmit={sendEmail}
        className="bg-white dark:bg-darkMode-grey1 p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl text-center rounded font-plus-jakarta-sans mb-4">
          ¡Ingresa a nuestro Boletín Informativo!
        </h2>

        <button
          disabled={rolData !== 4 && rolData !== "4"} // Deshabilita el botón si rolData no es igual a 4 (tanto número como string)
          type="submit"
          className={`w-full py-2 px-4 rounded transition duration-200 ${
            rolData === 4 || rolData === "4"
              ? "bg-wine text-white hover:bg-red-800"
              : "bg-wine text-white opacity-60 pointer-events-none"
          }`}
        >
          Obtener boletín
        </button>
      </form>
    </div>
  );
};

export default NewsletterForm;
