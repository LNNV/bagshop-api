const db = require("../models")
const Carts = db.carts

exports.findAll = (req, res) => {
    Carts.findAll()
      .then(carts => res.json(carts))
      .catch(err => res.status(500).json(err))
}

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const cart = {
        account_id: req.body.account_id,
        cart_cost: req.body.cart_cost,
        cart_status: req.body.cart_status
    }

    Carts.create(cart)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}