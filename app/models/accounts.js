module.exports = (sequelize, Sequelize) => {
    const Accounts = sequelize.define("accounts", {
        account_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING
        },
        pass: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING
        },
        role_id:{
            type: Sequelize.INTEGER
        },
        account_status: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    })
    return Accounts
}