const db = require("../models")
const Colors = db.colors
const Op = db.Sequelize.Op

exports.findAll = (req, res) => {
    Colors.findAll()
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err
            })
        })
}

exports.create = async (req, res) => {
    if (!req.body.color_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    let checkName = await Colors.findOne({where: {color_name: req.body.color_name}})
    if (checkName) {
        res.status(400).send({
            message: "Color already exists with name " + req.body.color_name
        })
        return
    }

    const color = {
        color_name: req.body.color_name
    }

    Colors.create(color)
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err
            })
        })
}

exports.update = async (req, res) => {
    const color_id = req.params.id
    let checkId = await Colors.findOne({where: {color_id: color_id}})
    if (!checkId) {
        res.status(404).send({
            message: "Color not found with id " + color_id
        })
        return
    }
    let checkName = await Colors.findOne({where: {color_name: req.body.color_name, color_id: {[Op.ne]: color_id}}})
    if (checkName) {
        res.status(400).send({
            message: "Color already exists with name " + req.body.color_name
        })
        return
    }
    const color = {
        color_name: req.body.color_name
    }
    Colors.update(color, {where: {color_id: color_id}})
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Color was updated successfully."
                })
            } else {
                res.status(500).send({
                    message: `Cannot update Color with id=${color_id}. Maybe Color was not found or req.body is empty!`
                })
            }
        })
        .catch(err => {res.status(500).send({message: err})})
}