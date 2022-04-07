'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderPayments', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      source: {
        type: Sequelize.STRING,
        defaultValue: 'Direct'
      },
      externalId: {
        type: Sequelize.STRING
      },
      orderId: {
        type: Sequelize.STRING,
        references: {
          model: 'Orders', // name of Target model
          key: 'noInvoice' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' 
      },
      chanelCode: {
        type: Sequelize.STRING,
        references: {
          model: 'PaymentChanels', // name of Target model
          key: 'chanelCode' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      accountNumber: {
        type: Sequelize.STRING,
        allowNull: true
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
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
    await queryInterface.dropTable('OrderPayments');
  }
};