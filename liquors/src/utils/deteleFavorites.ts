import axios from "axios";
import { AppDispatch } from "@/store/store";
import { deleteFavoriteProduct } from "@/store/reducers/productsSlice";

export const deleteFavorites = async (idUser: string | undefined, idProduct: string, dispatch: AppDispatch) => {
    try {
        const productIds = [idProduct]
        const response = await axios.delete(`https://liquors-project.onrender.com/users/${idUser}/favorites`,{ data: {productIds} } )
        dispatch(deleteFavoriteProduct(idProduct))
        console.log("respuesta back a delete favs", response);
        alert("producto borrado con exito!.")
        setTimeout(() => {
            window.location.reload()
        }, 1500) 
    } catch (error) {
        console.log("error de delete favs", error);
    }
}