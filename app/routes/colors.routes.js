const {roleRequireAdmin} = require("../helper/roleRequired")

module.exports = app => {
    const colors = require("../controllers/colors.controller")
    var router = require("express").Router()

    router.get("/", roleRequireAdmin, colors.findAll)
    router.post("/", roleRequireAdmin, colors.create)
    router.put("/:id", roleRequireAdmin, colors.update)

    app.use("/api/colors", router)
}