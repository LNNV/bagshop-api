const {roleRequireAdmin} = require("../helper/roleRequired")

module.exports = app => {
    const categories = require("../controllers/categories.controller");
    var router = require("express").Router();

    router.get("/", categories.findAll);
    router.post("/", roleRequireAdmin, categories.create);
    router.put("/:id", roleRequireAdmin, categories.update);

    app.use('/api/categories', router);
  };