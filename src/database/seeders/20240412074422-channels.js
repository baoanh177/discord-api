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
    await queryInterface.bulkInsert("channels", [
      {
        name: "Channel 01",
        server_id: 1,
        channel_type_id: 1,
        channel_category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Channel 02",
        server_id: 1,
        channel_type_id: 2,
        channel_category_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Channel 03",
        server_id: 1,
        channel_type_id: 1,
        channel_category_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Channel 04",
        server_id: 1,
        channel_type_id: 2,
        channel_category_id: 2,
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
    await queryInterface.bulkDelete("servers");
  },
};
