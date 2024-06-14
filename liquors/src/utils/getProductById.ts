import { Product } from "@/interfaces/interfaz";
import axios from "axios";

export const getProductById = async (id: string, token: string) => {
    try {
        const res = await axios.get<Product>(
            `https://liquors-project.onrender.com/products/${id}`,
            {
                headers: {authorization: `bearer ${token}`}
          }
        );
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.error(err);
    }
}