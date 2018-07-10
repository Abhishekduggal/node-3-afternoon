const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
require("dotenv").config();

const port = 3000;
const app = express();

// Middleware
const checkForSession = require("./middlewares/checkForSession");

// Controllers
const swag = require("../server/controllers/swag_controller");
const auth = require("../server/controllers/auth_controller");
const cart_controller = require("../server/controllers/cart_controller");
const search_controller = require("../server/controllers/search_controller");

app.use(bodyParser.json());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
  })
);

app.use(checkForSession);
// Build for production // Deployment
app.use(express.static(`${__dirname}/build`));

// Swag Controler
app.get("/api/swag", swag.read);

//Authorization for user
app.post("/api/login", auth.login);
app.post("/api/register", auth.register);
app.post("/api/signout", auth.signout);
app.get("/api/user", auth.getUser);

//Cart Controller
app.post("/api/cart", cart_controller.add);
app.post("/api/cart/checkout", cart_controller.checkout);
app.delete("/api/cart", cart_controller.delete);

//Search Category
app.get("/api/search", search_controller.search);

app.listen(port, () => {
  console.log(`Node 3 Afternoon Server is up on port: ${port}`);
});
