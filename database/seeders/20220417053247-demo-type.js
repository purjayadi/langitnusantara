'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface) {
    const types = [
      {
        id: faker.datatype.uuid(),
        code: 'T001',
        name: 'Jurnal',
        isActive: true,
        note: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: 'T002',
        name: 'Tanda Terima',
        isActive: true,
        note: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: 'T003',
        name: 'Pembayaran',
        isActive: true,
        note: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];
    await queryInterface.bulkInsert('JournalTypes', types);
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
