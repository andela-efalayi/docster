
module.exports = (sequelize, DataTypes) => {
  const document = sequelize.define('document', {
    title: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      }
    }
  });
  return document;
};
