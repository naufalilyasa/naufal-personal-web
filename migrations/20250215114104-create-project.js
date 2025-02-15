"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Projects", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      project_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      startProjectDate: {
        type: Sequelize.DATE,
      },
      endProjectAt: {
        type: Sequelize.DATE,
      },
      technologyNodeJs: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      technologyNextJs: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      technologyReactJs: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      technologyTypescript: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      image: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: DataTypes.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Projects");
  },
};
