'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PackageServices', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      packageId: {
        type: Sequelize.UUID,
        references: {
          model: 'Packages', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE' 
      },
      serviceId: {
        type: Sequelize.UUID,
        references: {
          model: 'Services', // name of Target model
          key: 'id' // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL' 
      },
      type: {
        type: Sequelize.ENUM,
        values: ['inc', 'exc']
      },
      description: {
        type: Sequelize.STRING,
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
  async down(queryInterface) {
    await queryInterface.dropTable('PackageServices');
  }
};