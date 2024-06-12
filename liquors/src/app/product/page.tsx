"use client";
import ProductFilterCard from "@/components/filtroProducts/filtroProducts";
import MapProductCard from "@/components/mapProductCard/mapProductCard";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProductsFiltered } from "@/utils/getProductsFiltered";
import { fetchProducts } from "@/utils/getProducts";
import { useDispatch } from "react-redux";

const Product: React.FC = (): React.ReactNode => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState<any>({});


  //TOKEN
  const [token, setToken] = useState<string | null>(null)
  //ESTADO LOCAL SEARCHBAR
  const [search, setSearch] = useState({ item: "" });
  //ESTADO LOCAL ROL DE USUARIO
  const [hasRol, setHasRol] = useState<number>();
  //ESTADO LOCAL PARA LOGICA FILTRO SEGUN ROL DE USER.
  const [isFilterVisible, setIsFilterVisible] = useState<boolean>();
  //ESTADO PARA PAGINADO.
  const [page, setPage] = useState(1);
  const [productCards, setProductCards] = useState<any[]>([]);

  useEffect(() => {

    const userDataLogin = localStorage.getItem("userDataLogin");
    if (userDataLogin) {
      const userData = JSON.parse(userDataLogin!);
      console.log("este es el role", userData.role);
      setHasRol(userData.role);
    }
  }, []);


  const router = useRouter();

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const loadMoreProducts = () => {
    fetchProducts(dispatch, page + 1);
    setPage(page + 1);
  };

  const fetchFilterBack = () => {
    fetchProductsFiltered(dispatch, filters, router);
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSearch({ ...search, [name]: value });
  };

  const itemSubmit = () => {
    const item = JSON.stringify(search);
    localStorage.setItem("itemCategory", item);
    setTimeout(() => {
      router.push("/product/productFilteredBar");
    }, 300);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      itemSubmit();
    }
  };

  const toggleFilterVisibility = () => {
    if (hasRol === 4 || hasRol === 3) {
      setIsFilterVisible(!isFilterVisible);
    } else {
      alert("Debe suscribirse a una cuenta premium para acceder al filtro.");
    }
  };

  return (
    <div>
      <section className="flex justify-center bg-greyVivino">
        <input
          placeholder="buscar..."
          className="p-2 mb-2 pb-2  rounded-[25px] border border-gray-300 mt-2"
          type="text"
          value={search.item}
          name="item"
          onKeyDown={handleKeyDown}
          onChange={inputHandler}
        />
      </section>

      <div className="flex flex-row relative pl-5 mb-0 pt-0 bg-greyVivino">
        <section className="flex pt-10 pb-10 w-10/12 bg-greyVivino items-start absolute">
          <div className="flex flex-col">
            <button
              className="mb-7 py-1 absolute w-1/6 px-4  bg-wine text-white rounded-lg"
              onClick={toggleFilterVisibility}
            >
              {isFilterVisible ? "Ocultar Filtro" : "Mostrar Filtro"}
            </button>
            <div className="flex mt-5 w-full">
              {isFilterVisible && (
                <ProductFilterCard
                  fetchFilterBack={fetchFilterBack}
                  onFilterChange={handleFilterChange}
                />
              )}
            </div>
          </div>
        </section>

        <div className="flex  mt-0 mb-96 bg-greyVivino ml-96">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MapProductCard />
          </div>
        </div>
      </div>

      {productCards.length >= page * 9 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={loadMoreProducts}
            className="bg-wine text-white py-2 px-4 rounded-md"
          >
            Siguiente página
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
