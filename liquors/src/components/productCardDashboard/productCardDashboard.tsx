import { Product } from "@/interfaces/interfaz";
import CloseIcon from '@mui/icons-material/Close';

export const ProductCardDashboard: React.FC<{ product: Product }> = ({product}): React.ReactNode => {

    return (
        <div key={product.id} className="flex flex-row justify-between bg-white items-center h-32 w-full border-t-8 hover:cursor-pointer rounded-t-xl border-solid border-wine border-2 rounded-lg p-4 m-4">
            <div className="flex flex-row justify-start gap-8 items-center">
                <img src={product.imgUrl} alt="imagen bebida" className="my-2 h-24 object-cover rounded-md"/>
                <h2 className="text-center text-lg font-Lora mb-2">{product.name}</h2>
            </div>
            <CloseIcon />
        </div>
    )
}