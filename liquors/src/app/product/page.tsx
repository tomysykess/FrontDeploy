"use client";
import ProductFilterCard from "@/components/filtroProducts/filtroProducts";
import MapProductCardRouteProducts from "@/components/mapProductCard/mapProductCardProductsRoute";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchProductsFiltered } from "@/utils/getProductsFiltered";
import { fetchProductsPage } from "@/utils/getProducts";
import { useDispatch } from "react-redux";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Product: React.FC = (): React.ReactNode => {
  const dispatch = useDispatch();

  const [filters, setFilters] = useState<any>({});

  //TOKEN
  const [token, setToken] = useState<string | null>(null);
  //ESTADO LOCAL SEARCHBAR
  const [search, setSearch] = useState({ item: "" });
  //ESTADO LOCAL ROL DE USUARIO
  const [hasRol, setHasRol] = useState<number>();
  //ESTADO LOCAL PARA LOGICA FILTRO SEGUN ROL DE USER.
  const [isFilterVisible, setIsFilterVisible] = useState<any>();
  //ESTADO PARA PAGINADO.
  const [page, setPage] = useState(1);
  const [productCards, setProductCards] = useState<any[]>([]);

  useEffect(() => {
    const userToken = localStorage.getItem("loginToken");
    if (userToken) {
      const parsedToken = JSON.parse(userToken);
      setToken(parsedToken);

      const userDataLogin = localStorage.getItem("userDataLogin");
      if (userDataLogin) {
        const userData = JSON.parse(userDataLogin);
        setHasRol(userData.role);
      }
    }
  }, []);

  const router = useRouter();

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const loadMoreProducts = () => {
    fetchProductsPage(dispatch, page + 1);
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
    if (hasRol === 1 || hasRol === undefined) {
      alert("Debe suscribirse a una cuenta premium para acceder al filtro.");
    }
  };

  return (
    <div>
      <section className="flex justify-center pt-4 pb-3 bg-greyVivino">
        <input
          placeholder="buscar..."
          className="p-2 mb-2 pb-2  rounded-[25px] border border-gray-300 mt-2 w-1/3"
          type="text"
          value={search.item}
          name="item"
          onKeyDown={handleKeyDown}
          onChange={inputHandler}
        />
      </section>

      <div className="flex   mb-0 pt-0 justify-center bg-greyVivino">
        <section className="flex pt-10 pb-10  w-10/12 bg-greyVivino items-start absolute  justify-start-">
          <div className="flex ">
            <div className="flex w-full h-full">
              {hasRol === 1 || hasRol === undefined ? (
                <div className="opacity-50 " onClick={toggleFilterVisibility}>
                  <ProductFilterCard
                    fetchFilterBack={fetchFilterBack}
                    onFilterChange={handleFilterChange}
                  />
                </div>
              ) : (
                <ProductFilterCard
                  fetchFilterBack={fetchFilterBack}
                  onFilterChange={handleFilterChange}
                />
              )}
            </div>
          </div>
        </section>

        <div className="flex  bg-greyVivino ml-96 w-1/2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <MapProductCardRouteProducts />
          </div>
        </div>

        <div className="flex text-center font-plus-jakarta-sans text-lg justify-center mt-auto mb-4">
          <button
            onClick={loadMoreProducts}
            className=" text-wine hover:brightness-125 underline py-2 px-4 rounded-md"
          >
            Más productos
            <ExpandMoreIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
