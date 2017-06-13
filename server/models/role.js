module.exports = (sequelize, DataTypes) => {
  const role = sequelize.define('role', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return role;
};
