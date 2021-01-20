const { default: axios } = require("axios");
const { Router } = require("express");
const { API_KEY_1 } = require("../config/secrets");
const User = require("../models").user;
const Recipe = require("../models").recipe;
const User_favorites = require("../models").user_favorites;
const router = new Router();
/*
make the auth middleware to attach user to request
implement the right front end request with bearer and token!
post request to add to favorites
getrequest to get all favorites
//optional remove from favorites
*/
/*   
#1
router.get("/list/:id", async (req, res, next) => {
implement auth middleware logic to get dynamic data.

*/
router.get("/list", async (req, res, next) => {
  try {
    const { id } = req.user;
    const result = await User.findByPk(id, { include: Recipe, attributes: [] });

    res.send(result.dataValues);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.post("/toggle/:apiId", async (req, res, next) => {
  try {
    const { id } = req.user;
    const { apiId } = req.params;
    console.log("This was posted with request", id, apiId);
    let recipe = await Recipe.findOne({ where: { api_id: apiId } });
    if (!recipe) {
      const result = await axios.get(
        `https://api.spoonacular.com/recipes/${apiId}/information?apiKey=${API_KEY_1}`
      );
      console.log("Recipe:", result.data.title);
      recipe = await Recipe.create({
        api_id: apiId,
        title: result.data.title,
        // description: result.data.instructions,
        image: result.data.image,
      });
      await User_favorites.create({
        user_id: id,
        recipe_id: recipe.id,
      });
      return res.status(200).send({ message: "Favorite Added", data: recipe });
    }
    const userFavorite = await User_favorites.findOne({
      where: { user_id: id, recipe_id: recipe.id },
    });
    if (userFavorite) {
      userFavorite.destroy();
      res.status(200).send({ message: "Favorite deleted" });
    } else return res.status(200).send({ message: "Favorite Added", data: recipe });
  } catch (e) {
    console.log("what is oop", e);
    res.send({ message: "oop" });
  }
});

module.exports = router;
/*
1. find all favorites for x user. 
2. find all recipes for x user
*/
// router.post("/toggle", async (req, res, next) => {
//   try {
//     const { recipeAPIId } = req.body;
//     let recipe = await Recipe.findOne({ where: { api_id: recipeAPIId } });
//     if (!recipe) {
//       const recipeData = await axios.get(
//         `https://api.spoonacular.com/recipes/${recipeAPIId}/information?apiKey=${API_KEY_1}`
//       );
//       recipe = await Recipe.create({
//         api_id: recipeAPIId,
//         title: recipeData.title,
//         description: recipeData.description,
//         image: recipeData.image,
//       });
//     }
//     await User_favorites.create({
//       user_id: user_id,
//       recipe_id: recipe.id,
//     });
//     res.status(200).send({ message: "All went fine" });
//   } catch (e) {
//     console.log(e.message);
//   }
// });

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
