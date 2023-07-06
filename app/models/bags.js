module.exports = (sequelize, Sequelize) => {
    const Bags = sequelize.define("bags", {
        bag_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bag_name: {
            type: Sequelize.STRING
        },
        category_id: {
            type: Sequelize.INTEGER
        },
        brand_id: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps:false
    })
    return Bags
}