// models/database_schema/message.model.js
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    match_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    timestamp: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    tableName: 'messages',
    timestamps: false,
  });

  Message.associate = (models) => {
    Message.belongsTo(models.Match, { foreignKey: 'match_id', as: 'match' });
    Message.belongsTo(models.User, { foreignKey: 'sender_id', as: 'sender' });
  };

  return Message;
};
