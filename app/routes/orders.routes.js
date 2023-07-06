const {roleRequireAdmin} = require("../helper/roleRequired")

module.exports = app => {
    const orders = require("../controllers/orders.controller")
    var router = require("express").Router()

    router.get("/", roleRequireAdmin, orders.findAll)
    router.post("/", orders.create)

    app.use('/api/orders', router)
}