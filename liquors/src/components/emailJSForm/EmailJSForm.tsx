"use client";
import React, { useRef, useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { useRouter } from "next/navigation";

const EmailJSForm = () => {
  const [userData, setUserData] = useState({ name: "", email: "" });
  const router = useRouter();

  useEffect(() => {
    const userDataLogin = localStorage.getItem("userDataLogin");
    if (userDataLogin) {
      setUserData(JSON.parse(userDataLogin));
    }
  }, []);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      user_name: userData.name,
      user_email: userData.email,
    };

    emailjs
      .send("newsletter_demo", "Liquors_template_demo", templateParams, {
        publicKey: "T0pHUl2Iw9_K8edIU",
      })
      .then(
        (res) => {
          console.log("SUCCESS!", res.text);
          alert("Correo enviado con éxito");
          setUserData({ name: "", email: "" });
        },
        (error) => {
          console.log("FAILED...", error.text);
          alert("Debes ingresar para obtener la Newsletter");
          router.push("/login");
        }
      );
  };

  return (
    <div className="flex justify-center items-center  bg-greyVivino p-10">
      <form
        onSubmit={sendEmail}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl text-center rounded font-plus-jakarta-sans mb-4">
          Obtener nuestra Muestra de Newsletter!
        </h2>

        <button
          type="submit"
          className="w-full bg-wine text-white py-2 px-4 rounded hover:bg-red-800 transition duration-200"
        >
          Recibir Mail de Newsletter
        </button>
      </form>
    </div>
  );
};

export default EmailJSForm;
