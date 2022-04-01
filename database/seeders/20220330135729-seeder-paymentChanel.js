'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    const chanels = [
      {
        id: faker.datatype.uuid(),
        name: 'BCA virtual account',
        chanelCode: 'BCA',
        chanelCategory: 'VIRTUAL_ACCOUNT',
        logo: 'public/images/payment/bca-logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        name: 'BRI virtual account',
        chanelCode: 'BRI',
        chanelCategory: 'VIRTUAL_ACCOUNT',
        logo: 'public/images/payment/bri-logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        name: 'BNI virtual account',
        chanelCode: 'BNI',
        chanelCategory: 'VIRTUAL_ACCOUNT',
        logo: 'public/images/payment/bni-logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        name: 'Mandiri virtual account',
        chanelCode: 'MANDIRI',
        chanelCategory: 'VIRTUAL_ACCOUNT',
        logo: 'public/images/payment/mandiri-logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        name: 'Permata virtual account',
        chanelCode: 'PERMATA',
        chanelCategory: 'VIRTUAL_ACCOUNT',
        logo: 'public/images/payment/permata-logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        name: 'Alfamart retail outlet',
        chanelCode: 'ALFAMART',
        chanelCategory: 'VIRTUAL_ACCOUNT',
        logo: 'public/images/payment/alfamart-logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        name: 'Indomaret retail outlet',
        chanelCode: 'INDOMARET',
        chanelCategory: 'RETAIL_OUTLET',
        logo: 'public/images/payment/indomaret-logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        name: 'OVO e-wallet',
        chanelCode: 'ID_OVO',
        chanelCategory: 'EWALLET',
        logo: 'public/images/payment/ovo-logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        name: 'DANA e-wallet',
        chanelCode: 'ID_DANA',
        chanelCategory: 'EWALLET',
        logo: 'public/images/payment/dana-logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        name: 'LinkAja e-wallet',
        chanelCode: 'ID_LINKAJA',
        chanelCategory: 'EWALLET',
        logo: 'public/images/payment/linkaja-logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        name: 'ShopeePay e-wallet',
        chanelCode: 'ID_SHOPEEPAY',
        chanelCategory: 'EWALLET',
        logo: 'public/images/payment/shopeepay-logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        name: 'QR Codes',
        chanelCode: 'QRIS',
        chanelCategory: 'QRIS',
        logo: 'public/images/payment/qris-logo.svg',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    await queryInterface.bulkInsert('PaymentChanels', chanels);
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
