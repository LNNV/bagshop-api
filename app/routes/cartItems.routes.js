const {roleRequireCustomer} = require("../helper/roleRequired")

module.exports = app => {
    const cartItems = require("../controllers/cartItems.controller")
    var router = require("express").Router()

    router.get("/", cartItems.findAll)
    router.post("/", cartItems.create)
    router.get("/present", roleRequireCustomer, cartItems.findAllCartItemsOfPresentUserCart)

    app.use("/api/cartItems", router)
}