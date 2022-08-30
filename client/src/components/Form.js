import React, { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Form.css";
import { useSelector, useDispatch } from "react-redux";
import { getPlatforms } from "../redux/actions";
import Notification from "./Notifications";

const Form = () => {
  const dispatch = useDispatch();
  const genreArray = useSelector((state) => state.videogameSlice.genre);
  const platformArray = useSelector((state) => state.videogameSlice.platforms);

  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);
  //-------------->
  const [notifications, setNotifications] = useState(false);
  const [notificationsError, setNotificationsError] = useState(false);
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    name: "",
    description: "",
    rating: 0,
    released: "",
    background_image: "",
    genre: [],
    platforms: [],
    createdInDB: true,
  });
  //-------------->
  const handleChange = (e) => {
    if (e.target.name === "genre") {
      if (input.genre.includes(e.target.value)) {
        return;
      } else {
        setInput({ ...input, genre: input.genre.concat(e.target.value) });
      }
    } else if (e.target.name === "platforms") {
      if (input.platforms.includes(e.target.value)) {
        return;
      } else {
        setInput({
          ...input,
          platforms: input.platforms.concat(e.target.value),
        });
      }
    } else {
      setInput({ ...input, [e.target.name]: e.target.value });
    }

    setError(validateInput({ ...input, [e.target.name]: e.target.value }));
  };
  //-------------->
  const validateInput = (input) => {
    let error = {};
    setNotificationsError(false);
    if (!input.name.match(/[A-za-z0–9_]/)) {
      error.name = "Name must be a string of characters, *field is required";
    } else if (
      input.description.length > 70 ||
      input.description.length === 0
    ) {
      error.description =
        "Description must be less than 70 letters, and not empty. *field is required";
    } else if (input.rating < 0 || input.rating > 5) {
      error.rating = "Rating must be a value between 0 and 5";
    } else if (input.platforms.length === 0) {
      error.platforms = "*field is required";
    } else if (input.genre.length === 0) {
      error.genre = "Genre is required";
    } else if (input.background_image.length === 0) {
      error.background_image = "*Image is required";
    }

    return error;
  };
  //-------------->
  const onReset = () => {
    setInput({
      name: "",
      description: "",
      rating: "",
      released: "",
      background_image: "",
      genre: [],
      platforms: [],
      createdInDB: true,
    });
    setError({});
  };
  //-------------->
  const onSubmit = (e) => {
    console.log(error);
    setNotificationsError(false);
    try {
      e.preventDefault();

      const {
        name,
        description,
        rating,
        released,
        genre,
        platforms,
        background_image,
        createdInDB,
      } = input;

      const newVideogame = {
        name,
        description,
        rating,
        released,
        genre,
        platforms,
        background_image,
        createdInDB,
      };
      let result = Object.keys(error).length;

      if (
        result > 0 ||
        !name ||
        !description ||
        !rating ||
        !released ||
        genre.length === 0 ||
        platforms.length === 0 ||
        !background_image
      ) {
        setNotificationsError(true);
      } else {
        axios
          .post("http://localhost:3001/videogame", { newVideogame })
          .catch((error) => console.log(error));
        setNotifications(true);
        onReset();
      }
    } catch (error) {
      console.log(error);
    }
  };
  //-------------->
  return (
    <div className="formContainer">
      <div className="title">
        <h3>Create a new Videogame</h3>
      </div>

      <div className="form">
        <form onSubmit={onSubmit} className="FstSection">
          <div className="inputContainer">
            <label className="label">Videogame Name</label>
            <input
              required
              className="input"
              name="name"
              type="text"
              placeholder="videogame name"
              value={input.name}
              onChange={handleChange}
            />
            {error.name && <p className="error">{error.name}</p>}
          </div>

          <div className="inputContainer">
            <label className="label">Description</label>
            <input
              className="input"
              name="description"
              type="text"
              placeholder="description"
              value={input.description}
              onChange={handleChange}
              maxLength={99}
            />
            {error.description && <p className="error">{error.description}</p>}
          </div>

          <div className="inputContainer">
            <label className="label">Rating</label>
            <input
              className="input"
              name="rating"
              type="numbon suber"
              placeholder="0-5.0"
              value={input.rating}
              onChange={handleChange}
              min={0.0}
              max={5.0}
            />
            {error.rating && <p className="error">{error.rating}</p>}
          </div>

          <div className="inputContainer">
            <label className="label">Released date</label>
            <input
              className="input"
              name="released"
              type="date"
              placeholder="dd-mm-yyyy"
              value={input.released}
              onChange={handleChange}
              min="01-01-1970"
              max="30-03-2022"
            />
            {error.released && <p className="error">{error.released}</p>}
          </div>

          <div className="inputContainer">
            <label className="label">Image URL</label>
            <input
              className="input"
              name="background_image"
              type="url"
              placeholder="http://google.com/example_image.jpg"
              value={input.background_image}
              onChange={handleChange}
            />
            {error.background_image && (
              <p className="error">{error.background_image}</p>
            )}
          </div>
        </form>

        <div className="select">
          <div className="inputContainer">
            <label className="label">Select genres</label>
            <select
              name="genre"
              value={[...input.genre]}
              onChange={handleChange}
              multiple
            >
              {genreArray.map((e, id) => {
                return (
                  <option className="select" key={id} value={e}>
                    {e}
                  </option>
                );
              })}
            </select>

            <div>
              {input.genre.map((e, id) => (
                <button
                  key={id}
                  name={e}
                  className="labelButton"
                  onClick={() => {
                    var filteredTypes = input.genre.filter((el) => el !== e);
                    setInput({
                      ...input,
                      genre: filteredTypes,
                    });
                  }}
                >
                  {e}
                </button>
              ))}
              {input.genre.length > 0 && (
                <p style={{ color: "yellow" }}>* Click on label to delete it</p>
              )}

              <div className="inputContainer">
                <label className="label">Select Platforms</label>
                <select
                  name="platforms"
                  value={[...input.platforms]}
                  onChange={handleChange}
                  multiple
                >
                  {platformArray.map((e, id) => {
                    return (
                      <option className="select" key={id} value={e}>
                        {e}
                      </option>
                    );
                  })}
                </select>

                <div>
                  {input.platforms.map((e, id) => (
                    <button
                      key={id}
                      name={e}
                      className="labelButton"
                      onClick={() => {
                        var filteredTypes = input.platforms.filter(
                          (el) => el !== e
                        );
                        setInput({ ...input, platforms: filteredTypes });
                      }}
                    >
                      {e}
                    </button>
                  ))}
                </div>
              </div>

              <div className="buttonContainer">
                <button className="reset_form" onClick={onReset}>
                  Reset Form
                </button>
                <button className="submit" type="submit" onClick={onSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="notifications__container">
        {notifications && <Notification />}
        {notificationsError && <Notification errors={notificationsError} />}
      </div>
    </div>
  );
};

export default Form;
