import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Videogames from "./pages/Videogames";
import VideogameDetails from "./components/VideogameDetails";
import Home from "./pages/Home";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/videogames" element={<Videogames />} />
        <Route exact path="/videogame/:id" element={<VideogameDetails />} />
      </Routes>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
