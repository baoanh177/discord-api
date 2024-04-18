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
    await queryInterface.bulkInsert("servers", [
      {
        name: "Server test 01",
        owner_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Server test 02",
        owner_id: 1,
        is_public: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Server test 03",
        owner_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Server test 04",
        owner_id: 2,
        is_public: false,
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
