"use client";
import { IReview } from "@/interfaces/interfaz";
import { AppDispatch } from "@/store/store";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { readReviews } from "@/store/reducers/reviewsSlice";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useRouter } from "next/navigation";

export const ReviewForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    comment: "",
    rate: 0,
  });
  const userDataLogin = localStorage.getItem("userDataLogin");

  const dispatch = useDispatch<AppDispatch>();

  const clearInput = () => {
    setFormData({ comment: "", rate: 0 });
  };

  const handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRatingChange = (
    event: React.ChangeEvent<{}>,
    value: number | null
  ) => {
    setFormData({ ...formData, rate: value ?? 0 });
  };

  const postReviews = async (formData: { comment: string; rate: number }) => {
    const detailProduct = localStorage.getItem("detailProduct");
    const detailUser = localStorage.getItem("userDataLogin");
    if (detailProduct && detailUser) {
      const idProduct = JSON.parse(detailProduct);
      const idUser = JSON.parse(detailUser);
      const idP = idProduct.id;
      const idU = idUser.id;
      try {
        const res = await axios.post<IReview[] | any>(
          `https://liquors-project.onrender.com/reviews/?userId=${idU}&productId=${idP}`,
          formData
        );
        dispatch(readReviews(res.data));
        clearInput();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handlerSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userDataLogin) {
      postReviews(formData);
    } else {
      alert("Debes ingresar para realizar una reseña!");
      router.push("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md  ">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        ¡Queremos conocer tu opinión sobre este producto!
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handlerSubmit}>
        <input
          type="text"
          value={formData.comment}
          name="comment"
          placeholder="Publica aquí tu Review"
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
          className="bg-wine text-white py-2 px-4 rounded-md  hover:bg-red-700 transition-colors"
        >
          Postear opinión
        </button>
      </form>
    </div>
  );
};
