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
          createdAt: new Date('1995-12-11T03:24:00'),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          userId: 2,
          content: "This is also my favorite game",
          createdAt: new Date('1995-12-12T03:24:00'),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          userId: 3,
          content: "I too, am a fan of this game",
          createdAt: new Date('1995-12-13T03:24:00'),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          userId: 2,
          content: "But are you tho?",
          createdAt: new Date('1995-12-14T03:24:00'),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          userId: 3,
          content: "Lol no I was kidding",
          createdAt: new Date('1995-12-15T03:24:00'),
          updatedAt: new Date(),
        },
        {
          postId: 1,
          userId: 2,
          content: ">:(",
          createdAt: new Date('1995-12-16T03:24:00'),
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
