// components/AccountInfoCard.js
import React, { useEffect, useState, useRef } from "react";
//storage
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
//icono material UI
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Divider } from "@mui/material";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const AccountInfoCard = () => {
  // Estados de Firebase Storage
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");

  // Estado del usuario
  const [dataUser, setDataUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    imageUrl: "",
  });

  useEffect(() => {
    const userDataFromStorage: any = localStorage.getItem("userDataLogin");
    const dataParsed = JSON.parse(userDataFromStorage);
    if (dataParsed) {
      setDataUser(dataParsed);
    }
  }, []);

  useEffect(() => {
    if (downloadURL) {
      setDataUser((prevData) => ({ ...prevData, imageUrl: downloadURL }));
    }
  }, [downloadURL]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) return;

    const fileRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL);
          // Guardar la URL en el localStorage
          const updatedUserData = { ...dataUser, imageUrl: downloadURL };
          localStorage.setItem(
            "userDataLogin",
            JSON.stringify(updatedUserData)
          );
        });
      }
    );
  };

  const getUserRole = (role: any) => {
    if (role === 1) return "Básico";
    if (role === 3) return "Productor";
    if (role === 2) return "Admin";
    if (role === 4) return "Premium";
    return "desconocido";
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <div className="flex flex-col font-plus-jakarta-sans items-center justify-center mt-10 pt-20  pb-96 h-screen">
        <div className="relative bg-white dark:bg-darkMode-grey1 mt-20 p-6 rounded-lg shadow-lg w-96 border-r-8 border-wine">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2">
            <img
              className="w-32 h-32 rounded-full border-4 border-wine shadow-md"
              src={dataUser.imageUrl || ""}
              alt="User Avatar"
            />
            <div
              className="absolute bottom-0 right-0 bg-gray-200  p-1 rounded-full cursor-pointer"
              onClick={handleIconClick}
            >
              <AddPhotoAlternateIcon />
            </div>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
          </div>
          <div className="mt-16 text-center ">
            <h2 className="text-xl font-semibold">{dataUser.name}</h2>
          </div>
          {uploadProgress < 100 && file && (
            <>
              <button
                onClick={handleUpload}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
              >
                Subir Imagen
              </button>
              {uploadProgress > 0 && <p>Progreso: {uploadProgress}%</p>}
            </>
          )}
        </div>

        {/* TARJETA CON MAS INFO (EMAIL) */}
        <div className="bg-white p-6 my-3 rounded-lg shadow-lg w-96 border-r-8 border-wine dark:bg-darkMode-grey1">
          <h2 className="text-lg font-bold">Email</h2>
          <p className="mt-2 text-greyTextMl font-normal dark:text-gray-300">
            {dataUser.email}
          </p>
        </div>

        {/* TARJETA CON MAS INFO (ROL) */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-96 border-r-8 border-wine dark:bg-darkMode-grey1">
          <h2 className="text-lg font-bold">Tipo de cuenta</h2>
          <p className="mt-2 text-greyTextMl font-normal dark:text-gray-300">
            {getUserRole(dataUser.role)}
          </p>
        </div>
      </div>
    </>
  );
};
