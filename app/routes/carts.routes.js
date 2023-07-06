module.exports = app => {
    const carts = require("../controllers/carts.controller")
    var router = require("express").Router()

    router.get("/", carts.findAll)
    router.post("/", carts.create)

    app.use("/api/carts", router)
}