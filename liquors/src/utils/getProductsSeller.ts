import { Product } from "@/interfaces/interfaz";
import axios from "axios";

export const fetchProductsSeller = async (userId: string, token: string) => {
    try {
        const response = await axios.get<Product[]>(
            `https://liquors-project.onrender.com/users/${userId}/products`,{
                headers: {
                    Authorization: `bearer ${token}`
                }
            });
            const data = response.data as Product[];
        return data;
    } catch (err) {
        console.error(err);
    }
} 