import axios from "axios";
import {
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
} from "./videogameSlice";

export function fetchVideogames() {
  return async function (dispatch) {
    const videogames = await axios.get("http://localhost:3001/videogames");
    const { data } = videogames;
    return dispatch(getAll(data));
  };
}

export function changeUI(payload) {
  return async function (dispatch) {
    return dispatch(displayCardsOrForm(payload));
  };
}

export function searchBarQuery(name) {
  return async function (dispatch) {
    const byName = await axios.get(
      `http://localhost:3001/videogames?name=${name}`
    );
    const { data } = byName;

    return dispatch(searchName(data));
  };
}

export function searchById(id) {
  return async function (dispatch) {
    const request = await axios.get(`http://localhost:3001/videogame/${id}`);
    const { data } = request;
    return dispatch(searchId(data));
  };
}

export function getGenres() {
  return async function (dispatch) {
    const request = await axios.get(`http://localhost:3001/genres`);
    const { data } = request;

    return dispatch(getGenre(data));
  };
}

export function getPlatforms() {
  return async function (dispatch) {
    const request = await axios.get(`http://localhost:3001/platforms`);
    const { data } = request;

    return dispatch(getPlatform(data));
  };
}

export function alphabeticalOrder(value) {
  return (dispatch) => {
    dispatch(byAlpha(value));
  };
}

export function ratingOrder(value) {
  return (dispatch) => {
    dispatch(byRating(value));
  };
}

export function genresOrder(value) {
  return (dispatch) => {
    dispatch(byGenres(value));
  };
}

export function apiOrCreated(value) {
  return (dispatch) => {
    dispatch(filter(value));
  };
}

export function reset() {
  return (dispatch) => {
    dispatch(resetVideogames());
  };
}

export function Load(value) {
  return (dispatch) => {
    dispatch(onLoad(value));
  };
}

export function setCurrentPage(number) {
  return (dispatch) => {
    dispatch(setPage(number));
  };
}
