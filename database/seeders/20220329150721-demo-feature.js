'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Features', [
      {
          'id': '9aafc12e-d56d-4409-9cbd-85b737e23d7a',
          'name': 'Looking for a tour program?',
          'description': 'Inhabiting discretion the her dispatched decisively boisterous joy covered the whole of her lower arm.',
          'icon': 'fa fa-calendar-check-o',
          'createdAt': '2022-03-26T00:38:10.325Z',
          'updatedAt': '2022-03-26T00:38:10.325Z'
      },
      {
          'id': 'cdce70ea-1394-4cab-b222-14596d7c4b3e',
          'name': 'Need someone to guide tour?',
          'description': 'Great asked oh under together prospect kindness securing six Gregor then turned to look out the window.',
          'icon': 'fa fa-user',
          'createdAt': '2022-03-26T00:45:42.068Z',
          'updatedAt': '2022-03-26T00:45:42.068Z'
      },
      {
          'id': '40005fdd-2510-466c-854e-9d6f726de0ef',
          'name': 'Need someone to guide tour?',
          'description': 'Sometimes studied evident. Conduct replied removal her cordially. I will give you a complete account of the system',
          'icon': 'fa fa-dollar',
          'createdAt': '2022-03-26T00:46:44.546Z',
          'updatedAt': '2022-03-26T00:46:44.546Z'
      },
      {
          'id': '2c0aac24-9a9a-4c70-931e-d464e7127fdd',
          'name': 'Need someone to guide tour?',
          'description': 'Sometimes studied evident. Conduct replied removal her cordially. I will give you a complete account of the system',
          'icon': 'fa fa-bolt',
          'createdAt': '2022-03-26T00:47:15.514Z',
          'updatedAt': '2022-03-26T00:47:15.514Z'
      },
      {
          'id': 'a7c1c187-18fe-4759-a190-c70426a82b6e',
          'name': 'Need someone to guide tour?',
          'description': 'Sometimes studied evident. Conduct replied removal her cordially. I will give you a complete account of the system',
          'icon': 'fa fa-camera-retro',
          'createdAt': '2022-03-26T00:47:25.012Z',
          'updatedAt': '2022-03-26T00:47:25.012Z'
      },
      {
          'id': 'e57685fe-9e82-4adb-8f64-450d65950d31',
          'name': 'Need someone to guide tour?',
          'description': 'Sometimes studied evident. Conduct replied removal her cordially. I will give you a complete account of the system',
          'icon': 'fa fa-exchange',
          'createdAt': '2022-03-26T00:47:35.606Z',
          'updatedAt': '2022-03-26T00:47:35.606Z'
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
