import axios from "axios"

export const putDeleteProduct = async (productId: string, token: string) => {
    console.log("delete", productId, token)
    try {
        await axios.put(`https://liquors-project.onrender.com/products/delete/${productId}`,
            {}, 
            {
                headers: {authorization: `Bearer ${token}`}
            }
        );
        } catch (error: any) {
        console.log(error.response.data)
        throw new Error("Error eliminando el producto");
    }
}