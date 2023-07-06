module.exports = (sequelize, Sequelize) => {
  const Categories = sequelize.define("categories", {
    category_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: Sequelize.STRING
    },
  }, {
    timestamps: false,
  });
  return Categories;
};
