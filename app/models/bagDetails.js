module.exports = (sequelize, Sequelize) => {
    const BagDetails = sequelize.define("bag_details", {
        bag_detail_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        bag_id: {
            type: Sequelize.INTEGER
        },
        color_id: {
            type: Sequelize.INTEGER
        },
        unit_price: {
            type: Sequelize.DECIMAL(10, 2)
        },
        quantity_left: {
            type: Sequelize.INTEGER
        },
        img: {
            type: Sequelize.TEXT
        }
    }, {
        timestamps: false
    })
    return BagDetails
}