'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    userId:{ 
      allowNull:false,
      type:DataTypes.INTEGER,
      references: {model:"Users"}
    },
    header: {
      allowNull:false,
      type:DataTypes.STRING
    },
    subHeader: {
      allowNull:false,
      type:DataTypes.STRING
    },
    headerImage: {
      type:DataTypes.TEXT
    },
    contentImage: {
      type:DataTypes.TEXT
    },
    description: {
      allowNull:false,
      type:DataTypes.TEXT
    }
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User,{foreignKey:"userId"})
    Post.hasMany(models.Comment,{foreignKey:"postId",onDelete: 'cascade', hooks: true})
  };
  return Post;
};