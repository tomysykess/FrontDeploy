import axios from "axios";

export const postFavorites = async (idUser: string | undefined, idProduct: string) => {
    try {
        const products = [idProduct]
        const response = await axios.post(`https://liquors-project.onrender.com/users/${idUser}/favorites`, {products} )
        console.log("respuesta back a post favs", response);
    } catch (error: any) {
        console.log("error de post favs", error.response.data);
    }
}