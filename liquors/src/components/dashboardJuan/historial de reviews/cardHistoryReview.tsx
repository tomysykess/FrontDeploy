import React, { useState } from "react";
import { IReview } from "@/interfaces/interfaz";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteReviewConAlert } from "@/utils/deleteReviewsConAlert";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

export const CardHistoryReview: React.FC<{ product: IReview }> = ({
  product,
}): React.ReactNode => {
  const data = product.productId;
  const name = data.name;
  const dispatch = useDispatch();

  const [errorDelete, setErrorDelete] = useState();

  const handleDelete = async (id: string) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    try {
      const result = await swalWithBootstrapButtons.fire({
        title: "¿Estás seguro que deseas borrar la review?",
        text: "¡No puedes deshacer esta accion!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, borrar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        const deleteSuccessful = await deleteReviewConAlert(id, dispatch);

        if (deleteSuccessful) {
          swalWithBootstrapButtons.fire({
            title: "¡Eliminado!",
            text: "Tu archivo fue eliminado.",
            icon: "success",
          });
        } else {
          swalWithBootstrapButtons.fire({
            title: "Error",
            text: "Fallo al borrar.",
            icon: "error",
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          text: "Archivo seguro :)",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error handling delete:", error);
      swalWithBootstrapButtons.fire({
        title: "Error al eliminar la reseña",
        text: ` ${error}`,
        icon: "error",
      });
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 p-6 bg-white dark:bg-darkMode-grey3 rounded-xl shadow-md mx-4 my-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 dark:bg-darkMode-grey3">
            <span className="text-xl font-bold text-gray-800  dark:text-darkMode-white">
              {product.rate}
            </span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={
                    i < product.rate ? "text-yellow-400" : "text-gray-300"
                  }
                />
              ))}
            </div>
          </div>
          <button
            onClick={() => handleDelete(product.id)}
            className="text-red-600 cursor-pointer hover:text-red-800 transition-colors"
          >
            <DeleteIcon />
          </button>
        </div>
        <p className="text-gray-600 italic  dark:text-darkMode-white">
          &quot;{product.comment}&quot;
        </p>
        <h3 className="text-right text-sm font-medium text-gray-500  dark:text-darkMode-white">
          {name}
        </h3>
      </div>
    </>
  );
};

