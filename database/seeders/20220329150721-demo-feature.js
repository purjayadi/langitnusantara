'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Features', [
      {
          id: faker.datatype.uuid(),
          name: 'Looking for a tour program?',
          description: 'Inhabiting discretion the her dispatched decisively boisterous joy covered the whole of her lower arm.',
          icon: 'fa fa-calendar-check-o',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          id: faker.datatype.uuid(),
          name: 'Need someone to guide tour?',
          description: 'Great asked oh under together prospect kindness securing six Gregor then turned to look out the window.',
          icon: 'fa fa-user',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          id: faker.datatype.uuid(),
          name: 'Need someone to guide tour?',
          description: 'Sometimes studied evident. Conduct replied removal her cordially. I will give you a complete account of the system',
          icon: 'fa fa-dollar',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          id: faker.datatype.uuid(),
          name: 'Need someone to guide tour?',
          description: 'Sometimes studied evident. Conduct replied removal her cordially. I will give you a complete account of the system',
          icon: 'fa fa-bolt',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          id: faker.datatype.uuid(),
          name: 'Need someone to guide tour?',
          description: 'Sometimes studied evident. Conduct replied removal her cordially. I will give you a complete account of the system',
          icon: 'fa fa-camera-retro',
          createdAt: new Date(),
          updatedAt: new Date()
      },
      {
          id: faker.datatype.uuid(),
          name: 'Need someone to guide tour?',
          description: 'Sometimes studied evident. Conduct replied removal her cordially. I will give you a complete account of the system',
          icon: 'fa fa-exchange',
          createdAt: new Date(),
          updatedAt: new Date()
      }
  ]);
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
