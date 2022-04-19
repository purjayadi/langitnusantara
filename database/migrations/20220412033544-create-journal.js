'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Journals', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      date: {
        type: Sequelize.DATEONLY
      },
      code: {
        type: Sequelize.STRING
      },
      accountId: {
        type: Sequelize.UUID,
        references: {
          model: 'Accounts', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      journalTypeId: {
        type: Sequelize.UUID,
        references: {
          model: 'JournalTypes', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' 
      },
      periodeId: {
        type: Sequelize.UUID,
        references: {
          model: 'Periodes', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT' 
      },
      debit: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
        allowNull: false
      },
      credit: {
        type: Sequelize.DECIMAL,
        defaultValue: 0,
        allowNull: false
      },
      ref: {
        type: Sequelize.STRING,
        allowNull: false
      },
      note: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      tagId: {
        type: Sequelize.UUID,
        references: {
          model: 'Tags', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT' 
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
    await queryInterface.dropTable('Journals');
  }
};