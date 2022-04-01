'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    let partner = [];
      for (let index = 0; index < 10; index++) {
        partner.push({
          id: faker.datatype.uuid(),
          name: faker.company.companyName(),
          image: 'public/images/partner/image-1648514782984.png',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      return queryInterface.bulkInsert('Partners', partner);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
