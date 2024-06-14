import axios from "axios"

export const deleteProduct = async (productId: string, token: string) => {
    try {
        await axios.delete(`https://liquors-project.onrender.com/products/${productId}`, {
            headers: {
                authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        throw new Error("Error eliminando el producto");
    }
}