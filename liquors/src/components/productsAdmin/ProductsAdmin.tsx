import {
  deleteProduct,
  readProductsFiltered,
} from "@/store/reducers/productsSlice";
import { RootState } from "@/store/store";
import { deleteProductAdmin, fetchProducts } from "@/utils/getProducts";
import { putDeleteProduct } from "@/utils/putDeleteProduct";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProductsAdmin = ({ products }: any) => {
  const dispatch = useDispatch();
  const [token, setToken]: any = useState();
  const dataGlobal = useSelector((state: RootState) => state.products.data);
  
  const [page, setPage] = useState(1);

  useEffect(() => {
    const userDataLogin = localStorage.getItem("userDataLogin");
    if (userDataLogin) {
      const userData = JSON.parse(userDataLogin);
      setToken(userData.token);
    }
  }, [dispatch]);

  useEffect(() => {
    if (dataGlobal.length === 0) {
        fetchProducts(dispatch);
    }
  }, [dispatch, dataGlobal.length]);

  const handleDelete = async (id: string) => {
    putDeleteProduct(id, token)
  }
  
  // useEffect(() => {
  //   // Simulación de filtro y despachar la acción readProductsFiltered
  //   const filteredProducts = products.filter(
  //     (product: any) => product.abv > 40
  //   ); // Ejemplo de filtro
  //   dispatch(readProductsFiltered(filteredProducts));
  // }, [dispatch, products]);

  // const handleDelete = async (id: string) => {
  //   if (confirm("¿Estás seguro de que quieres eliminar este producto?")) {
  //     try {
  //       await deleteProductAdmin(id, dispatch, token);
  //       dispatch(deleteProduct(id));
  //       alert("Producto eliminado con éxito.");
  //     } catch (error) {
  //       console.error("Error eliminando el producto:", error);
  //       alert("Hubo un error eliminando el producto.");
  //     }
  //   }
  // };

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
          {dataGlobal.map((product: any) => (
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
                {product.active ? (
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-200 text-red-950 px-3 py-1 rounded hover:bg-red-600 focus:outline-none"
                  >
                    Dar de baja
                  </button>
                ) : (<button
                  onClick={() => handleDelete(product.id)}
                  className="bg-green-200 text-green-950 px-3 py-1 rounded hover:bg-green-600 focus:outline-none"
                >
                  Activar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsAdmin;
