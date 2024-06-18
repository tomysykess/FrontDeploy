"use client";
import { IReview } from "@/interfaces/interfaz";
import { AppDispatch } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  clearReviews,
  createReviews,
  readReviews,
} from "@/store/reducers/reviewsSlice";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useRouter } from "next/navigation";

export const ReviewForm = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState({
    comment: "",
    rate: 0,
  });

  useEffect(() => {
    const userDataLogin = localStorage.getItem("userDataLogin");
    if (userDataLogin) {
      const userDataParse = JSON.parse(userDataLogin);
      setToken(userDataParse.token);
      setUserData(userDataParse);
    }
  }, []);

  const clearInput = () => {
    setFormData({ comment: "", rate: 0 });
  };

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: number | null
  ) => {
    setFormData({ ...formData, rate: value ?? 0 });
  };

  const postReviews = async (formData: { comment: string; rate: number }) => {
    const detailProduct = localStorage.getItem("detailProduct");
    if (detailProduct && token) {
      const idProduct = JSON.parse(detailProduct);
      const idUser = userData;
      const idP = idProduct.id;
      const idU = idUser.id;

      try {
        const res = await axios.post<any>(
          `https://liquors-project.onrender.com/reviews/?userId=${idU}&productId=${idP}`,
          formData,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        dispatch(createReviews(res.data)); /* posible 2do error */
        clearInput();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userData) {
      postReviews(formData);
    } else {
      alert("Debes ingresar para realizar una reseña!");
      router.push("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        ¡Queremos conocer tu opinión sobre este producto!
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handlerSubmit}>
        <input
          type="text"
          value={formData.comment}
          name="comment"
          placeholder="Publica aquí tu reseña"
          onChange={handlerChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wine"
        />
        <Stack spacing={1}>
          <Rating
            name="rate"
            value={formData.rate}
            defaultValue={0}
            getLabelText={(value: number) =>
              `${value} Star${value !== 1 ? "s" : ""}`
            }
            precision={0.5}
            onChange={handleRatingChange}
            className="text-yellow-400"
          />
        </Stack>

        <button
          type="submit"
          className="bg-wine text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
        >
          Postear reseña
        </button>
      </form>
    </div>
  );
};
