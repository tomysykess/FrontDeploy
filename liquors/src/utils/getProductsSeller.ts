export const fetchProductsSeller = async (userId: string) => {
    try {
        const response = await fetch(`https://liquors-project.onrender.com/products`);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}