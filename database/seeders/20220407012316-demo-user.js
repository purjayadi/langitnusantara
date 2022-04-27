'use strict';
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

function hashPassword (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const users = [
      {
        id: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@admin.com',
        phone: '08123456789',
        isAdmin: true,
        password: hashPassword('password'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        firstName: 'User',
        lastName: 'User',
        email: 'user@user.com',
        phone: '08123456789',
        isAdmin: false,
        password: hashPassword('password'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Users', users);
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
