'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface) {
    const groups = [
      //harta
      {
        id: '83fcd6f4-8ca3-41d6-bfd3-91234e5699d9',
        code: '10',
        name: 'Harta',
        isActive: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '351d4af9-356a-475d-9af1-aafec1510870',
        code: '10.1',
        name: 'Harta Lancar',
        isActive: true,
        parentId: '83fcd6f4-8ca3-41d6-bfd3-91234e5699d9',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '0d2ae5b7-f577-4729-8b3a-ebeca074aeef',
        code: '10.2',
        name: 'Harta Tetap',
        isActive: true,
        parentId: '83fcd6f4-8ca3-41d6-bfd3-91234e5699d9',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '1dcb7eef-94dd-4842-af2f-e89b63efbe9e',
        code: '10.1.1',
        name: 'Kas dan setara Kas',
        isActive: true,
        parentId: '351d4af9-356a-475d-9af1-aafec1510870',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4fa44c36-8204-4e89-8b7e-33a230a0ef21',
        code: '10.1.2',
        name: 'Piutang Usaha',
        isActive: true,
        parentId: '351d4af9-356a-475d-9af1-aafec1510870',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '0351faf5-42b8-43db-95e4-a68efe4a969b',
        code: '10.1.3',
        name: 'Perlengkapan',
        isActive: true,
        parentId: '351d4af9-356a-475d-9af1-aafec1510870',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '77ee23d0-84d2-4204-bbac-804101c91794',
        code: '10.2.1',
        name: 'Bangunan, Tanah dan Peralatan',
        isActive: true,
        parentId: '0d2ae5b7-f577-4729-8b3a-ebeca074aeef',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // end harta

      // kewajiban dan ekuitas
      {
        id: 'cec24568-0668-44f4-991d-f24e5876e00b',
        code: '20',
        name: 'Kewajiban dan Ekuitas Pemilik',
        isActive: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '02a2adcd-6b46-4e08-94c6-3b908fd79226',
        code: '20.1',
        name: 'Kewajiban',
        isActive: true,
        parentId: 'cec24568-0668-44f4-991d-f24e5876e00b',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '8c1b1383-d45a-4dee-ac0c-54580838dd8d',
        code: '20.1.1',
        name: 'Utang Usaha',
        isActive: true,
        parentId: '02a2adcd-6b46-4e08-94c6-3b908fd79226',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'ffe0883c-1219-4162-b1cc-9f23ada4986d',
        code: '20.1.2',
        name: 'Utang Lainnya',
        isActive: true,
        parentId: '02a2adcd-6b46-4e08-94c6-3b908fd79226',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '0758a20a-e513-494a-98eb-e5700277a863',
        code: '20.2',
        name: 'Ekuitas Pemilik',
        isActive: true,
        parentId: 'cec24568-0668-44f4-991d-f24e5876e00b',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '684fe97e-6680-4a6f-8341-41599f201c83',
        code: '20.2.1',
        name: 'Modal',
        isActive: true,
        parentId: '0758a20a-e513-494a-98eb-e5700277a863',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '20.2.2',
        name: 'Laba Ditahan',
        isActive: true,
        parentId: '0758a20a-e513-494a-98eb-e5700277a863',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // end kewajiban dan ekuitas

      // pendapatan
      {
        id: '97fca8ca-9f1a-4141-b358-acad991bb79a',
        code: '30',
        name: 'Pendapatan',
        isActive: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'adb26504-9fe6-428e-8e56-b228ebd343a9',
        code: '30.1',
        name: 'Pendapatan Usaha',
        isActive: true,
        parentId: '97fca8ca-9f1a-4141-b358-acad991bb79a',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'ca4c14cb-d995-4085-b54a-088ca274c43a',
        code: '30.1.1',
        name: 'Pendapatan Jasa',
        isActive: true,
        parentId: 'adb26504-9fe6-428e-8e56-b228ebd343a9',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '59c97281-20df-43a4-960b-8f6fde097d30',
        code: '30.2',
        name: 'Pendapatan Diluar Usaha',
        isActive: true,
        parentId: '97fca8ca-9f1a-4141-b358-acad991bb79a',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'df89959e-65bf-4717-8119-78da9ebc5910',
        code: '30.2.1',
        name: 'Pendapatan Sewa',
        isActive: true,
        parentId: '59c97281-20df-43a4-960b-8f6fde097d30',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // end pendapatan


      // beban
      {
        id: '2d3c37cc-575c-4e68-bccf-89584392b6a4',
        code: '40',
        name: 'Beban',
        isActive: true,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 'db803197-add6-4db7-a70c-41656d974a8d',
        code: '40.1',
        name: 'Beban Usaha',
        isActive: true,
        parentId: '2d3c37cc-575c-4e68-bccf-89584392b6a4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '40.1.1',
        name: 'Beban Akrual',
        isActive: true,
        parentId: 'db803197-add6-4db7-a70c-41656d974a8d',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '08e5a0a0-2358-4960-87f1-9dfed394dc71',
        code: '40.1.2',
        name: 'Beban Operasional',
        isActive: true,
        parentId: 'db803197-add6-4db7-a70c-41656d974a8d',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '40.1.3',
        name: 'Beban Lainnya',
        isActive: true,
        parentId: 'db803197-add6-4db7-a70c-41656d974a8d',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3b0d271f-d508-46f3-a24f-2adcd0f74ff3',
        code: '40.2',
        name: 'Beban Diluar Usaha',
        isActive: true,
        parentId: '2d3c37cc-575c-4e68-bccf-89584392b6a4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '74d8114e-a13c-4e68-ac49-aa54029c9f53',
        code: '40.2.1',
        name: 'Beban Bank',
        isActive: true,
        parentId: '3b0d271f-d508-46f3-a24f-2adcd0f74ff3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '40.2.2',
        name: 'Beban Pajak',
        isActive: true,
        parentId: '3b0d271f-d508-46f3-a24f-2adcd0f74ff3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // end beban
    ];
    const accounts = [
      {
        id: faker.datatype.uuid(),
        code: '10.1.1.001',
        name: 'Kas',
        groupId: '1dcb7eef-94dd-4842-af2f-e89b63efbe9e',
        isGroup: false,
        posReport: 'Neraca',
        posBalance: 'Debit',
        isCash: true,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '10.1.1.002',
        name: 'Bank BSI',
        groupId: '1dcb7eef-94dd-4842-af2f-e89b63efbe9e',
        isGroup: false,
        posReport: 'Neraca',
        posBalance: 'Debit',
        isCash: true,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '10.1.2.001',
        name: 'Piutang Usaha',
        groupId: '4fa44c36-8204-4e89-8b7e-33a230a0ef21',
        isGroup: false,
        posReport: 'Neraca',
        posBalance: 'Debit',
        isCash: false,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '10.1.3.001',
        name: 'Alat Tulis Kantor',
        groupId: '0351faf5-42b8-43db-95e4-a68efe4a969b',
        isGroup: false,
        posReport: 'Neraca',
        posBalance: 'Debit',
        isCash: false,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '10.2.1.001',
        name: 'Peralatan Kantor',
        groupId: '77ee23d0-84d2-4204-bbac-804101c91794',
        isGroup: false,
        posReport: 'Neraca',
        posBalance: 'Debit',
        isCash: false,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '20.1.1.001',
        name: 'Utang Usaha',
        groupId: '8c1b1383-d45a-4dee-ac0c-54580838dd8d',
        isGroup: false,
        posReport: 'Neraca',
        posBalance: 'Kredit',
        isCash: false,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '20.1.2.001',
        name: 'Utang Gaji',
        groupId: 'ffe0883c-1219-4162-b1cc-9f23ada4986d',
        isGroup: false,
        posReport: 'Neraca',
        posBalance: 'Kredit',
        isCash: false,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '20.1.2.002',
        name: 'Utang Bunga',
        groupId: 'ffe0883c-1219-4162-b1cc-9f23ada4986d',
        isGroup: false,
        posReport: 'Neraca',
        posBalance: 'Kredit',
        isCash: false,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '20.2.1.001',
        name: 'Modal Usaha',
        groupId: '684fe97e-6680-4a6f-8341-41599f201c83',
        isGroup: false,
        posReport: 'Neraca',
        posBalance: 'Kredit',
        isCash: false,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '30.1.1.001',
        name: 'Pendapatan Honorarium',
        groupId: 'ca4c14cb-d995-4085-b54a-088ca274c43a',
        isGroup: false,
        posReport: 'Neraca',
        posBalance: 'Kredit',
        isCash: false,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '30.2.1.001',
        name: 'Sewa Alat',
        groupId: 'df89959e-65bf-4717-8119-78da9ebc5910',
        isGroup: false,
        posReport: 'Neraca',
        posBalance: 'Kredit',
        isCash: false,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '40.1.2.001',
        name: 'Beban Gaji dan Upah',
        groupId: '08e5a0a0-2358-4960-87f1-9dfed394dc71',
        isGroup: false,
        posReport: 'Laba Rugi',
        posBalance: 'Debit',
        isCash: false,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '40.1.2.002',
        name: 'Beban Transportasi',
        groupId: '08e5a0a0-2358-4960-87f1-9dfed394dc71',
        isGroup: false,
        posReport: 'Laba Rugi',
        posBalance: 'Debit',
        isCash: false,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '40.1.2.003',
        name: 'Beban Sewa',
        groupId: '08e5a0a0-2358-4960-87f1-9dfed394dc71',
        isGroup: false,
        posReport: 'Laba Rugi',
        posBalance: 'Debit',
        isCash: false,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '40.2.1.001',
        name: 'Beban Bunga Bank',
        groupId: '74d8114e-a13c-4e68-ac49-aa54029c9f53',
        isGroup: false,
        posReport: 'Laba Rugi',
        posBalance: 'Debit',
        isCash: false,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: faker.datatype.uuid(),
        code: '40.2.1.002',
        name: 'Beban Administrasi Bank',
        groupId: '74d8114e-a13c-4e68-ac49-aa54029c9f53',
        isGroup: false,
        posReport: 'Laba Rugi',
        posBalance: 'Debit',
        isCash: false,
        isActive: true,
        userId: 'bf2be0db-8e26-4beb-9228-166430aa6289',
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ];
    await queryInterface.bulkInsert('Groups', groups);
    await queryInterface.bulkInsert('Accounts', accounts);
  },

  async down () {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
