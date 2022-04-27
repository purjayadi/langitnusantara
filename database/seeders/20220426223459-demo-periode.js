'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Periodes', [{
      id: faker.datatype.uuid(),
      code: 'P001',
      startDate: '2020-01-01',
      endDate: '2020-12-31',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down () {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
