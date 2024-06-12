"use client";
import React from "react";
//HOOKS
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
//INTERFACES
import { Login } from "@/interfaces/interfaz";
//UTILS
import loginUserFireBase from "@/utils/loginFireBase";
import loginUserFireBaseGoogle from "@/utils/loginFireBaseGoogle";
//FIREBASE
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const LoginComponent: React.FC = (): React.ReactNode => {
  //ESTADOS
  const [formData, setFormData] = useState<Login>({
    name: "",
    email: "",
    password: "",
  });

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const router = useRouter();

  //estados locales de login convencional
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorState, setError] = useState(null);

  //estados locales de login con google (aun sin uso)
  const [errorStateGoogle, setErrorGoogle] = useState(null);
  const [isSuccessGoogle, setIsSuccessGoogle] = useState(false);
  const [isLoadingGoogle, setIsLoadingGoogle] = useState(false);

  //EVENT HANDLER LLENADO DE INPUTS
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //EVENT HANDLER ENVIO FORMULARIO
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    loginUserFireBase(
      formData,
      auth,
      signInWithEmailAndPassword,
      setIsSuccess,
      setError,
      router,
      setIsLoading
    );
  };

  //EVENT HANDLER ENVIO DE FORMULARIO CON GOOGLE
  const handleGoogleSignIn = async () => {
    setIsLoadingGoogle(true);
    loginUserFireBaseGoogle(
      auth,
      provider,
      router,
      setErrorGoogle,
      setIsLoadingGoogle,
      setIsSuccessGoogle,
      signInWithPopup
    );
  };

  return (
    <div className="flex justify-center items-center  text-center pt-32 pb-32 bg-greyVivino">
      <div className="justify-start justmt-0 mr-32">
        <h1 className="pb-8 text-gray-600 text-6xl font-normal">Unite a </h1>
        <p className="text-wine pb-8 font-Lato text-6xl">Liquors</p>
      </div>

      <div className="rounded border bg-white border-wine">
        <form
          className="justify-end w-96  bg-white p-12"
          onSubmit={handleSubmit}
        >
          <div className="pb-2">
            <input
              className="w-full p-3 rounded border border-gray-400 outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine focus:ring-2 focus:ring-wine transition duration-200"
              type="text"
              value={formData.name}
              name="name"
              placeholder="Nombre"
              onChange={handleChange}
            />
          </div>
          <div className="pb-2">
            <input
              className="w-full p-3 rounded border border-gray-400 outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine focus:ring-2 focus:ring-wine transition duration-200"
              type="text"
              value={formData.email}
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>

          <div className="pb-2">
            <input
              className="w-full p-3 rounded border border-gray-400 outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine focus:ring-2 focus:ring-wine transition duration-200"
              type="password"
              value={formData.password}
              name="password"
              placeholder="*******"
              onChange={handleChange}
            />
          </div>

          <div className="inline-block pb-8 pt-5">
            ¿Aún no te registraste? <br />
            <br />
            <Link href="/register">
              <span className="text-wine hover:text-red-900 transition-colors duration-100">
                Registrarse
              </span>
            </Link>
            <br />
          </div>

          <div className="text-center">
            <button
              className={`inline-block cursor-pointer w-full max-w-xs p-4 rounded-lg ${
                !(formData.email.trim() && formData.password.trim())
                  ? "opacity-60 pointer-events-none"
                  : ""
              } bg-wine text-white text-lg mt-0 hover:brightness-110 transition duration-200`}
              type="submit"
              disabled={
                isLoading ||
                !(formData.email.trim() && formData.password.trim())
              }
            >
              {isLoading ? "Enviando..." : "Iniciar Sesión"}
            </button>
          </div>
          {isSuccess && (
            <p className="inline-block mt-2 rounded bg-green-500 text-white p-2">
              ¡Login exitoso! <br /> redirigiendo a home...
            </p>
          )}
          {errorState && (
            <p className="inline-block cursor-pointer w-1/5 rounded bg-red-500 text-white p-2 mt-2">
              {errorState}
            </p>
          )}
        </form>

        <div className="flex mt-0 bg-white mb-10 px-9 flex-row items-center">
          <hr className="w-1/2 border-gray-400"></hr>
          <p className="mx-4">o</p>
          <hr className="w-1/2 border-gray-400"></hr>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="rounded-3xl  mb-11 w-3/4 border-2 border-grey3 hover:border-blueGoogle font-plus-jakarta-sans"
        >
          <div className="flex flex-row p-2">
            <img
              className="justify-start"
              src="https://accounts.scdn.co/sso/images/new-google-icon.72fd940a229bc94cf9484a3320b3dccb.svg"
            ></img>
            {!errorStateGoogle ? (
              <p className="justify-center pl-5">
                {isLoadingGoogle ? "Enviando..." : "Continuar con Google"}
              </p>
            ) : (
              <p className="justify-center pl-5">{errorStateGoogle}</p>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default LoginComponent;
