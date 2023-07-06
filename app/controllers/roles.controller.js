const db = require("../models")
const Roles = db.roles

exports.findAll = (req, res) => {
    Roles.findAll()
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(500).send({
                message: err
            })
        })
}