const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Entity
db.categories = require("./categories.js")(sequelize, Sequelize);
db.brands = require("./brands.js")(sequelize, Sequelize);
db.colors = require("./colors.js")(sequelize, Sequelize);
db.roles = require("./roles.js")(sequelize,Sequelize);
db.bags = require("./bags.js")(sequelize,Sequelize);
db.accounts = require("./accounts.js")(sequelize, Sequelize);
db.bagDetails = require("./bagDetails.js")(sequelize,Sequelize);
db.carts = require("./carts.js")(sequelize,Sequelize);
db.cartItems = require("./cartItems.js")(sequelize, Sequelize);
db.orders = require("./orders.js")(sequelize, Sequelize);

//foreign keys bag(brand, category)
db.brands.hasMany(db.bags, { foreignKey: 'brand_id' })
db.categories.hasMany(db.bags, { foreignKey: 'category_id' })
db.bags.belongsTo(db.brands, { foreignKey: 'brand_id' })
db.bags.belongsTo(db.categories, { foreignKey: 'category_id' })

//foreign keys account(role)
db.roles.hasMany(db.accounts, { foreignKey: 'role_id' })
db.accounts.belongsTo(db.roles, { foreignKey: 'role_id' })

//foreign keys bagDetails(bag, color)
db.bags.hasMany(db.bagDetails, { foreignKey: 'bag_id' })
db.colors.hasMany(db.bagDetails, { foreignKey: 'color_id' })
db.bagDetails.belongsTo(db.bags, { foreignKey: 'bag_id' })
db.bagDetails.belongsTo(db.colors, { foreignKey: 'color_id' })

//foreign keys cart(account)
db.accounts.hasMany(db.carts, { foreignKey: 'account_id' })
db.carts.belongsTo(db.accounts, { foreignKey: 'account_id' })

//foreign keys cartItems(cart, bagDetails)
db.carts.hasMany(db.cartItems, { foreignKey: 'cart_id' })
db.bagDetails.hasMany(db.cartItems, { foreignKey: 'bag_detail_id' })
db.cartItems.belongsTo(db.carts, { foreignKey: 'cart_id' })
db.cartItems.belongsTo(db.bagDetails, { foreignKey: 'bag_detail_id' })

//foreign keys order(cart)
db.carts.hasOne(db.orders, { foreignKey: 'cart_id' })
db.orders.belongsTo(db.carts, { foreignKey: 'cart_id' })



module.exports = db;
