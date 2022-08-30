import "./styles/Order.css";
import { ratingOrder, setCurrentPage } from "../redux/actions";
import { useDispatch } from "react-redux";

const Rating = () => {
  const dispatch = useDispatch();

  const onHandleChange = (e) => {
    dispatch(ratingOrder(e.target.value));
    dispatch(setCurrentPage(1));
  };

  return (
    <div className="orderContainer">
      Rating
      <hr />
      <select
        name="ratingOrder"
        className="selectCombo"
        onChange={onHandleChange}
        defaultValue={"default"}
      >
        <option value="default" disabled>
          order by rating
        </option>
        <option value="1">0-5</option>
        <option value="-1">5-0</option>
      </select>
    </div>
  );
};

export default Rating;
