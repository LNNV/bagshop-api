const {roleRequireAdmin} = require("../helper/roleRequired")

module.exports = app => {
    const bagDetails = require("../controllers/bagDetails.controller")
    var router = require("express").Router();

    router.get("/", bagDetails.findAll)
    router.post("/", roleRequireAdmin, bagDetails.create)
    router.put("/:bag_id/:color_id", roleRequireAdmin, bagDetails.update)

    app.use('/api/bag-details', router)
}