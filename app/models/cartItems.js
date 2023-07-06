module.exports = (sequelize, Sequelize) => {
    const CartItems = sequelize.define("cart_items", {
        cart_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        bag_detail_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        added_date: {
            type: Sequelize.DATEONLY
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        amount: {
            type: Sequelize.DECIMAL(10,2)
        }
    }, {
        timestamps: false
    })
    return CartItems
}