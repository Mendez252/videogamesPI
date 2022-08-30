import React from "react";
import "./styles/Pagination.css";

const Pagination = ({ videogamesPerPage, allVideogames, pagination }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number, id) => (
            <li className="number" key={id}>
              <a href="#/" onClick={() => pagination(number)}>
                {number}
              </a>
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default Pagination;
