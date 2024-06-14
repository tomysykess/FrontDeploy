'use client'
import { fetchProductsSeller } from "@/utils/getProductsSeller";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCardDashboard } from "../productCardDashboard/productCardDashboard";
import { Product } from "@/interfaces/interfaz";

export const ProductsListSeller = () => {
    const pathname = usePathname();
    const [dataUser, setDataUser] = useState({
        id: "",
        name: "",
        email: "",
        role: "",
        token: ""
    })

    const [dataProducts, setDataProducts] = useState<Product[]>([])

    useEffect(() => {
        if( typeof window !== "undefined" && window.localStorage) {
        const storeData = localStorage.getItem("userDataLogin");
        setDataUser(JSON.parse(storeData!));
        }
    }, [pathname])

    useEffect(() => {
        if (dataUser.id && dataUser.token) {
        try {
            fetchProductsSeller(dataUser.id, dataUser.token).then((data) => {
                setDataProducts(data  ?? []);
            })
            } catch (error) {
                console.log(error)
            }
        }
    }, [dataUser.id, dataUser.token])

    return <div>
        {dataProducts.length === 0 ? (<p>No hay productos</p>) : 
        (dataProducts.map((product: Product) => (
                <ProductCardDashboard key={product.id} product={product} />
            )))
            }
    </div>;
}