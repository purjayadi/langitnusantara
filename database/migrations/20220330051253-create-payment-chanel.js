'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PaymentChanels', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      name: {
        type: Sequelize.STRING
      },
      chanelCode: {
        type: Sequelize.STRING,
        unique: true
      },
      chanelCategory: {
        type: Sequelize.ENUM,
        values: ['VIRTUAL_ACCOUNT', 'RETAIL_OUTLET', 'EWALLET', 'CREDIT_CARD','QRIS']
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        default: true
      },
      logo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('PaymentChanels');
  }
};