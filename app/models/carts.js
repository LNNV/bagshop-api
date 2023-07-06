module.exports = (sequelize, Sequelize) => {
    const Carts = sequelize.define("carts", {
        cart_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        account_id: {
            type: Sequelize.INTEGER
        },
        cart_cost: {
            type: Sequelize.DECIMAL(10, 2)
        },
        cart_status: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    })
    return Carts
}