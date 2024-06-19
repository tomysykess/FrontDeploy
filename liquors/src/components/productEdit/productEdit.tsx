"use client";
import { validateProductForm } from "@/utils/validateProduct";
import { useEffect, useState } from "react";
import { IProductForm, IProductFormErrorProps } from "../productForm/types";
import { usePathname } from "next/navigation";
//storage
import { uploadBytesResumable, getDownloadURL, ref } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
//material ui
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { getProductById } from "@/utils/getProductById";
import { putProduct } from "@/utils/putProduct";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const categories = ["Ron", "Gin", "Whisky", "Vodka", "Vino"];

const countries = [
  "Argentina",
  "Brazil",
  "Canada",
  "France",
  "Germany",
  "Italy",
  "Japan",
  "Mexico",
  "Spain",
  "United Kingdom",
  "United States",
];

export const ProductEdit = ({ productId }: { productId: string }) => {
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
    const fetchProduct = async () => {
      try {
        const response = await getProductById(productId, dataUser.token);
        if (response) {
          setDataProduct(response);
          console.log(dataProduct)
        } else {
          console.error("Product not found");
        }
      } catch (error) {
        console.error("error fetch product", error);
      }
    };
    fetchProduct();
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
      category: String(dataProduct.category),
      country: String(dataProduct.country),
      description: String(dataProduct.description),
      imgUrl: String(dataProduct.imgUrl),
      name: String(dataProduct.name),
      brand: String(dataUser.name),
      size: String(dataProduct.size + "ml"),
      abv: Number(dataProduct.abv),
    };

    const errorInput = validateProductForm(dataProduct);
    setErrorProduct(errorInput);
    if (Object.keys(errorInput).length === 0) {
      try {
        putProduct(productId, updatedDataProduct, dataUser.token);
        router.push("/profile/dashboardProducer/productosPublicados");
      } catch (error) {
        console.error("Error updating product:", error);
        return;
      }
    } else {
      Swal.fire({
        title: "Oops...",
        text: "Hubo un error al agregar el producto",
        icon: "error"
      });
    }
  };

  const handleCancel = () => {
    router.push("/profile/dashboardProducer/productosPublicados");
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-fit p-6 bg-greyVivino"
      >
        <h1 className="pb-6 text-gray-600 text-xl font-normal">
          Edita los campos que desees:
        </h1>
        <div className="flex flex-col my-2">
          <label className="pb-2 text-gray-600 text-l font-normal">
            Nombre del producto:{" "}
          </label>
          <input
            type="text"
            name="name"
            value={dataProduct.name}
            onChange={handleChange}
            className="placeholder input-text"
            placeholder="Gin Bombay"
            required
          />
          {errorProduct.name && <p>{errorProduct.name}</p>}
        </div>
        <div className="flex flex-col my-2">
          <label className="pb-2 text-gray-600 text-l font-normal">
            Descripción:{" "}
          </label>
          <input
            type="text"
            name="description"
            value={dataProduct.description}
            onChange={handleChange}
            className="placeholder input-text"
            placeholder="El Gin Bombay es una variedad de ginebra reconocida por su sabor distintivo y suavidad. Producido por Bombay Sapphire, este gin se destaca por sus notas frescas y herbales,"
            required
          />
          {errorProduct.description && <p>{errorProduct.description}</p>}
        </div>

        <div className="flex flex-col my-2">
          <label className="pb-2 text-gray-600 text-l font-normal">
            Subir Imagen:{" "}
          </label>
          <input type="file" onChange={handleFileChange} />
          <button
            type="button"
            onClick={handleUpload}
            className="flex w-24 p-1 mt-3 rounded text-white font-plus-jakarta-sans hover:brightness-125 bg-blue-500"
          >
            Upload
            <CloudUploadIcon className="ml-2" />
          </button>
          {uploadProgress > 0 && (
            <progress value={uploadProgress} max="100" className="mt-2" />
          )}
          {downloadURL && <p>Imagen subida correctamente. </p>}
        </div>
        <div className="flex flex-row items-center gap-2my-2">
          <label className="pb-2 text-gray-600 text-l font-normal">
            Categoría:
          </label>
          <div className="m-2 flex flex-row gap-2">
            {categories.map((category) => (
              <div key={category}>
                <label className="flex flex-row gap-2 text-gray-600 text-l font-normal">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={dataProduct.category === category}
                    onChange={handleCategoryChange}
                  />
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </label>
              </div>
            ))}
          </div>
          {errorProduct.category && <p>{errorProduct.category}</p>}
        </div>
        <div className="flex flex-row item-center gap-2 my-2">
          <label className="pb-2 text-gray-600 text-l font-normal">ml: </label>
          <input
            type="number"
            name="size"
            value={dataProduct.size}
            onChange={handleChange}
            className="placeholder input-text"
            placeholder="750"
            required
          />
          {errorProduct.size && <p>{errorProduct.size}</p>}
        </div>
        <div className="flex flex-row item-center gap-2 my-2">
          <label className="pb-2 text-gray-600 text-l font-normal">
            Graduacion alcoholica (en numeros):{" "}
          </label>
          <input
            type="number"
            name="abv"
            value={dataProduct.abv}
            onChange={handleChange}
            className="placeholder input-text"
            placeholder="37.5"
            required
          />
          {errorProduct.abv && <p>{errorProduct.abv}</p>}
        </div>
        <div>
          <label
            htmlFor="country"
            className="pb-2 text-gray-600 text-l font-normal"
          >
            Country{" "}
          </label>
          <select
            className="rounded border border-gray-400 outline-none hover:border-wine hover:ring-1 hover:ring-wine focus:border-wine focus:ring-2 focus:ring-wine transition duration-200"
            id="country"
            name="country"
            value={dataProduct.country}
            onChange={handleChange}
          >
            <option value="">Selecciona un país</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errorProduct.country && <span>{errorProduct.country}</span>}
        </div>
        <div className="flex flex-row gap-6 my-6 items-center justify-center">
          <button
            type="button"
            className="buttonSecondary hover:cursor-pointer"
            onClick={handleCancel}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="buttonPrimary hover:cursor-pointer w-fit"
          >
            aplicar los cambios
          </button>
        </div>
      </form>
    </div>
  );
};
