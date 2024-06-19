import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsState } from "@/interfaces/interfaz";

const initialState: ProductsState = {
  data: [],
  ginProducts: [],
  wineProducts: [],
  dataFiltered: [],
  page: [],
  favorites: [],
  cajaMensual: []
};

/* este es el crud redux de products */
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    createProducts(state, action: PayloadAction<Product>) {
      state.data.push(action.payload);
    },
    readProducts(state, action: PayloadAction<Product[]>) {
      state.data = state.data.concat(action.payload);
    },
    clearProducts(state) {
      // Nuevo reducer para limpiar los productos
      state.data = [];
    },
    readGinProducts(state, action: PayloadAction<Product[]>) {
      state.ginProducts = state.ginProducts.concat(action.payload);
    },
    clearGinProducts(state) {
      state.ginProducts = [];
    },
    readProductsFiltered(state, action: PayloadAction<any>) {
      state.dataFiltered = state.dataFiltered.concat(action.payload);
    },
    clearProductsFiltered(state) {
      state.dataFiltered = [];
    },
    readWineProducts(state, action: PayloadAction<Product[]>) {
      state.wineProducts = state.wineProducts.concat(action.payload);
    },
    clearWineProducts(state) {
      state.wineProducts = [];
    },
    readFavoriteProducts(state, action: PayloadAction<Product[]>) {
      state.favorites = state.favorites.concat(action.payload);
    },
    clearFavoriteProducts(state) {
      state.favorites = [];
    },
    deleteFavoriteProduct(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter(
        (product) => product.id !== action.payload
      );
    },
    updateProducts(state, action) {},
    deleteProduct(state, action: PayloadAction<string>) {
      state.data = state.data.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const {
  createProducts,
  readProductsFiltered,
  clearProductsFiltered,
  readProducts,
  readWineProducts,
  clearWineProducts,
  updateProducts,
  clearGinProducts,
  readGinProducts,
  readFavoriteProducts,
  clearFavoriteProducts,
  deleteFavoriteProduct,
  deleteProduct,
  clearProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
