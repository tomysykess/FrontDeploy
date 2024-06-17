import React from "react";

const ProductsAdmin = ({ products }: any) => {
  return (
    <div className="container mx-auto p-4">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Imagen</th>
            <th className="px-4 py-2">Nombre</th>
            <th className="px-4 py-2">Descripción</th>
            <th className="px-4 py-2">Categoría</th>
            <th className="px-4 py-2">ABV</th>
            <th className="px-4 py-2">Marca</th>
            <th className="px-4 py-2">País</th>
            <th className="px-4 py-2">Tamaño</th>
            <th className="px-4 py-2">Calificación Promedio</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product.id} className="bg-white border-b">
              <td className="px-4 py-2">
                <img
                  src={product.imgUrl}
                  alt={product.name}
                  className="h-16 w-16 object-cover"
                />
              </td>
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">{product.abv}%</td>
              <td className="px-4 py-2">{product.brand}</td>
              <td className="px-4 py-2">{product.country}</td>
              <td className="px-4 py-2">{product.size}</td>
              <td className="px-4 py-2">{product.averageRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsAdmin;
