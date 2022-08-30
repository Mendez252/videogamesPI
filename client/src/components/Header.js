import React, { useState } from "react";
import "./styles/Header.css";

const Header = ({ onSearchBar, onChangeCardOrForm, cardOrForm }) => {
  const [query, setQuery] = useState("");

  const onHandleChangeCardOrForm = () => {
    onChangeCardOrForm();
  };

  const onHandleChangeQuery = (e) => {
    setQuery(e.target.value);
  };

  const onHandleSearchBar = () => {
    if (query === "") {
      return;
    } else {
      setQuery("");
      onSearchBar(query);
    }
  };

  return (
    <div className="headerContainer">
      <div className="leftSection">
        <div className="logoText" />
        Videog<span className="header_a">ⓐ</span>me Blog
      </div>
      <div className="searchBarSection">
        <input
          type="search"
          className="searchBar"
          placeholder="Search videogame by name"
          onChange={onHandleChangeQuery}
          value={query}
        />
        <button
          className="searchButton"
          icon="search"
          onClick={onHandleSearchBar}
          title="Search"
        >
          Search
        </button>
      </div>
      <div className="rightSection">
        <div className="nav" onClick={onHandleChangeCardOrForm}>
          {cardOrForm ? "New Videogame" : "Videogames"}
        </div>
      </div>
    </div>
  );
};

export default Header;
