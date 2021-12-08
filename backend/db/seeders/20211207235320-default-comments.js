"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          postId: 1,
          userId: 1,
          content: "This is my favorite game",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          userId: 2,
          content: "This is also my favorite game",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          userId: 3,
          content: "I too, am a fan of this game",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          userId: 2,
          content: "But are you tho?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          userId: 3,
          content: "Lol no I was kidding",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          userId: 2,
          content: ">:(",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
