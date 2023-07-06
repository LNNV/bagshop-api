module.exports = (sequelize, Sequelize) => {
    const Orders = sequelize.define("orders", {
        order_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_id: {
            type: Sequelize.INTEGER
        },
        created_date: {
            type: Sequelize.DATEONLY
        },
        shipping_address: {
            type: Sequelize.STRING
        },
        total_cost: {
            type: Sequelize.DECIMAL(10,2)
        }
    }, {
        timestamps: false
    })
    return Orders
}