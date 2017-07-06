module.exports = {
  up(queryInterface) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Roles', [{
        roleType: role_type,
        createdAt: new Date(),
        updatedAt: new Date()
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
      return queryInterface.bulkDelete('Roles', null, {});
    */
    return queryInterface.bulkDelete('Roles', null, {});
  }
};
