import { createSlice } from '@reduxjs/toolkit';

// Спроба завантажити favorites з localStorage
const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

const initialState = {
  campers: [],
  selectedFilters: {
    location: '',
    equipment: [],
    type: [],
  },
  favorites: savedFavorites,
  totalCampers: 0,
};

const campersSlice = createSlice({
  name: 'campers',
  initialState,
  reducers: {
    setCampers: (state, action) => {
      state.campers = action.payload.items;
      state.totalCampers = action.payload.total;
    },
    setFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
    resetFilters: (state) => {
      state.selectedFilters = {
        location: '',
        equipment: [],
        type: [],
      };
    },
    addToFavorites: (state, action) => {
      const camper = action.payload;
      if (!state.favorites.find((c) => c.id === camper.id)) {
        state.favorites.push(camper);
        localStorage.setItem('favorites', JSON.stringify(state.favorites));
      }
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter(
        (c) => c.id !== action.payload.id
      );
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const {
  setCampers,
  setFilters,
  resetFilters,
  addToFavorites,
  removeFromFavorites
} = campersSlice.actions;

export default campersSlice.reducer;
