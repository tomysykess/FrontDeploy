import axios from "axios";
import { AppDispatch } from "@/store/store";
import { readFavoriteProducts, clearFavoriteProducts } from "@/store/reducers/productsSlice";

export const getFavorites = async (idUser: string | undefined, dispatch:  AppDispatch) => {
    try {
        console.log("data para que mando a back para getFavorites", idUser);
        const response = await axios.get(`https://liquors-project.onrender.com/users/${idUser}/favorites`)
        dispatch(clearFavoriteProducts());
        dispatch(readFavoriteProducts(response.data))
        console.log("respuesta back a get favs", response);
    } catch (error) {
        console.log("error de get favs", error);
    }
}