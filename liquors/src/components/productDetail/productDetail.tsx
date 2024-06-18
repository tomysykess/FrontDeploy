import { Product } from "@/interfaces/interfaz";
import { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { postFavorites } from "@/utils/postFavorites";
import { deleteFavorites } from "@/utils/deteleFavorites";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";

interface ProductDetailProps {
  product: Product;
  promedio: number | null;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  promedio,
}) => {
  const {
    abv,
    brand,
    category,
    country,
    description,
    id,
    imgUrl,
    name,
    size,
    averageRate,
  } = product;

  const [favorite, setFavorite] = useState(false);
  const [favoritColor, setFavoritColor] = useState(false);
  const [userId, setIdUser] = useState<string>();
  const dispatch = useDispatch();
  useEffect(() => {
    const idUser: any = localStorage.getItem("userDataLogin");
    const idUserParsed = JSON.parse(idUser);
    if (idUser) {
      setIdUser(idUserParsed.id);
    }
  }, []);

  //HANDLER EVENT FAVORITOS
  const favHandler = (product: Product) => {
    const token = localStorage.getItem("loginToken");
    if (token) {
      setFavoritColor((prevFavoritColor) => !prevFavoritColor);
      const productId = product.id;
      if (favoritColor) {
        deleteFavorites(userId, productId, dispatch);
      } else {
        postFavorites(userId, productId);
      }
    } else {
      Swal.fire({
        icon: "info",
        title: "Denegado",
        text: "Debes ser un usario registrado para agregar favoritos.",
        confirmButtonText: "Aceptar",
      });
    }
  };

  return (
    <div
      key={id}
      className="flex flex-row gap-10 p-4 bg-white rounded shadow-md "
    >
      <div className="w-1/3 flex items-center justify-center">
        <img
          src={imgUrl}
          alt={name}
          className="imageProductDetail w-full h-auto rounded"
        />
      </div>
      <div className="w-2/3 space-y-3">
        <div className="flex flex-col gap-2">
          <h2 className="text-black text-2xl font-semibold">{name}</h2>
          <div className="flex flex-row items-center">
            <Rating
              name="product-rating"
              value={averageRate ?? 0}
              precision={0.5}
              readOnly
              icon={
                <StarIcon
                  fontSize="inherit"
                  className="animate-fadeInOpacity"
                />
              }
              emptyIcon={<StarIcon fontSize="inherit" />}
            />
            {/*  <span className="text-black ml-2">{promedio}</span> */}
          </div>
          <h3 className="text-black text-lg">{category}</h3>
          <p className="text-black">
            <b>Origen:</b> {country} | <b>Marca:</b> {brand}
          </p>
          <p className="text-black">
            <b>ABV:</b> {abv}% | <b>Tamaño:</b> {size}
          </p>
          <button
            onClick={() => favHandler(product)}
            className="flex items-center mt-4 text-red-600"
          >
            {favoritColor ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            <span className="ml-2">
              {favoritColor ? "Remover de Favoritos" : "Agregar a Favoritos"}
            </span>
          </button>
        </div>
        <p className="text-black">{description}</p>
      </div>
    </div>
  );
};

export default ProductDetail;
