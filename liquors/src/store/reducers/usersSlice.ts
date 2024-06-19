import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUserState, IUser, Product } from "@/interfaces/interfaz";

const initialState: IUserState = {
  data: [],
  userBox: []
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    createUsers(state, action) {},
    readUsers(state, action: PayloadAction<IUserState>) {
      state = action.payload;
    },
    updateUsers(state, action) {},
    deleteUsers(state, action) {},
    //reducers para caja del mes
    readUserBox(state, action: PayloadAction<Product[]>) {
      state.userBox = state.userBox.concat(action.payload);
    },
    clearUserBox(state) {
      state.userBox = [];
    },
    deleteUserBox(state, action: PayloadAction<string>) {
      state.userBox = state.userBox.filter(
        product => product.id !== action.payload
      );
    },
    //--------------------------
  },
});

export const { createUsers, readUsers, updateUsers, deleteUsers, readUserBox,
  clearUserBox,
  deleteUserBox } =
  usersSlice.actions;

export default usersSlice.reducer;
