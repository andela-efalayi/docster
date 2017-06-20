module.exports = {
  up(queryInterface) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        fullName: name_of_user,
        userName: username_of_user,
        email: email_of_user,
        password: password_of_user,
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    */

    return queryInterface.bulkInsert('Users', [{
      fullName: 'Esther Falayi',
      userName: '@estherfalayi',
      email: 'admin@docster.com',
      password: 'admin123@docster',
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down(queryInterface) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', null, {});
  }
};
