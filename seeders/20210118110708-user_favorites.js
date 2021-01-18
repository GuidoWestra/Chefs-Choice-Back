"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "user_favorites",
      [
        {
          user_id: 2,
          recipe_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          user_id: 1,
          recipe_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("user_favorites", null, {});
  },
};
