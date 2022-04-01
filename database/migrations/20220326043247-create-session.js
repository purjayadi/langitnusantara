'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {
      sid: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      sess: {
        type: Sequelize.STRING
      },
      expire: {
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('Sessions');
  }
};