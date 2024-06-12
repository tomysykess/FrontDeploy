'use client'
import { fetchProductsSeller } from "@/utils/getProductsSeller";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ProductCardDashboard } from "../productCardDashboard/productCardDashboard";
import { Product } from "@/interfaces/interfaz";

export const ProductsListSeller = () => {
    const pathname = usePathname();
    const [dataUser, setDataUser] = useState({
        id: "",
        name: "",
        email: "",
        role: ""
    })

    const [token, setToken] = useState({
        token: ""
    })

    const [dataProducts, setDataProducts] = useState([])

    useEffect(() => {
        if( typeof window !== "undefined" && window.localStorage) {
        const storeData = localStorage.getItem("userDataLogin");
        const storeToken = localStorage.getItem("loginToken");
        setToken(JSON.parse(storeToken!));
        setDataUser(JSON.parse(storeData!));
        }
    }, [pathname])

    useEffect(() => {
        try {
            fetchProductsSeller(dataUser.id).then((data) => {
                setDataProducts(data);
            })
            } catch (error) {
                console.log(error)
            }
    }, [dataUser.id])
    return <div>
        {dataProducts.map((product: Product) => (
            <ProductCardDashboard key={product.id} product={product} />
        ))}
    </div>;
}