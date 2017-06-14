module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    label: {
      type: DataTypes.ENUM('admin', 'author'),
      defaultValue: 'author'
    }
  }, {
    classMethods: {
      associate(models) {
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
          as: 'users'
        });
      }
    }
  });
  return Role;
};
