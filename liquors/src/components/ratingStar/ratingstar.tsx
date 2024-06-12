import * as React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';
import { RootState } from '@reduxjs/toolkit/query';

export default function HalfRating() {

  //deberia traer todas las reviews, de un producto especficio y recien ahi hacer el 
  //promedio


  return (
    <Stack spacing={1}>
      {/*deberia crear promedio de reviews de ratingReview y ponerlo en defaultValue. */}
      <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
    </Stack>
  );
}