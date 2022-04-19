'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface) {
    const groups = [
      {
        id: faker.datatype.uuid(),
        code: '10',
        name: 'Harta',
        isActive: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '20',
        name: 'Utang',
        isActive: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '30',
        name: 'Modal',
        isActive: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '40',
        name: 'Pendapatan',
        isActive: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '50',
        name: 'Beban',
        isActive: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Groups', groups);
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
