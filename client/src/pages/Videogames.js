import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchVideogames,
  changeUI,
  searchBarQuery,
  getGenres,
  getPlatforms,
  Load,
} from "../redux/actions";
import Header from "../components/Header";
import Body from "../components/Body";
import "./styles/Videogames.css";
//-------->

const Videogames = () => {
  const cardOrForm = useSelector((state) => state.videogameSlice.cardOrForm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPlatforms());
    dispatch(getGenres());
    dispatch(fetchVideogames());
    dispatch(Load(true));
  }, [dispatch]);

  const resetVideogames = () => {
    dispatch(fetchVideogames());
  };

  const onChangeCardOrForm = () => {
    dispatch(changeUI(!cardOrForm));
  };

  const onSearchBar = (name) => {
    dispatch(searchBarQuery(name));
    dispatch(Load(true));
  };

  return (
    <div className="container">
      <Header
        onChangeCardOrForm={onChangeCardOrForm}
        onSearchBar={onSearchBar}
        cardOrForm={cardOrForm}
      />
      <div className="body">
        <Body showComponents={cardOrForm} resetVideogames={resetVideogames} />
      </div>
    </div>
  );
};

export default Videogames;
