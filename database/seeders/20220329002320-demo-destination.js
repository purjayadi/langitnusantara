'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    const destinations = [
      {
        id: '1036e7d5-1901-46fd-9097-0a525344d076',
        name: 'LOMBOK',
        slug: 'lombok',
        banner: 'public/images/destination/lombok.jpg',
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3417ac67-3461-4a13-9b4f-259b1e0853b6',
        name: 'SUMBAWA',
        slug: 'sumbawa',
        banner: 'public/images/destination/sumbawa.jpg',
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '78659d53-2790-4814-9f89-08fd5e07eccb',
        name: 'BAJO',
        slug: 'bajo',
        banner: 'public/images/destination/bajo.jpg',
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4056a48d-a2e8-4179-a568-ef9f22d476f8',
        name: 'BALI',
        slug: 'bali',
        banner: 'public/images/destination/bali.jpg',
        isFeatured: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('Destinations', destinations);
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
