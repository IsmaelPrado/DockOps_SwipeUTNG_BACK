// models/Match.js
module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    matched_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  // Relación con la tabla de usuarios
  Match.associate = (models) => {
    Match.belongsTo(models.User, { foreignKey: 'user_id' });
    Match.belongsTo(models.User, { foreignKey: 'matched_user_id' });
  };

  return Match;
};
