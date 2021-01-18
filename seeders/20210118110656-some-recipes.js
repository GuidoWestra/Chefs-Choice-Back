"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "recipes",
      [
        {
          api_id: 1,
          title: "Potato chips",
          description: "open the bag",
          image: "lays.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          api_id: 2,
          title: "nuts",
          description: "climb the tree",
          image: "tree.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("recipes", null, {});
  },
};
