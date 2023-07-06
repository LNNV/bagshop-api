const express = require("express");
require('dotenv').config()
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// require("./app/routes/turorial.routes")(app);
require("./app/routes/categories.routes")(app);
require("./app/routes/brands.routes")(app);
require("./app/routes/colors.routes")(app);
require("./app/routes/bags.routes")(app);
require("./app/routes/roles.routes")(app);
require("./app/routes/accounts.routes")(app);
require("./app/routes/bagDetails.routes")(app);
require("./app/routes/carts.routes")(app);
require("./app/routes/cartItems.routes")(app);
require("./app/routes/orders.routes")(app);
require("./app/routes/auth.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
