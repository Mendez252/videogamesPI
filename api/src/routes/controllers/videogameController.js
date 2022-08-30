const {
  getAllGames,
  requestByName,
  requestById,
  requestByGenres,
  createVideogame,
  requestByPlatforms,
  requestByIdInDB,
} = require("./helperFunctions");

async function getAll(req, res) {
  const name = req?.query?.name?.trim();

  try {
    if (!name) {
      const response = await getAllGames();
      response ? res.send(response) : [];
    } else {
      const response = await requestByName(name);
      response ? res.send(response) : [];
    }
  } catch (err) {
    console.error(err);
  }
}

async function getById(req, res) {
  try {
    const id = req.params?.id;

    let newObj = {};
    const api = await requestById(id);
    const db = await requestByIdInDB(id);
    if (api) {
      res.status(200).send(api);
    }
    if (db) {
      await db.forEach((e) => {
        newObj = {
          name: e.name,
          background_image: e.background_image,
          genres: e.genres.map((e) => e),
          description: e.description,
          released: e.released,
          rating: e.rating,
          platforms: e.platforms,
        };
        res.status(200).send(newObj);
      });
    } else {
      res.status(404).send([]);
    }
  } catch (err) {
    console.error(err);
  }
}

async function getGenres(req, res) {
  try {
    const response = await requestByGenres();
    res.status(200).send(response);
  } catch (err) {
    console.error(err);
  }
}

async function postVideogame(req, res) {
  try {
    const params = req.body;

    const response = createVideogame(params.newVideogame);
    return res.status(200).send(response);
  } catch (err) {
    console.error(err);
  }
}

async function getPlatforms(req, res) {
  try {
    const response = await requestByPlatforms();
    res.status(200).send(response);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { getAll, getById, getGenres, postVideogame, getPlatforms };
