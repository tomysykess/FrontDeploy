"use client";
import MapProductCardFilterBack from "@/components/mapProductCard/mapProductFilteredBack";
import { useRouter } from "next/navigation";

const ProductFilteredBackEnd = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-center w-full h-full bg-greyVivino dark:bg-darkMode-greyVivino ">
        <div className="flex pt-4 flex-col items-center w-full bg-greyVivino dark:bg-darkMode-greyVivino">
          <button
            onClick={() => router.push("/product")}
            className="flex p-2  mb-2 pb-2 items-center rounded-[25px] border border-gray-300 dark:bg-darkMode-grey2 dark:text-greyVivino mt-2 w-1/3 justify-center"
          >
            Volver a buscar
          </button>
          <div className="flex relative flex-col items-center pt-10 w-full">
            <div className="flex bg-greyVivino dark:bg-darkMode-greyVivino">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MapProductCardFilterBack />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFilteredBackEnd;
