const db = require("../models")
const Orders = db.orders

exports.findAll = (req, res) => {
    Orders.findAll()
      .then(orders => res.json(orders))
      .catch(err => res.status(500).json(err))
}

exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    const order = {
        cart_id: req.body.cart_id,
        shipping_address: req.body.shipping_address,
        total_cost: req.body.total_cost
    }
 
    Orders.create(order)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}