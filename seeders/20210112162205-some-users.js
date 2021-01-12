"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Guido Westra",
          email: "westra.guido@gmail.com",
          password: "test1234",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Willem Westra",
          email: "wmwestra@kpnmail.nl",
          password: "test1234",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};
