module.exports = app => {
    const auth = require("../controllers/auth.controller")
    var router = require("express").Router()

    router.post("/login", auth.login)
    router.post("/signup", auth.signup)

    app.use("/api", router)
}