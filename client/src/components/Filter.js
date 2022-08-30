import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles/Filter.css";
import { genresOrder, setCurrentPage } from "../redux/actions";

const Filter = () => {
  const genres = useSelector((state) => state.videogameSlice.genre);
  const dispatch = useDispatch();

  const onHandleChange = (e) => {
    dispatch(genresOrder(e.target.value));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="filterContainer">
      <div className="filterIcon">
        Filter by Genres
        <hr />
      </div>
      <div>
        <select
          name="genreOrder"
          className="selectCombo"
          onChange={onHandleChange}
          defaultValue={"default"}
        >
          <option value="default" disabled="disabled">
            filter by genre
          </option>
          <option value="all">All</option>
          {genres.map((e, id) => {
            return (
              <option key={id} value={e.value}>
                {e}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default Filter;
