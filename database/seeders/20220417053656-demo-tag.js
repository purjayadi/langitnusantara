'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface) {
    const tags = [
      {
        id: faker.datatype.uuid(),
        code: 'TG001',
        name: 'Umum',
        bgColor: '#0000',
        txtColor: '#ffff',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: 'TG002',
        name: 'Penyesuaian',
        bgColor: '#0000',
        txtColor: '#ffff',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: 'TG003',
        name: 'Penutup',
        bgColor: '#0000',
        txtColor: '#ffff',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: 'TG004',
        name: 'Pembalik',
        bgColor: '#0000',
        txtColor: '#ffff',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Tags', tags);
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
