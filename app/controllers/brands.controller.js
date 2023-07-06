const db = require("../models");
const Brands = db.brands;
const Op = db.Sequelize.Op;

exports.findAll = (req, res) => {
  Brands.findAll()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.create = async (req, res) => {
  if (!req.body.brand_name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  let checkBrandName = await Brands.findOne({where: {brand_name: req.body.brand_name}})
    if (checkBrandName) {
        res.status(400).send({
            message: "Brand already exists with name " + req.body.brand_name,
        });
        return
    }
  const brand = {
    brand_name: req.body.brand_name,
  };

  Brands.create(brand)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err,
      });
    });
};

exports.update = async (req, res) => {
    const brand_id = req.params.id
    let checkBrandId = await Brands.findOne({where: {brand_id: brand_id}})
    if (!checkBrandId) {
        res.status(404).send({
            message: "Brand not found with id " + brand_id,
        });
        return
    }
    let checkBrandName = await Brands.findOne({where: {brand_name: req.body.brand_name, brand_id: {[Op.ne]: brand_id}}})
    if (checkBrandName) {
        res.status(400).send({
            message: "Brand already exists with name " + req.body.brand_name,
        });
        return
    }
    const brand = {
        brand_name: req.body.brand_name,
    };
    Brands.update(brand, {where: {brand_id: brand_id}})
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Brand was updated successfully.",
                });
            } else {
                res.status(404).send({
                    message: `Cannot update Brand with id=${brand_id}. Maybe Brand was not found or req.body is empty!`,
                });
            }
        })
        .catch(err => {res.status(500).send(err)})
}
