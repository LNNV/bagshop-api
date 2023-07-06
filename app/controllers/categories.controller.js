const db = require("../models");
const Categories = db.categories;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  // const id = req.query.id;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Categories.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.create = async (req, res) => {
  if (!req.body.categories_name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  let checkName = await Categories.findOne({
    where: { category_name: req.body.category_name },
  });
  if (checkName) {
    res.status(400).send({
      message: "Category already exists with name " + req.body.category_name,
    });
    return;
  }

  const category = {
    category_name: req.body.category_name,
  };

  Categories.create(category)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      console.dir(err);
      res.status(500).send({
        message: err,
      });
    });
};

exports.update = async (req, res) => {
  const category_id = req.params.id;
  let checkId = await Categories.findOne({
    where: { category_id: category_id },
  });
  if (!checkId) {
    res.status(404).send({
      message: "Category not found with id " + category_id,
    });
    return;
  }
  let checkName = await Categories.findOne({
    where: {
      category_name: req.body.category_name,
      category_id: { [Op.ne]: category_id },
    },
  });
  if (checkName) {
    res.status(400).send({
      message: "Category already exists with name " + req.body.category_name,
    });
    return;
  }
  const category = {
    category_name: req.body.category_name,
  };
  Categories.update(category, { where: { category_id: category_id } })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          message: "Category was updated successfully.",
        });
      } else {
        res.status(404).send({
          message: `Cannot update Category with id=${category_id}. Maybe Category was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};
