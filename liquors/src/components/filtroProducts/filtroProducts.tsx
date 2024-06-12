import React, { useState } from "react";
import Slider from "@mui/material/Slider";
import Checkbox from "@mui/material/Checkbox";
import StarIcon from "@mui/icons-material/Star";

interface ProductFilterCardProps {
  onFilterChange: (filters: any) => void;
  fetchFilterBack: () => void
}

const ProductFilterCard: React.FC<ProductFilterCardProps> = ({
  onFilterChange, fetchFilterBack
}) => {

  //filtro categoria
  const [ categoryButton, setSelectedButton] = useState<string | null>(null);
  //Filtro Abv
  //const [abvRange, setPriceRange] = useState<number[]>([0, 100]);
  const [abvRange, setPriceRange] = useState<number>(0);

  //filtro rate
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const handleButtonClick = (buttonValue: string) => {
    setSelectedButton(buttonValue);
    onFilterChange({  categoryButton: buttonValue, abvRange, selectedRating });
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    setPriceRange(newValue as number);
    onFilterChange({  categoryButton, abvRange: newValue, selectedRating });
  };

  const handleRatingChange = (rating: number) => {
    setSelectedRating(rating);
    onFilterChange({  categoryButton, abvRange, selectedRating: rating });
  };

  return (
    <div className="flex flex-col mt-5 bg-greyVivino border p-4 ml-0 mr-6 rounded-lg shadow-md w-3/4">
      {/*FILTRO POR TIPO BEBIDA */}
      <h1 className="text-lg font-normal  font-plus-jakarta-sans mb-4">Filters</h1>
      <div className="mb-4 flex p-1 flex-wrap justify-center">
        <button
          className={`px-4 py-2 font-plus-jakarta-sans bg-white rounded-3xl border border-solid border-wine ${
            categoryButton === "Whisky"
              ? "bg-wine text-white"
              : "bg-gray-200 text-wine"
          }`}
          onClick={() => handleButtonClick("Whisky")}
        >
          Whisky
        </button>
        <button
          className={`px-4 py-2 mx-2 font-plus-jakarta-sans bg-white rounded-3xl border border-solid border-wine ${
            categoryButton === "Gin"
              ? "bg-wine text-white"
              : "bg-gray-200 text-wine"
          }`}
          onClick={() => handleButtonClick("Gin")}
        >
          Gin
        </button>
        <button
          className={`px-4 py-2  font-plus-jakarta-sans bg-white rounded-3xl border border-solid border-wine ${
            categoryButton === "Vodka"
              ? "bg-wine text-white"
              : "bg-gray-200 text-wine"
          }`}
          onClick={() => handleButtonClick("Vodka")}
        >
          Vodka
        </button>
        <button
          className={`px-4 py-2  font-plus-jakarta-sans bg-white rounded-3xl border border-solid border-wine ${
            categoryButton === "Tequila"
              ? "bg-wine text-white"
              : "bg-gray-200 text-wine"
          }`}
          onClick={() => handleButtonClick("Tequila")}
        >
          Tequila
        </button>
        <button
          className={`px-4 py-2  font-plus-jakarta-sans bg-white rounded-3xl border border-solid border-wine ${
            categoryButton === "Ron"
              ? "bg-wine text-white"
              : "bg-gray-200 text-wine"
          }`}
          onClick={() => handleButtonClick("Ron")}
        >
          Ron
        </button>
      </div>
      <hr></hr>

      {/*FILTRO POR RANGO PRECIO U OTRA VARIABLE. */}
      <h1 className="text-lg font-normal pt-3  font-plus-jakarta-sans mb-4">Abv Range</h1>
      <Slider
        value={abvRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={40}
        className="mb-4 "
        sx={{
          color: '#e9e9e9',  // Color principal del slider
          '& .MuiSlider-thumb': {
            color: '#c23a2e',  // Color del thumb (el botón que se arrastra)
          },
          '& .MuiSlider-track': {
            color: '#c23a2e',  // Color de la pista (track)
          },
          '& .MuiSlider-rail': {
            color: '#8c8c8c',  // Color del rail (parte de la pista no recorrida)
          },
        }}
      />
      <hr></hr>
      {/*FILTRO POR VALORACION DEL VINO. */}
      <h1 className="text-lg font-normal pt-3  font-plus-jakarta-sans mb-4">Wine ratings</h1>
      <div className="flex flex-col space-y-2">
        {[3, 4, 5].map((rating) => (
          <div key={rating} className="flex items-center">
            <Checkbox
              checked={selectedRating === rating}
              onChange={() => handleRatingChange(rating)}
              color="primary"
            />
            <div className="flex">
              {Array.from({ length: rating }, (_, index) => (
                <StarIcon key={index} className="text-wine" />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={fetchFilterBack} className="px-1 py-2  font-plus-jakarta-sans  hover:brightness-110 bg-greenVivino mt-6 rounded-3xl border border-solid text-white">buscar</button>
    </div>
  );
};

export default ProductFilterCard;
