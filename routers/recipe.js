const { Router } = require("express");
const { API_KEY_1 } = require("../config/secrets");
const Recipe = require("../models").recipe;
const User_favorites = require("../models").User_favorites;
const router = new Router();
/*
make the auth middleware to attach user to request
implement the right front end request with bearer and token!
post request to add to favorites
getrequest to get all favorites
//optional remove from favorites
*/
router.get("/list", async (req, res, next) => {
  try {
    //find all recipes where userId : id
    const { id } = req.user;

    const favorites = await User_favorites.findAll({ where: { user_id: id } });
    const recipeIds = favorites.map((favorite) => {
      return favorite.recipe_id;
    });

    const recipes = await Recipe.findAll({ where: { id: recipeIds } });

    if (!recipes) {
      return res.status(404).send({ message: "somethnig went wrong, nothing found" });
    }
    return res.status(200).send(recipes);
  } catch (e) {
    console.log("Oops. an error was catched on /favorites/list ", e);
  }
});

/*
1. find all favorites for x user. 
2. find all recipes for x user
*/
router.post("/toggle", async (req, res, next) => {
  try {
    const { recipeAPIId } = req.body;
    let recipe = await Recipe.findOne({ where: { api_id: recipeAPIId } });
    if (!recipe) {
      const recipeData = await axios.get(
        `https://api.spoonacular.com/recipes/${recipeAPIId}/information?apiKey=${API_KEY_1}`
      );
      recipe = await Recipe.create({
        api_id: recipeAPIId,
        title: recipeData.title,
        description: recipeData.description,
        image: recipeData.image,
      });
    }
    await User_favorites.create({
      user_id: user_id,
      recipe_id: recipe.id,
    });
    res.status(200).send({ message: "All went fine" });
  } catch (e) {
    console.log(e.message);
  }
});
module.exports = router;

/*router.get("/list", async (req, res, next) => {
  try {
    //find all recipes where userId : id

    const { id } = req.user;
    const recipes = await Recipe.findAll({ where: id });

    if (!recipes) {
      return res.status(404).send({ message: "somethnig went wrong, nothing found" });
    }
    return res.status(200).send(recipes);
  } catch (e) {
    console.log("Oops. an error was catched on /favorites/list ", e);
  }
}); */
