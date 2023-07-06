const db = require("../models")
const Accounts = db.accounts
const jwt = require('jsonwebtoken')
const Op = db.Sequelize.Op
const passwordCryptor = require("../helper/passwordCryptor")


exports.login = async (req, res) => {
    const { usernameOrEmail, pass } = req.body
    const user = await Accounts.findOne({where: {[Op.or]: [{username: usernameOrEmail}, {email: usernameOrEmail}]}})
    if (!user) {
        res.status(401).json({ message: "Invalid credentials" })
        return
    }
    if (!passwordCryptor.compare(pass, user.pass)) {
        res.status(401).json({ message: "Invalid password credentials" })
        return
    }
    console.dir(process.env.JWT_PRIVATE_KEY)
    const accessToken = jwt.sign({
          account_id: user.account_id,
          email: user.email,
          role_id: user.role_id
        },
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: '72h' }
    )
    res.status(200).json({ access_token: accessToken })
}

exports.signup = async (req, res) => {
    const {username, pass, email, phone_number} = req.body
    if (!username || !pass || !email || !phone_number) {
        res.status(401).json({ message: "Invalid credentials" })
        return
    }
    let checkUsername = await Accounts.findOne({where: {username: username}})
    if (checkUsername) {
        res.status(401).json({ message: "Username already exists" })
        return
    }
    let checkEmail = await Accounts.findOne({where: {email: email}})
    if (checkEmail) {
        res.status(401).json({ message: "Email already used" })
        return
    }
    let checkPhoneNumber = await Accounts.findOne({where: {phone_number: phone_number}})
    if (checkPhoneNumber) {
        res.status(401).json({ message: "Phone number already used" })
        return
    }
    const newAccount = {
        username: username,
        pass: passwordCryptor.encrypt(pass),
        email: email,
        phone_number: phone_number,
        role_id: 2,
        account_status: "Đang hoạt động"
    }
    Accounts.create(newAccount)
        .then(data => {res.status(200).send(data)})
        .catch(err => {res.status(500).send(err)})
}