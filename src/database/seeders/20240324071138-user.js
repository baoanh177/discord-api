"use strict"
const { faker } = require("@faker-js/faker")
const bcrypt = require("bcrypt")

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
        const passwordHash = bcrypt.hashSync("123456", 10)
        const users = [
            {
                name: "Bao Anh",
                email: "baoanh27042004@gmail.com",
                password: passwordHash,
                gender: "male",
                avatar: faker.image.avatarLegacy(),
                status: 1,
                created_at: new Date(),
                updated_at: new Date()
            }
        ]
        for(let i=0; i<10; ++i) {
            users.push({
                name: faker.person.fullName(),
                email: faker.internet.email(),
                password: passwordHash,
                gender: ["male", "female", "other"][faker.number.int({ min: 0, max: 2 })],
                avatar: faker.image.avatarLegacy(),
                status: faker.number.int({ min: 0, max: 2 }),
                created_at: new Date(),
                updated_at: new Date()
            })
        }
        await queryInterface.bulkInsert("users", users)
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("users", null)
    },
}
