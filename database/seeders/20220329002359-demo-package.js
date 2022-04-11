'use strict';
const { faker } = require('@faker-js/faker');

module.exports = {
  // eslint-disable-next-line no-unused-vars
  async up (queryInterface, Sequelize) {
    let category = [];
      for (let index = 0; index < 20; index++) {
        category.push({
          id: faker.datatype.uuid(),
          name: faker.name.title(),
          icon: 'flaticon-driver',
          color: faker.random.arrayElement(['red', 'yellow']),
          createdAt: new Date(),
          updatedAt: new Date()
        });
    }
    let packages = [];
    for (let index = 0; index < 20; index++) {
      packages.push({
        id: faker.datatype.uuid(),
        name: faker.address.city(),
        slug: faker.lorem.slug(4),
        destinationId: faker.random.arrayElement(['1036e7d5-1901-46fd-9097-0a525344d076', '3417ac67-3461-4a13-9b4f-259b1e0853b6', '78659d53-2790-4814-9f89-08fd5e07eccb', '4056a48d-a2e8-4179-a568-ef9f22d476f8']),
        noOfDay: faker.random.arrayElement([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
        description: faker.lorem.lines(5),
        isFeatured: faker.random.arrayElement([true, false]),
        banner: 'https://apilangitnusantara.herokuapp.com/images/package/banner-1648262647133.jpg',
        categoryId: category[index].id,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    let services = [];
      for (let index = 0; index < 20; index++) {
        services.push({
          id: faker.datatype.uuid(),
          name: faker.name.findName(),
          createdAt: new Date(),
          updatedAt: new Date()
        });
    }
    let packageService = [];
    for (let index = 1; index < 20; index++) {
      packageService.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        serviceId: services[index].id,
        type: faker.random.arrayElement(['inc', 'exc']),
        description: faker.lorem.lines(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageService.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        serviceId: services[index].id,
        type: faker.random.arrayElement(['inc', 'exc']),
        description: faker.lorem.lines(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageService.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        serviceId: services[index].id,
        type: faker.random.arrayElement(['inc', 'exc']),
        description: faker.lorem.lines(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageService.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        serviceId: services[index].id,
        type: faker.random.arrayElement(['inc', 'exc']),
        description: faker.lorem.lines(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageService.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        serviceId: services[index].id,
        type: faker.random.arrayElement(['inc', 'exc']),
        description: faker.lorem.lines(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageService.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        serviceId: services[index].id,
        type: faker.random.arrayElement(['inc', 'exc']),
        description: faker.lorem.lines(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageService.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        serviceId: services[index].id,
        type: faker.random.arrayElement(['inc', 'exc']),
        description: faker.lorem.lines(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageService.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        serviceId: services[index].id,
        type: faker.random.arrayElement(['inc', 'exc']),
        description: faker.lorem.lines(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageService.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        serviceId: services[index].id,
        type: faker.random.arrayElement(['inc', 'exc']),
        description: faker.lorem.lines(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageService.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        serviceId: services[index].id,
        type: faker.random.arrayElement(['inc', 'exc']),
        description: faker.lorem.lines(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageService.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        serviceId: services[index].id,
        type: faker.random.arrayElement(['inc', 'exc']),
        description: faker.lorem.lines(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageService.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        serviceId: services[index].id,
        type: faker.random.arrayElement(['inc', 'exc']),
        description: faker.lorem.lines(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageService.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        serviceId: services[index].id,
        type: faker.random.arrayElement(['inc', 'exc']),
        description: faker.lorem.lines(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageService.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        serviceId: services[index].id,
        type: faker.random.arrayElement(['inc', 'exc']),
        description: faker.lorem.lines(3),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    let packageItenerary = [];
    for (let index = 1; index < 15; index++) {
      packageItenerary.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        day: faker.random.arrayElement([1, 2, 3, 4, 5]),
        title: faker.name.title(),
        meta: faker.lorem.lines(3),
        description: faker.lorem.lines(8),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageItenerary.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        day: faker.random.arrayElement([1, 2, 3, 4, 5]),
        title: faker.name.title(),
        meta: faker.lorem.lines(3),
        description: faker.lorem.lines(8),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageItenerary.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        day: faker.random.arrayElement([1, 2, 3, 4, 5]),
        title: faker.name.title(),
        meta: faker.lorem.lines(3),
        description: faker.lorem.lines(8),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    let packagePrice = [];
    for (let index = 1; index < 15; index++) {
      packagePrice.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        description: faker.random.arrayElement(['1-2 Pax', '3-5 Pax', '6-10 Pax']),
        price: faker.finance.amount(1000, 100000, 0),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packagePrice.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        description: faker.random.arrayElement(['1-2 Pax', '3-5 Pax', '6-10 Pax']),
        price: faker.finance.amount(1000, 100000, 0),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    let packageReview = [];
    for (let index = 1; index < 15; index++) {
      packageReview.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        name: faker.name.findName(),
        email: faker.internet.email(),
        rating: faker.random.arrayElement([4, 5]),
        message: faker.lorem.lines(5),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageReview.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        name: faker.name.findName(),
        email: faker.internet.email(),
        rating: faker.random.arrayElement([4, 5]),
        message: faker.lorem.lines(5),
        createdAt: new Date(),
        updatedAt: new Date()
      });
      packageReview.push({
        id: faker.datatype.uuid(),
        packageId: packages[index].id,
        name: faker.name.findName(),
        email: faker.internet.email(),
        rating: faker.random.arrayElement([4, 5]),
        message: faker.lorem.lines(5),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Categories', category);
    await queryInterface.bulkInsert('Services', services);
    await queryInterface.bulkInsert('Packages', packages);
    await queryInterface.bulkInsert('PackageServices', packageService);
    await queryInterface.bulkInsert('Itineraries', packageItenerary);
    await queryInterface.bulkInsert('PackagePrices', packagePrice);
    await queryInterface.bulkInsert('Reviews', packageReview);
  },

  // eslint-disable-next-line no-unused-vars
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
