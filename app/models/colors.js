module.exports = (sequelize, Sequelize) => {
    const Colors = sequelize.define("colors", {
        color_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        color_name: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    })
    return Colors
}