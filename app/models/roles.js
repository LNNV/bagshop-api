module.exports = (sequelize, Sequelize) => {
    const Roles = sequelize.define("roles", {
        role_id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        role_name: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    })
    return Roles
}