const {roleRequireAdmin} = require("../helper/roleRequired")

module.exports = app => {
    const brands = require("../controllers/brands.controller")
    var router = require("express").Router()

    router.get("/", brands.findAll)
    router.post("/", roleRequireAdmin, brands.create)
    router.put("/:id", roleRequireAdmin, brands.update)

    app.use("/api/brands", router)
}