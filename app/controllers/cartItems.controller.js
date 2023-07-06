const { where } = require("sequelize")
const db = require("../models")
const CartItems = db.cartItems
const Carts = db.carts
const Op = db.Sequelize.Op

exports.findAll = (req, res) => {
    CartItems.findAll()
      .then(cartItems => res.json(cartItems))
      .catch(err => res.status(500).json(err))
}
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }

    const item = {
        cart_id: req.body.cart_id,
        bag_detail_id: req.body.bag_detail_id,
        quantity: req.body.quantity,
        amount: req.body.amount
    }
    CartItems.create(item)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

exports.findAllCartItemsOfPresentUserCart = async (req, res) => {
    if (!req.user) {
        res.status(400).send({
            message: "User is not logged in!"
        })
    }
    const account_id = req.user.account_id
    const cart = await Carts.findOne({where: {account_id: account_id, cart_status: "Đang chờ"}})
    await CartItems.findAll({where: {cart_id: cart.cart_id}})
        .then(data => { res.json(data) })
        .catch(err => res.status(500).json(err))
}