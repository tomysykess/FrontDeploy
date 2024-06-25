"use client";
import { validateProductForm } from "@/utils/validateProduct";
import { useEffect, useState } from "react";
import { IProductForm, IProductFormErrorProps } from "./types";
import { usePathname, useRouter } from "next/navigation";
import { postProduct } from "@/utils/postProduct";
import { useSelector } from "react-redux";
import axios from "axios";
//storage
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
//material ui
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const categories = ["Ron", "Gin", "Whisky", "Vodka", "Vino"];

const countries = [
  "Argentina",
  "Brasil",
  "Canadá",
  "Francia",
  "Alemania",
  "Italia",
  "Japón",
  "México",
  "España",
  "Inglaterra",
  "Estados Unidos",
];

export const ProductForm = () => {
  const pathname = usePathname();
  const router = useRouter();

  {
    /*__________________STORAGE FIREBASE ESTADOS Y HANDLERS___________________*/
  }
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploeadProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState("");
  console.log("url de la imagen subida", downloadURL);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  //HANDLER BOTON UPLOAD
  const handleUpload = () => {
    if (!file) return;

    const fileRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(fileRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploeadProgress(progress);
      },
      (error) => {
        console.error("error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setDownloadURL(downloadURL);
          setDataProduct((prevDataProduct) => ({
            ...prevDataProduct,
            imgUrl: downloadURL,
          }));
        });
      }
    );
  };

  {
    /*STORAGE FIREBASE CONFIG */
  }
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

  {
    /*_______________________FIN STORAGE CONFIG_____________________________*/
  }

  const [dataUser, setDataUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    token: "",
  });

  const [dataProduct, setDataProduct] = useState<IProductForm>({
    name: "",
    description: "",
    country: "",
    brand: "",
    abv: "",
    imgUrl: "",
    size: "",
    category: "",
  });
  const [errorProduct, setErrorProduct] = useState<IProductFormErrorProps>({
    name: "",
    description: "",
    country: "",
    abv: "",
    imgUrl: "",
    size: "",
    category: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storeData = localStorage.getItem("userDataLogin");
      setDataUser(JSON.parse(storeData!));
    }
  }, [pathname]);

  useEffect(() => {
    const storedData = localStorage.getItem("dataProduct");
    if (storedData) {
      setDataProduct(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    setDataProduct((prevDataProduct) => {
      const updatedDataProduct = { ...prevDataProduct, [name]: value };
      return updatedDataProduct;
    });
  };

  useEffect(() => {
    localStorage.setItem("dataProduct", JSON.stringify(dataProduct));
  }, [dataProduct]);

  const handleCategoryChange = (event: any) => {
    const { value } = event.target;
    setDataProduct({
      ...dataProduct,
      category: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedDataProduct = {
      ...dataProduct,
      brand: String(dataUser.name),
      size: String(dataProduct.size + "ml"),
      abv: Number(dataProduct.abv),
    };

    const errorInput = validateProductForm(dataProduct);
    setErrorProduct(errorInput);

    if (Object.keys(errorInput).length === 0) {
      try {
        postProduct(dataUser.id, updatedDataProduct, dataUser.token);
        handleCancel();
      } catch (error) {
        console.error("error al agregar el producto", error);
      }
      alert(`El producto ${dataProduct.name} ha sido agregado con exito`);
      router.push("/profile/dashboardProducer/productosPublicados");
    } else {
      alert("Hubo un error al agregar el producto");
    }
  };

  const handleCancel = () => {
    setDataProduct({
      name: "",
      description: "",
      country: "",
      brand: "",
      abv: "",
      imgUrl: "",
      size: "",
      category: "",
    });
  };

  return (
    <div className="flex flex-col w-[119%] h-screen p-6 items-center justify-center bg-white dark:bg-darkMode-greyVivino">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-1/2 p-6 bg-greyVivino dark:bg-darkMode-grey1 rounded-lg shadow-xl"
      >
        <h1 className="pb-6 text-gray-800 dark:text-darkMode-white text-xl font-normal">
          Completa los siguientes campos para agregar tu producto:
        </h1>
        <div className="flex flex-col my-2">
          <label className="pb-2 text-gray-800 dark:text-darkMode-white text-lg font-normal">
            Nombre del producto:
          </label>
          <input
            type="text"
            name="name"
            value={dataProduct.name}
            onChange={handleChange}
            className="placeholder-gray-500 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wine focus:border-transparent"
            placeholder="Gin Bombay"
            required
          />
          {errorProduct.name && (
            <p className="text-red-500 text-sm">{errorProduct.name}</p>
          )}
        </div>
        <div className="flex flex-col my-2">
          <label className="pb-2 text-gray-800 dark:text-darkMode-white text-lg font-normal">
            Descripción:
          </label>
          <input
            type="text"
            name="description"
            value={dataProduct.description}
            onChange={handleChange}
            className="placeholder-gray-500 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wine focus:border-transparent"
            placeholder="El Gin Bombay es una variedad de ginebra reconocida por su sabor distintivo y suavidad. Producido por Bombay Sapphire, este gin se destaca por sus notas frescas y herbales."
            required
          />
          {errorProduct.description && (
            <p className="text-red-500 text-sm">{errorProduct.description}</p>
          )}
        </div>
        <div className="flex flex-col my-2">
          <label className="pb-2 text-gray-800 dark:text-darkMode-white text-lg font-normal">
            Subir Imagen:
          </label>
          <input type="file" onChange={handleFileChange} className="my-2" />
          <button
            type="button"
            onClick={handleUpload}
            className="flex items-center justify-center w-24 p-1 mt-3 rounded text-white font-plus-jakarta-sans hover:brightness-125 bg-blue-500"
          >
            Upload
            <CloudUploadIcon className="ml-2" />
          </button>
          {uploadProgress > 0 && (
            <progress
              value={uploadProgress}
              max="100"
              className="mt-2 w-full"
            />
          )}
          {downloadURL && (
            <p className="text-green-500 text-sm">
              Imagen subida correctamente.
            </p>
          )}
        </div>
        <div className="flex flex-col my-2">
          <label className="pb-2 text-gray-800 dark:text-darkMode-white text-lg font-normal">
            Categoría:
          </label>
          <div className="m-2 flex flex-row flex-wrap gap-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value={category}
                  checked={dataProduct.category === category}
                  onChange={handleCategoryChange}
                  className="mr-2"
                />
                <label className="text-gray-800 dark:text-darkMode-white text-lg font-normal">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            ))}
          </div>
          {errorProduct.category && (
            <p className="text-red-500 text-sm">{errorProduct.category}</p>
          )}
        </div>
        <div className="flex flex-col my-2">
          <label className="pb-2 text-gray-800 dark:text-darkMode-white text-lg font-normal">
            ml:
          </label>
          <input
            type="number"
            name="size"
            value={dataProduct.size}
            onChange={handleChange}
            className="placeholder-gray-500 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wine focus:border-transparent"
            placeholder="750"
            required
          />
          {errorProduct.size && (
            <p className="text-red-500 text-sm">{errorProduct.size}</p>
          )}
        </div>
        <div className="flex flex-col my-2">
          <label className="pb-2 text-gray-800 dark:text-darkMode-white text-lg font-normal">
            Graduación alcohólica (en números):
          </label>
          <input
            type="number"
            name="abv"
            value={dataProduct.abv}
            onChange={handleChange}
            className="placeholder-gray-500 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-wine focus:border-transparent"
            placeholder="37.5"
            required
          />
          {errorProduct.abv && (
            <p className="text-red-500 text-sm">{errorProduct.abv}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="country"
            className="pb-2 text-gray-800 dark:text-darkMode-white text-lg font-normal"
          >
            País:
          </label>
          <select
            className="p-2 rounded border border-gray-400 outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine focus:ring-2 focus:ring-wine transition duration-200"
            id="country"
            name="country"
            value={dataProduct.country}
            onChange={handleChange}
          >
            <option value="" className="text-gray-800 dark:text-darkMode-white">
              Selecciona un país
            </option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errorProduct.country && (
            <span className="text-red-500 text-sm">{errorProduct.country}</span>
          )}
        </div>
        <div className="flex flex-row gap-6 my-6 items-center justify-center">
          <button
            type="button"
            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-wine text-white p-2 rounded hover:bg-darkMode-wine transition duration-200"
          >
            Agregar
          </button>
        </div>
      </form>
    </div>
  );
};

/* prueba */
