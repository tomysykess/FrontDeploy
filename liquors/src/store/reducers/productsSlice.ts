import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product, ProductsState } from "@/interfaces/interfaz";

const initialState: ProductsState = {
  data: [],
  ginProducts: [],
  wineProducts: [],
  dataFiltered: [],
  page: [],
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
    clearProducts(state) { // Nuevo reducer para limpiar los productos
      state.data = [];
    },
    readGinProducts(state, action: PayloadAction<Product[]>) {
      state.ginProducts = state.ginProducts.concat(action.payload);
    },
    clearGinProducts(state) {
      state.ginProducts = [];
    },
    //REVISAR ESTADO GLOBAL PRODUCT FILTERED
    readProductsFiltered(state, action: PayloadAction<Product[]>) {
      state.dataFiltered = state.dataFiltered.concat(action.payload);
    },
    clearProductsFiltered(state) {
      state.dataFiltered = [];
    },
    //_______________________________________

    readWineProducts(state, action: PayloadAction<Product[]>) {
      state.wineProducts = state.wineProducts.concat(action.payload);
    },
    clearWineProducts(state) {
      state.wineProducts = [];
    },
    updateProducts(state, action) {},
    deleteProducts(state, action) {},
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
  deleteProducts, 
  clearProducts } = productsSlice.actions;

export default productsSlice.reducer;
