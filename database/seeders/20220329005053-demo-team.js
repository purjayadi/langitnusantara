'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
      let category = [];
      for (let index = 0; index < 10; index++) {
        category.push({
          id: faker.datatype.uuid(),
          name: faker.name.findName(),
          position: faker.name.jobTitle(),
          photo: 'https://apilangitnusantara.herokuapp.com/images/team/photo-1648435705711.jpg',
          facebook: 'https://www.facebook.com/',
          twitter: 'https://www.twitter.com/',
          instagram: 'https://instagram.com/',
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      return queryInterface.bulkInsert('Teams', category);
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
