'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BeginningBalances', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      accountId: {
        type: Sequelize.UUID,
        references: {
          model: 'Accounts', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' 
      },
      debit: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      credit: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      balance: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      periodeId: {
        type: Sequelize.UUID,
        references: {
          model: 'Periodes', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' 
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: true
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('BeginningBalances');
  }
};