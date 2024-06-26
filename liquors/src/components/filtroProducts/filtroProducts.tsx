import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import StarIcon from "@mui/icons-material/Star";
import Swal from "sweetalert2";

interface ProductFilterCardProps {
  onFilterChange: (filters: any) => void;
  fetchFilterBack: () => void;
  hasRol: any;
}

const ProductFilterCard: React.FC<ProductFilterCardProps> = ({
  onFilterChange,
  fetchFilterBack,
  hasRol,
}) => {
  //filtro categoria
  const [categoryButton, setSelectedButton] = useState<string | null>(null);
  //Filtro Abv
  //const [abvRange, setPriceRange] = useState<number[]>([0, 100]);
  const [abvRange, setPriceRange] = useState<number>(0);
  //filtro rat
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const isFilterDisabled = hasRol === 1 || hasRol === undefined;


  const handleButtonClick = (buttonValue: string) => {
    setSelectedButton(buttonValue);
    onFilterChange({ categoryButton: buttonValue, abvRange, selectedRating });
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number);
    onFilterChange({ categoryButton, abvRange: newValue, selectedRating });
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    onFilterChange({ categoryButton, abvRange, selectedRating: rating });
  };

  const handleFetchFilterClick = () => {
    if (isFilterDisabled) {
      Swal.fire({
        icon: 'warning',
        title: 'Acceso denegado',
        text: 'Suscribete a la membresia premium para utilizar el filtro.',
      });
    } else {
      fetchFilterBack();
    }
  };


  return (
    <div className="flex flex-col  bg-greyVivino dark:bg-darkMode-grey1 border p-4 ml-0 mr-6 rounded-lg shadow-md w-3/4 h-">
      {/*FILTRO POR TIPO BEBIDA */}
      <h1 className="text-lg font-normal  font-plus-jakarta-sans mb-4  dark:text-darkMode-white">
        Filtros
      </h1>
      <div className="mb-4 flex p-1 flex-wrap justify-center gap-2">
        <button
          className={`px-4 py-2 font-plus-jakarta-sans bg-white dark:bg-darkMode-grey1  rounded-3xl border border-solid dark:border-white border-wine ${
            categoryButton === "Ron"
              ? "bg-wine text-white dark:bg-wine"
              : "bg-gray-200 text-wine dark:text-white "
          }`}
          onClick={() => handleButtonClick("Ron")}
        >
          Ron
        </button>
        <button
          className={`px-4 py-2 mx-2 font-plus-jakarta-sans bg-white dark:bg-darkMode-grey1  rounded-3xl border border-solid dark:border-white border-wine ${
            categoryButton === "Gin"
              ? "bg-wine text-white dark:bg-wine"
              : "bg-gray-200 text-wine dark:text-white"
          }`}
          onClick={() => handleButtonClick("Gin")}
        >
          Gin
        </button>
        <button
          className={`px-4 py-2  font-plus-jakarta-sans bg-white dark:bg-darkMode-grey1  rounded-3xl border border-solid dark:border-white border-wine ${
            categoryButton === "Whisky"
              ? "bg-wine text-white dark:bg-wine"
              : "bg-gray-200 text-wine dark:text-white"
          }`}
          onClick={() => handleButtonClick("Whisky")}
        >
          Whisky
        </button>
        <button
          className={`px-4 py-2  font-plus-jakarta-sans bg-white dark:bg-darkMode-grey1  rounded-3xl border border-solid dark:border-white border-wine ${
            categoryButton === "Vodka"
              ? "bg-wine text-white dark:bg-wine"
              : "bg-gray-200 text-wine dark:text-white"
          }`}
          onClick={() => handleButtonClick("Vodka")}
        >
          Vodka
        </button>
        <button
          className={`px-4 py-2  font-plus-jakarta-sans bg-white dark:bg-darkMode-grey1 rounded-3xl border border-solid dark:border-white border-wine ${
            categoryButton === "Vino"
              ? "bg-wine text-white dark:bg-wine"
              : "bg-gray-200 text-wine dark:text-white"
          }`}
          onClick={() => handleButtonClick("Vino")}
        >
          Vinos
        </button>
      </div>
      <hr></hr>

      {/*FILTRO POR RANGO PRECIO U OTRA VARIABLE. */}
      <h1 className="text-lg font-normal pt-3  font-plus-jakarta-sans mb-4  dark:text-darkMode-white">
        Rango de Abv
      </h1>
      <Slider
        value={abvRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={40}
        className="mb-4 "
        sx={{
          color: "#e9e9e9", // Color principal del slider
          "& .MuiSlider-thumb": {
            color: "#c23a2e", // Color del thumb (el botón que se arrastra)
          },
          "& .MuiSlider-track": {
            color: "#c23a2e", // Color de la pista (track)
          },
          "& .MuiSlider-rail": {
            color: "#8c8c8c", // Color del rail (parte de la pista no recorrida)
          },
        }}
      />
      <hr></hr>
      {/*FILTRO POR VALORACION DEL VINO. */}
      <h1 className="text-lg font-normal pt-3  font-plus-jakarta-sans mb-4  dark:text-darkMode-white">
        Puntuaciones
      </h1>
      <div className="flex flex-col space-y-2">
        {[3, 4, 5].map((rating) => (
          <div key={rating} className="flex items-center">
            <Checkbox
              checked={selectedRating === rating}
              onChange={() => handleRatingChange(rating)}
              color="primary"
              className=" dark:text-darkMode-white"
            />
            <div className="flex">
              {Array.from({ length: rating }, (_, index) => (
                <StarIcon key={index} className="text-wine  " />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={handleFetchFilterClick }
        className="px-1 py-2  font-plus-jakarta-sans  hover:brightness-110 bg-greenVivino mt-6 rounded-3xl border border-solid text-white"
      >
        Buscar
      </button>
    </div>
  );
};

export default ProductFilterCard;
