'use strict';

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

    await queryInterface.bulkInsert('tb_notification', [
      {
        id: 'b7c9a7e7-1e3d-4f6e-8e9d-6c6b6f4f4f4f',
        type: 'BIKE_STOLEN',
        importance: 'HIGH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b7c9a7e7-1e3d-4f6e-8e9d-6c6b6f4f4f4e',
        type: 'BIKE_RECOVERED',
        importance: 'MEDIUM',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'b7c9a7e7-1e3d-4f6e-8e9d-6c6b6f4f4f4d',
        type: 'BIKE_LOST',
        importance: 'HIGH',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
