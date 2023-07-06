module.exports = app => {
    const roles = require("../controllers/roles.controller")
    var router = require("express").Router()

    router.get("/", roles.findAll)

    app.use("/api/roles", router)
}