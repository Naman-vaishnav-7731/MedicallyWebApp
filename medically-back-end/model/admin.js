module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define(
    "admin",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      admin_name: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      admin_email: {
        type: DataTypes.STRING,
        allowNull: false,
        isEmail: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
    }
  );

  return admin;
};
