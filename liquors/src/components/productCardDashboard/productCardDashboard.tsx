import { Product } from "@/interfaces/interfaz";
import { Switch } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { putDeleteProduct } from "@/utils/putDeleteProduct";

export const ProductCardDashboard: React.FC<{ product: Product }> = ({
  product,
}): React.ReactNode => {
  const pathname = usePathname();
  const [dataUser, setDataUser] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
    token: "",
  });
  const [productData, setProductData] = useState({
    id: product.id,
    name: product.name,
    description: product.description,
    imgUrl: product.imgUrl,
    category: product.category,
    adv: product.abv,
    brand: product.brand,
    country: product.country,
    size: product.size,
    active: product.active,
    rate: product.rate,
  });

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const storeData = localStorage.getItem("userDataLogin");
      setDataUser(JSON.parse(storeData!));
    }
  }, [pathname]);

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    setProductData({
      ...productData,
      active: !productData.active,
    });
    putDeleteProduct(productData.id, dataUser.token);
  };

  return (
    <div
      key={product.id}
      className="bg-white dark:bg-darkMode-grey1 p-6 my-3 rounded-lg shadow-lg border-r-8 border-wine flex flex-row justify-between items-center h-32 px-16 m-4"
    >
      <div className="flex flex-row items-center gap-6">
        <Switch
          checked={productData.active}
          onChange={handleChange}
          defaultChecked
          color="default"
        />
        {productData.active ? (
          <p className="text-center w-24 text-green-950 rounded-full bg-green-200">
            {"Activo"}
          </p>
        ) : (
          <p className="text-center w-24 text-red-950 rounded-full bg-red-200">
            {"Inactivo"}
          </p>
        )}
      </div>
      <div className="flex flex-row items-center gap-8 w-full m-16">
        <div className="w-24 h-24">
          <img src={product.imgUrl} className="my-2 object-cover rounded-md" />
        </div>
        <h2 className="text-center text-xl font-Lora mb-2 text-gray-800 dark:text-darkMode-white">
          {product.name}
        </h2>
      </div>
      <Link
        className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600 transition duration-200 flex flex-row gap-4"
        href={`/editProduct/${product.id}`}
      >
        Editar <EditIcon />
      </Link>
    </div>
  );
};
