module.exports = {
  up(queryInterface) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Roles', [
      {
        roleType: 'administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleType: 'member',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleType: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        roleType: 'viewer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down(queryInterface) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
