const {roleRequireAdmin} = require("../helper/roleRequired")

module.exports = app => {
    const bags = require("../controllers/bags.controller")
    var router = require("express").Router()

    router.get("/", bags.findAll)
    router.post("/", roleRequireAdmin, bags.create)
    router.put("/:id", roleRequireAdmin, bags.update)

    app.use("/api/bags", router)
}