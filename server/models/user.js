/*
  User model
*/
import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10);

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Role',
        key: 'id',
        as: 'roleId'
      }
    },
  }, {
    classMethods: {   
      associate(models) {
        User.belongsTo(models.Role, {
          foreignKey: 'roleId'
        });
        User.hasMany(models.Document, {
          as: 'documents',
          foreignKey: 'userId'
        });
      }
    },
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hashSync(user.password, salt);
      },
      beforeUpdate(user) {
        user.password = bcrypt.hashSync(user.password, salt);
      }
    }
  });
  return User;
};
