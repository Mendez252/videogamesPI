import { createSlice } from "@reduxjs/toolkit";

export const videogameSlice = createSlice({
  name: "videogames",
  initialState: {
    allVideogames: [],
    allVideogamesCopy: [],
    cardOrForm: true,
    videogameID: [],
    videogameName: [],
    genre: [],
    platforms: [],
    isLoading: false,
    currentPage: 1,
  },
  reducers: {
    onLoad: (state, action) => {
      state.isLoading = action.payload;
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    getAll: (state, action) => {
      state.isLoading = true;
      state.allVideogames = action.payload;
      state.allVideogamesCopy = action.payload;
      state.isLoading = false;
    },
    getGenre: (state, action) => {
      state.genre = action.payload;
    },
    getPlatform: (state, action) => {
      state.platforms = action.payload;
    },
    displayCardsOrForm: (state, action) => {
      state.cardOrForm = action.payload;
    },
    searchId: (state, action) => {
      state.isLoading = true;
      state.videogameID = action.payload;
      state.isLoading = false;
    },
    searchName: (state, action) => {
      state.allVideogames = action.payload;
      state.isLoading = false;
      state.currentPage = 1;
    },
    filter: (state, action) => {
      const { payload } = action;
      if (payload === "all") {
        state.currentPage = 1;
        return state.allVideogames;
      } else if (payload === "created") {
        let result = state.allVideogamesCopy.filter(
          (e) => e.createdInDB === true
        );
        console.log(result);
        state.currentPage = 1;
        state.allVideogames = result;
      } else if (payload === "api") {
        let result = state.allVideogamesCopy.filter(
          (e) => e.createdInDB === false
        );
        state.currentPage = 1;
        state.allVideogames = result;
      }
    },
    byGenres: (state, action) => {
      const result = [];
      state.allVideogames = state.allVideogamesCopy;

      if (action.payload === "all") {
        state.currentPage = 1;
        return;
      } else {
        state.allVideogames.map((e) => {
          if (e.genres.includes(action.payload)) {
            state.currentPage = 1;
            result.push(e);
          } else if (result.length === 0) {
            return state.allVideogames;
          }
          return "";
        });
      }

      state.allVideogames = result;
    },
    byAlpha: (state, action) => {
      state.allVideogames.sort((a, b) => {
        if (action.payload === "1") {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          }
          return 0;
        } else {
          if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return -1;
          }
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return 1;
          }
          return 0;
        }
      });
    },
    byRating: (state, action) => {
      state.allVideogames.sort((a, b) => {
        if (action.payload === "1") {
          return a.rating - b.rating;
        } else {
          return b.rating - a.rating;
        }
      });
    },
    resetVideogames: (state, action) => {
      state.allVideogames = action.payload;
    },
  }, //-reducers
});

export const {
  setPage,
  getAll,
  getGenre,
  getPlatform,
  displayCardsOrForm,
  searchId,
  searchName,
  filter,
  byGenres,
  byAlpha,
  byRating,
  resetVideogames,
  onLoad,
} = videogameSlice.actions;

export default videogameSlice.reducer;
