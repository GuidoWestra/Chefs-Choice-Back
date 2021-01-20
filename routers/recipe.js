const { default: axios } = require("axios");
const { Router } = require("express");
const { API_KEY_1 } = require("../config/secrets");
const User = require("../models").user;
const Recipe = require("../models").recipe;
const User_favorites = require("../models").user_favorites;
const router = new Router();

// list of recipes! matching the user who requested
router.get("/list", async (req, res, next) => {
  try {
    console.log("I am being logged at ngight", req.user.id);
    const { id } = req.user;
    const result = await User.findByPk(id, { include: Recipe, attributes: [] });

    res.send(result.dataValues);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});
// toggle fav for user who made request
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
