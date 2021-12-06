"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Posts", [
      {
      userId:1,
      header:"Gameshow",
      subHeader:"Social video charades game.",
      headerImage:"https://ph-files.imgix.net/d945b23b-6623-4b11-8789-6ceaf5d8134c.png?auto=format&auto=compress&codec=mozjpeg&cs=strip&w=100&h=100&fit=crop&dpr=2",
      contentImage:"https://ph-files.imgix.net/fa3bc827-4910-4ac9-bde9-538c88770cb0.jpeg?auto=format&auto=compress&codec=mozjpeg&cs=strip",
      description:"Gameshow is a social network mashed together with a charades video game.",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId:2,
      header:"Dungeons and Dragons",
      subHeader:"Turn based rpg now in videogame formate!",
      headerImage:"https://sm.ign.com/ign_in/feature/h/how-to-sta/how-to-start-playing-dungeons-dragons_t3ms.jpg",
      contentImage:"https://cf.geekdo-images.com/sgYgyMVxD_ecYXUw0U36YQ__opengraph_letterbox/img/hNiABuPuMo1GeaxBKUMsu21W_7I=/fit-in/1200x630/filters:fill(auto):strip_icc()/pic681985.jpg",
      description:"Play Dungeons and Dragons with your friends in this action packed videgame!",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      userId:3,
      header:"FusionFall reboot",
      subHeader:"This is a fusionfall reboot to bring back the game since it shut down",
      headerImage:"https://www.fanbyte.com/wp-content/uploads/2020/06/fusionfall5.jpg",
      contentImage:"https://lutris.net/media/games/screenshots/3_38qdguq.png",
      description:"This is a fusionfall reboot that will be free for all players. Version 2.0.1 out now!!",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('Posts', null, {});
  },
};
