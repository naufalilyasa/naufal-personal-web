"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Projects",
      [
        {
          projectName: "Web Profile",
          startProjectDate: new Date("2024-12-01"),
          endProjectDate: new Date("2025-02-01"),
          technologyNodeJs: true,
          technologyNextJs: false,
          technologyReactJs: true,
          technologyTypescript: false,
          description: "Web profile pribadi menggunakan nodejs dan reactjs.",
          image: "/img/coding.jpg",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          projectName: "Web Toko Online",
          startProjectDate: new Date("2024-12-01"),
          endProjectDate: new Date("2025-02-01"),
          technologyNodeJs: true,
          technologyNextJs: true,
          technologyReactJs: true,
          technologyTypescript: true,
          description:
            "Web toko online menggunakan nodejs, nextjs, reactjs dan typescript.",
          image: "/img/blog-img.png",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
