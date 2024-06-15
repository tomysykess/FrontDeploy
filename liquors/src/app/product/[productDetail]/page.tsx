"use client";
import { ProductDetail } from "@/components/productDetail/productDetail";
import { ReviewContainer } from "@/components/reviewContainer/reviewContainer";
import { ReviewForm } from "@/components/reviewForm/reviewForm";
import { Product } from "@/interfaces/interfaz";
import { averageReviews } from "@/utils/getReviews";
import { useEffect, useState } from "react";

const ProductF = ({ params }: { params: { productId: string } }) => {
  const [detailProduct, setDetailProduct] = useState<Partial<Product>>({});
  const [pro, setPro]: any = useState();
  console.log("detalle producto", detailProduct);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const detailProductStorage = localStorage.getItem("detailProduct");
      if (detailProductStorage) {
        const parsedDetailProduct = JSON.parse(detailProductStorage) as Product;
        setDetailProduct(parsedDetailProduct);

        if (parsedDetailProduct.id) {
          const promedio = await averageReviews({
            idProduct: parsedDetailProduct.id,
          });
          setPro(promedio);
        }
      }
    };

    fetchProductDetails();
  }, []);

  return (
    <div className="bg-greyVivino">
      {" "}
      <div className="max-w-7xl mx-auto flex flex-col gap-10 p-6">
        <ProductDetail product={detailProduct as Product} promedio={pro} />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col w-full lg:w-2/3">
            <h1 className="text-black text-2xl font-bold mb-4">
              {`Conoce lo que nuestros usuarios piensan sobre ${detailProduct.name}`}
            </h1>
            <ReviewContainer />
          </div>
          <div className="w-full lg:w-1/3">
            <ReviewForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductF;
