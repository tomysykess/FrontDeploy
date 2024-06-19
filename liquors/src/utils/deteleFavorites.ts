import axios from "axios";
import { AppDispatch } from "@/store/store";
import { deleteFavoriteProduct } from "@/store/reducers/productsSlice";
import Swal from 'sweetalert2'

export const deleteFavorites = async (idUser: string | undefined, idProduct: string, dispatch: AppDispatch) => {
    try {
        const productIds = [idProduct]
        const response = await axios.delete(`https://liquors-project.onrender.com/users/${idUser}/favorites`,{ data: {productIds} } )
        dispatch(deleteFavoriteProduct(idProduct))
        if (window.location.href !== 'https://liquors-project.onrender.com/') {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Favorito eliminado con exito",
                showConfirmButton: false,
                timer: 1500
              });
        }
    } catch (error) {
        console.log("error de delete favs", error);
    }
}