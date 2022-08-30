const axios = require("axios");
const { Videogame, Genre } = require("../../db");
const { API_KEY } = process.env;

const getVideogamesAPI = async () => {
  const getDataFromApi = (url) => {
    var array = [];
    var api = new Promise(async (resolve, rejected) => {
      await axios.get(url).then((res) => {
        if (res.status === 200) {
          res.data.results.map((e) => {
            let newVideogame = {
              idApi: e.id,
              name: e.name,
              background_image: e.background_image,
              released: e.released,
              rating: e.rating,
              platforms: e.platforms.map((e) => e.platform.name),
              genres: e.genres.map((e) => e.name),
              createdInDB: false,
            };
            array.push(newVideogame);
            resolve(array);
          });
        } else {
          rejected("error");
        }
      });
    });
    return api;
  };

  var total = [];

  const request = getDataFromApi(
    "https://api.rawg.io/api/games?key=bbfab76c940e48479fcf8d8375eee846&page_size=20"
  );
  const request2 = getDataFromApi(
    "https://api.rawg.io/api/games?key=bbfab76c940e48479fcf8d8375eee846&page=2&page_size=20"
  );
  const request3 = getDataFromApi(
    "https://api.rawg.io/api/games?key=bbfab76c940e48479fcf8d8375eee846&page=3&page_size=20"
  );
  const request4 = getDataFromApi(
    "https://api.rawg.io/api/games?key=bbfab76c940e48479fcf8d8375eee846&page=4&page_size=20"
  );
  const request5 = getDataFromApi(
    "https://api.rawg.io/api/games?key=bbfab76c940e48479fcf8d8375eee846&page=5&page_size=20"
  );

  result = await request;
  result2 = await request2;
  result3 = await request3;
  result4 = await request4;
  result5 = await request5;
  total = [...result, ...result2, ...result3, ...result4, ...result5];

  return total;
};
//======================================
const getVideogamesDB = async () => {
  return await Videogame.findAll({
    include: {
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  }).then((videogames) => {
    var newRows = videogames.map((r) => {
      var genres = r?.dataValues?.genres?.map((e) => e.name);
      return {
        id: r.dataValues.id,
        name: r.dataValues.name,
        rating: r.dataValues.rating,
        released: r.dataValues.released,
        background_image:
          r?.dataValues?.background_image ??
          "https://cdn.pixabay.com/photo/2016/10/30/23/05/controller-1784573__340.png",
        genres: genres,
        platforms: r.dataValues.platforms,
        description: r.dataValues.description,
        createdInDB: true,
      };
    });
    return newRows;
  });
};

const getAllGames = async () => {
  const api = await getVideogamesAPI();
  const videogamesDB = await getVideogamesDB();
  const infoTotal = api.concat(videogamesDB);
  return infoTotal;
};
//======================================
const requestByName = async (name) => {
  try {
    const request = await getAllGames();
    const result = await request.filter((e) =>
      e.name.toLowerCase().includes(name.toLowerCase())
    );
    const response = result.length > 0 ? result : [];
    return response;
  } catch (err) {
    console.log(err);
  }
};
//======================================
const requestById = async (id) => {
  try {
    const videogameDetails = await axios
      .get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      .then((res) => {
        const {
          name,
          background_image,
          genres,
          description,
          released,
          rating,
          platforms,
        } = res.data;

        if (res.status === 200) {
          let newVideogame = {
            name,
            background_image,
            genres: genres.map((e) => e.name),
            description,
            released,
            rating,
            platforms: platforms.map((e) => e.platform.name),
          };
          return newVideogame;
        }
      });

    return videogameDetails;
  } catch (err) {
    console.log(err);
  }
};

const requestByIdInDB = async (id) => {
  const db = await getVideogamesDB();

  const result = db.filter((e) => e.id === id);
  return result;
};
//======================================
const requestByGenres = async () => {
  try {
    const genres = await axios.get(
      `https://api.rawg.io/api/genres?key=${API_KEY}`
    );
    const genresNames = genres.data.results.map((e) => e.name);

    genresNames.forEach(async (data) => {
      const [genre, created] = await Genre.findOrCreate({
        where: { name: data },
        defaults: { name: data },
      });
    });

    return genresNames;
  } catch (err) {
    console.log(err);
  }
};
//======================================
const createVideogame = async ({
  name,
  description,
  genre,
  rating,
  released,
  background_image,
  platforms,
  createdInDB,
}) => {
  try {
    let videogameCreated = await Videogame.create({
      name,
      description,
      rating,
      released,
      background_image,
      platforms,
      createdInDB,
    });

    let genresDB = await Genre.findAll({
      where: { name: genre },
    });

    videogameCreated.addGenres(genresDB);
  } catch (error) {
    console.log(error);
  }
};
//======================================
const requestByPlatforms = async () => {
  var unique = [];
  let platforms = await getVideogamesAPI();
  console.log(platforms);

  platforms.map((e) => {
    e.platforms.map((e) => unique.push(e));
  });

  platformsArray = [...new Set(unique)];

  return platformsArray;
};

module.exports = {
  getAllGames,
  requestByName,
  requestById,
  requestByGenres,
  createVideogame,
  requestByPlatforms,
  requestByIdInDB,
};
