'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Teachers', 
    [
      {
        fullname: 'paijo',
        email: 'paijo@mail.com',
        phone: 34234,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullname: 'sarijem',
        email: 'sarijem@mail.com',
        phone: 1234,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullname: 'herman',
        email: 'herman@mail.com',
        phone: 12342,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Teachers', null, {})
  }
};
