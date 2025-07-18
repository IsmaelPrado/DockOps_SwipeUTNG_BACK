module.exports = (sequelize, DataTypes) => {
  const Swipe = sequelize.define('Swipe', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    swiper_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    swiped_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    is_like: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'swipes',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['swiper_id', 'swiped_id']
      }
    ]
  });

  Swipe.associate = (models) => {
    Swipe.belongsTo(models.User, { foreignKey: 'swiper_id', as: 'swiper' });
    Swipe.belongsTo(models.User, { foreignKey: 'swiped_id', as: 'swiped' });
  };

  return Swipe;
};
