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
    await queryInterface.bulkInsert("channels_categories", [
      {
        name: "General",
        server_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Games",
        server_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "General",
        server_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Studies",
        server_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("channels_categories");
  },
};
