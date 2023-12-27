const { verifyJwtToken } = require("../middleware/auth.js");

const movieRoutes = (app) => {
  const auth = verifyJwtToken;

  const movies = require("../controller/movies.controller.js");

  const router = require("express").Router();

  // Create Movie
  router.post("/addmovie", movies.createMovie);

  // Get Movie
  router.get("/getmovie", movies.getMovie);

  // Edit Movie

  app.use("/api",auth, router);
};

module.exports = movieRoutes;
