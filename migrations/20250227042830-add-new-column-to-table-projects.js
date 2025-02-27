"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface
      .addColumn("Projects", "authorId", {
        type: Sequelize.INTEGER,
        allowNull: false,
      })
      .then(async () => {
        await queryInterface.addConstraint("Projects", {
          fields: ["authorId"],
          type: "foreign key",
          name: "projects_fk_to_users",
          references: {
            table: "Users",
            field: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        });
      });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Projects", "authorId");
  },
};
