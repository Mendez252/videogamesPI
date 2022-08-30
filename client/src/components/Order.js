import React from "react";
import "./styles/Order.css";
import { alphabeticalOrder, setCurrentPage } from "../redux/actions";
import { useDispatch } from "react-redux";

const Order = () => {
  const dispatch = useDispatch();

  const onHandleChange = (e) => {
    dispatch(alphabeticalOrder(e.target.value));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="orderContainer">
      Alphabetical
      <hr />
      <select
        name="alphabeticalOrder"
        className="selectCombo"
        onChange={onHandleChange}
        defaultValue={"default"}
      >
        <option value="default" disabled>
          Alphabetical order
        </option>
        <option value={1}>A-Z</option>
        <option value={-1}>Z-A</option>
      </select>
    </div>
  );
};

export default Order;
