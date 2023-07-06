const {roleRequireAdmin} = require("../helper/roleRequired")
const {roleRequireCustomer} = require("../helper/roleRequired")

module.exports = app => {
    const accounts = require("../controllers/accounts.controller")
    var router = require("express").Router()

    router.get("/", roleRequireAdmin, accounts.findAll)
    router.post("/", accounts.create)
    router.post("/user-update", roleRequireCustomer, accounts.updateByUser)

    app.use("/api/accounts", router)
}