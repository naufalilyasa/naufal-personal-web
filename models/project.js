"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Project.belongsTo(models.User, {
        foreignKey: "authorId",
        as: "user",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Project.init(
    {
      projectName: DataTypes.STRING,
      startProjectDate: DataTypes.DATE,
      endProjectDate: DataTypes.DATE,
      technologyNodeJs: DataTypes.BOOLEAN,
      technologyNextJs: DataTypes.BOOLEAN,
      technologyReactJs: DataTypes.BOOLEAN,
      technologyTypescript: DataTypes.BOOLEAN,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Project",
    }
  );
  return Project;
};
