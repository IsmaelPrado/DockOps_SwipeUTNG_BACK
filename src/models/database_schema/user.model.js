module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    career: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    photos: {
  type: DataTypes.JSON,
  allowNull: false,
  defaultValue: []
}

  }, {
    tableName: 'users',
    timestamps: false // porque ya defines tú mismo created_at
  });

  User.associate = (models) => {
    User.hasMany(models.Swipe, { foreignKey: 'swiper_id', as: 'swipesMade' });
    User.hasMany(models.Swipe, { foreignKey: 'swiped_id', as: 'swipesReceived' });
  };

  return User;
};