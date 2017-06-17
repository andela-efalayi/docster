
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    slug: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      set(value) {
        this.setDataValue('slug', value.replace(/[" "]/g, '-'));
      }
    },
    content: {
      type: DataTypes.TEXT
    },
    access: {
      type: DataTypes.ENUM('private', 'public', 'role'),
      defaultValue: 'public'
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  }, {
    classMethods: {
      associate(models) {
        Document.belongsTo(models.User, {
          as: 'owner'
        });
      }
    }
  });
  return Document;
};
