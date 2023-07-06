const db = require("../models")
const Accounts = db.accounts
const Op = db.Sequelize.Op

exports.findAll = (req, res) => {
    Accounts.findAll()
      .then(accounts => res.json(accounts))
      .catch(err => res.status(500).json(err))
}

exports.create = (req, res) => { 
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        })
    }
    const account = {
        username: req.body.username,
        pass: req.body.pass,
        email: req.body.email,
        phone_number: req.body.phone_number,
        role_id: req.body.role_id,
        account_status: req.body.account_status
    }
    Accounts.create(account)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
}

exports.updateByUser = async (req, res) => {
    if (!req.user) {
        res.status(400).send({
            message: "User is not logged in!"
        })
    }
    const account_id = req.user.account_id
    const {username, email, phone_number} = req.body
    if (!username || !email || !phone_number) {
        res.status(401).json({ message: "Invalid credentials" })
        return
    }
    let checkUsername = await Accounts.findOne({where: {username: username, account_id: {[Op.ne]: account_id}} })
    if (checkUsername) {
        res.status(401).json({ message: "Username already exists" })
        return
    }
    let checkEmail = await Accounts.findOne({where: {email: email, account_id: {[Op.ne]: account_id}}})
    if (checkEmail) {
        res.status(401).json({ message: "Email already used" })
        return
    }
    let checkPhoneNumber = await Accounts.findOne({where: {phone_number: phone_number, account_id: {[Op.ne]: account_id}}})
    if (checkPhoneNumber) {
        res.status(401).json({ message: "Phone number already used" })
        return
    }
    const newAccount = {
        username: username,
        email: email,
        phone_number: phone_number,
    }

    Accounts.update(newAccount, { where: { account_id: account_id } })
        .then(num => {
            if (num == 1) {
                res.status(200).send({
                    message: "Account updated successfully!"
                })
            } else {
                res.status(404).send({
                    message: `Cannot update account with id=${account_id}. Maybe account was not found!`
                })
            }
        })
        .catch(err => { res.status(500).send({ message: err }) })

}