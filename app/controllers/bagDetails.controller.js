const db = require("../models")
const BagDetails = db.bagDetails

exports.findAll = (req, res) => {
    BagDetails.findAll()
      .then(data => {
            res.status(200).json(data)
        })
      .catch(err => {
            res.status(500).json(err)
        })
}

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const bagDetail = {
        bag_id: req.body.bag_id,
        color_id: req.body.color_id,
        unit_price: req.body.unit_price,
        quantity_left: req.body.quantity_left,
        img: req.body.img
    }

    BagDetails.create(bagDetail)
        .then(data => {
                res.status(200).json(data)
            })
        .catch(err => { res.status(500).json(err) })
}

exports.update = async (req, res) => {
    const {bag_id, color_id} = req.params
    let checkBagDetail = await BagDetails.findOne({where: {color_id: color_id, bag_id: bag_id}})
    if (!checkBagDetail) {
        res.status(404).send({
            message: "Bag detail not found"
        })
        return
    }
    const bagDetail = {
        unit_price: req.body.unit_price,
        quantity_left: req.body.quantity_left,
        img: req.body.img
    }

    BagDetails.update(bagDetail, {where: {color_id: color_id, bag_id: bag_id}})
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Bag detail updated successfully!"
                })
            } else {
                res.status(500).send({
                    message: `Cannot update bag detail with id=${bag_id}`
                })
            }
        })
        .catch(err => { res.status(500).send({message: err}) })
}