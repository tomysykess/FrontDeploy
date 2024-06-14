import { ProductEdit } from "@/components/productEdit/productEdit";

const EditProductData = ({ params }: { params: { productData: string } }) => {
  const { productData } = params
  const pId = String(productData)
    return (
        <div>
            <ProductEdit productId={pId} />
        </div>)
}

export default EditProductData;