import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReview } from "@/interfaces/interfaz";

export interface ReviewsState {
  data: IReview[];
}

const initialState: ReviewsState = {
  data: [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    createReviews: (state, action: PayloadAction<IReview>) => {
      state.data.push(action.payload);
    },
    readReviews: (state, action: PayloadAction<IReview[]>) => {
      state.data = state.data.concat(action.payload);
    },
    clearReviews: (state) => {
      state.data = [];
    },
    removeReview: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((review) => review.id !== action.payload);
    },
    updateReviews: (state, action: PayloadAction<IReview>) => {},
    deleteReviews: (state, action: PayloadAction<string>) => {},
  },
});

export const {
  createReviews,
  readReviews,
  clearReviews,
  removeReview,
  updateReviews,
  deleteReviews,
} = reviewsSlice.actions;

export default reviewsSlice.reducer;
