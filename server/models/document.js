
module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT
    },
    docType: {
      type: DataTypes.STRING
    },
    access: {
      type: DataTypes.ENUM('private', 'public', 'role'),
      defaultValue: 'public'
    }
  }, {
    classMethods: {
      associate(models) {
        Document.belongsTo(models.User, {
          foreignKey: 'userId'
        });
      }
    }
  });
  return Document;
};
