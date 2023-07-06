module.exports = (sequelize, Sequelize) => {
    const Brands = sequelize.define("brands", {
        brand_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        brand_name: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });
    return Brands;
};