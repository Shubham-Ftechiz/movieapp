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
  router.put("/editmovie", movies.editMovie);

  // Delete Movie
  router.delete("/deletemovie", movies.deleteMovie);

  app.use("/api",auth, router);
};

module.exports = movieRoutes;
