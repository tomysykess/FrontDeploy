import { Product } from "@/interfaces/interfaz";
import { Switch } from "@mui/material";
import { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { putDeleteProduct } from "@/utils/putDeleteProduct";

export const ProductCardDashboard: React.FC<{ product: Product }> = ({product}): React.ReactNode => {
    const pathname = usePathname();
    const [dataUser, setDataUser] = useState({
        id: "",
        name: "",
        email: "",
        role: "",
        token: ""
    })
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
        if( typeof window !== "undefined" && window.localStorage) {
        const storeData = localStorage.getItem("userDataLogin");
        setDataUser(JSON.parse(storeData!));
        }
    }, [pathname])

    const handleChange = (event: any) => {
        const {name, value} = event.target;

        setProductData({
            ...productData,
            active: !productData.active
            });
            putDeleteProduct(productData.id, dataUser.token)
    }

    return (
        <div key={product.id} className="flex flex-row justify-between bg-greyVivino items-center h-32 w-full hover:cursor-pointer rounded-t-xl rounded-lg p-4 m-4">
            <div className="flex flex-col items-center">
                <Switch checked={productData.active} onChange={handleChange} defaultChecked color="default" size="small"/>
                {productData.active ? 
                <p className="text-center w-24 text-green-950 rounded-full bg-green-200">{"Activo"}</p> 
                : 
                <p className="text-center w-24 text-red-950 rounded-full bg-red-200">{"Inactivo"}</p>
                }
            </div>
            <div className="flex flex-row justify-start gap-4 items-center">
                <div className="w-24 h-24">
                    <img src={product.imgUrl} className="my-2 object-cover rounded-md"/>
                </div>
                <h2 className="text-center text-lg font-Lora mb-2">{product.name}</h2>
            </div>
            <Link className="buttonSecondary" href={`/editProduct/${product.id}`}>Editar <EditIcon /></Link>
        </div>
    )
}