"use client"
import MapProductCardFilterBack from "@/components/mapProductCard/mapProductFilteredBack";
import { useRouter } from "next/navigation";

const ProductFilteredBackEnd = () => {

    const router = useRouter()
    
    return (
       <>
            <div className="bg-greyVivino pb-20">
                <div className="flex flex-col  items-center">
                    <button onClick={() => router.push("/product")} className=" p-2 mb-2 pb-2  bg-white rounded-[25px] border border-gray-300 mt-2"> volver a buscar</button>
                </div>
                <div className="flex relative flex-row pt-10">
                    <div className="flex  mt-0 mb-96 bg-greyVivino ml-96">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <MapProductCardFilterBack/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductFilteredBackEnd;