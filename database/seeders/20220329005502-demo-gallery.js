'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    let gallery = [];
      for (let index = 0; index < 10; index++) {
        gallery.push({
          id: faker.datatype.uuid(),
          name: 'public/images/gallery/name-1648515288952.jpg',
          isSlider: faker.random.arrayElement([true, false]),
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
      return queryInterface.bulkInsert('Galleries', gallery);
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
