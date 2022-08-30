import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Form from "./Form";
import CardsContainer from "./CardsContainer";
import "./styles/Body.css";

const Body = ({ showComponents }) => {
  const [state, setState] = useState(showComponents);

  useEffect(() => {
    setState(showComponents);
  }, [showComponents]);

  return (
    <div className="body_container">
      <SideBar />
      {state ? <CardsContainer /> : <Form />}
    </div>
  );
};

export default Body;
