import React from "react";
import { IReview } from "@/interfaces/interfaz";
import { Rating } from '@mui/material';
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteReview } from "@/utils/deleteReviews";
import { useDispatch } from "react-redux";

export const CardHistoryReview: React.FC<{ product: IReview}> = ({product}): React.ReactNode => {

    const data = product.productId
    const name = data.name;
    const dispatch = useDispatch();

    const handleDelete = async (id: string) => {
        if (confirm("¿Estás seguro de que quieres eliminar esta review?")) {
          deleteReview(id, dispatch);
          alert("Review eliminada con éxito.");
          setTimeout(() => {
            window.location.reload()
          }, 100)
        }
      };
    
    return (
        <>
             <div className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-md mx-4 my-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-800">{product.rate}</span>
                    <div className="flex">
                        {[...Array(5)].map((_, i) => (
                        <StarIcon
                            key={i}
                            className={i < product.rate ? "text-yellow-400" : "text-gray-300"}
                        />
                        ))}
                    </div>
                    </div>
                    <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 cursor-pointer hover:text-red-800 transition-colors">
                        <DeleteIcon />
                    </button>
                </div>
                <p className="text-gray-600 italic">&quot;{product.comment}&quot;</p>
                <h3 className="text-right text-sm font-medium text-gray-500">{name}</h3>
            </div>
        </>
    )
}