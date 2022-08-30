import React from "react";
import "./styles/ApiCreated.css";
import { apiOrCreated, fetchVideogames } from "../redux/actions";
import { useDispatch } from "react-redux";

const ApiCreated = () => {
  const dispatch = useDispatch();

  const onHandleChange = (e) => {
    if (e.target.value === "all") {
      dispatch(fetchVideogames());
    } else {
      dispatch(apiOrCreated(e.target.value));
    }
  };

  return (
    <div className="apiCreated_container">
      Created/API
      <hr />
      <select
        name="apiCreated"
        className="selectCombo"
        onChange={onHandleChange}
        defaultValue={"default"}
      >
        <option value="default" disabled>
          filter videogames
        </option>
        <option value={"all"}>All</option>
        <option value={"created"}>Created</option>
        <option value={"api"}>Api</option>
      </select>
    </div>
  );
};

export default ApiCreated;
