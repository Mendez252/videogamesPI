import React from "react";
import "./styles/Cards.css";

const Cards = ({ id, name, image, genres, onHandleClick }) => {
  const handleClick = (id) => {
    onHandleClick(id);
  };

  return (
    <div className="card_container">
      <img
        className="videogamePic"
        alt="recipe pic"
        src={image}
        width={190}
        height={150}
        style={{
          opacity: 0.7,
          transition: "opacity .15s linear",
        }}
      />

      <div className="videogameInfo" onClick={() => handleClick(id)}>
        <p>
          <strong>{name}</strong>
        </p>
        <p>
          <strong>Genre:</strong>{" "}
          {genres.map((e) => {
            if (!e.name) {
              return `${e} `;
            } else {
              return e.name;
            }
          })}
        </p>
      </div>
    </div>
  );
};

export default Cards;
