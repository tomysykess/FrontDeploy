import {
  deleteProduct,
  readProductsFiltered,
} from "@/store/reducers/productsSlice";
import { deleteProductAdmin } from "@/utils/getProducts";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const ProductsAdmin = ({ products }: any) => {
  const [token, setToken]: any = useState();

  /*   useEffect(() => {
    const userDataLogin = localStorage.getItem("userDataLogin");
    if (userDataLogin) {
      const userData = JSON.parse(userDataLogin);
      setToken(userData.token);
    }
  }, [dispatch]); */
  /*   useEffect(() => {
    // Simulación de filtro y despachar la acción readProductsFiltered
    const filteredProducts = products.filter(
      (product: any) => product.abv > 40
    ); // Ejemplo de filtro
    dispatch(readProductsFiltered(filteredProducts));
  }, [dispatch, products]);
 */
  /*   const handleDelete = async (id: string) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
      try {
        await deleteProductAdmin(id, dispatch, token);
        dispatch(deleteProduct(id));
        alert("Producto eliminado con éxito.");
      } catch (error) {
        console.error("Error eliminando el producto:", error);
        alert("Hubo un error eliminando el producto.");
      }
    }
  }; */

  return (
    <div className="flex h-auto font-plus-jakarta-sans p-6">
      <table className="table-auto w-full border-collapse bg-white shadow-lg">
        <thead>
          <tr className="bg-wine text-white">
            <th className="border px-4 py-5">Imagen</th>
            <th className="border px-4 py-2">Nombre</th>
            <th className="border px-4 py-2">Descripción</th>
            <th className="border px-4 py-2">Categoría</th>
            <th className="border px-4 py-2">ABV</th>
            <th className="border px-4 py-2">Marca</th>
            <th className="border px-4 py-2">País</th>
            <th className="border px-4 py-2">Tamaño</th>
            <th className="border px-4 py-2">Calificación Promedio</th>
            <th className="border px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product.id} className="hover:bg-gray-50 border-b">
              <td className="border px-4 py-2">
                <img
                  src={product.imgUrl}
                  alt={product.name}
                  className="h-16 w-16 object-cover rounded"
                />
              </td>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.description}</td>
              <td className="border px-4 py-2">{product.category}</td>
              <td className="border px-4 py-2">{product.abv}%</td>
              <td className="border px-4 py-2">{product.brand}</td>
              <td className="border px-4 py-2">{product.country}</td>
              <td className="border px-4 py-2">{product.size}</td>
              <td className="border px-4 py-2">{product.averageRate}</td>
              <td className="border px-4 py-2 text-center">
                <button
                  /*   onClick={() => handleDelete(product.id)} */
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700 focus:outline-none"
                >
                  Dar de baja
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsAdmin;
