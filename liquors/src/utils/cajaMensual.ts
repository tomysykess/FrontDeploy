
import axios from "axios"
import { AppDispatch } from "@/store/store";
import { readUserBox, deleteUserBox, clearUserBox } from "@/store/reducers/usersSlice";
import { Product } from "@/interfaces/interfaz";


export const postCajaMensual = async (idProduct: string, userIdpost: string) => {
    try {
        const products = [idProduct]
        const response = await axios.post(`https://liquors-project.onrender.com/users/${userIdpost}/box`, {products})
        console.log("respuesta back a post caja", response);
    } catch (error) {
        console.log("error al postear caja mensual", error);
        
    }
}   

export const getCajaMensual = async (dispatch: AppDispatch, userIdget: string | undefined) => {
    try {
        console.log("user id get caja", userIdget);
        const response = await axios.get(`https://liquors-project.onrender.com/users/${userIdget}/box`)
        console.log("respuesta back a get caja", response);
        dispatch(clearUserBox())
        dispatch(readUserBox(response.data) )
    } catch (error) {
        console.log("error al getear caja mensual", error);
        
    }
}   

export const deleteCajaMensual = async (dispatch: AppDispatch, idProducto: string, userIdDelete: string) => {
    try {
        const productIds = [idProducto]
        const response = await axios.delete<Product[]>(`https://liquors-project.onrender.com/users/${userIdDelete}/box`,{data: {productIds}})
        console.log("respuesta back a post caja", response);
        dispatch(deleteUserBox(idProducto))
    } catch (error) {
        console.log("error al deletear caja mensual", error);
        
    }
}   


