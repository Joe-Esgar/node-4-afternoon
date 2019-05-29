require("dotenv").config();
const express = require("express");
const session = require("express-session");
const checkForSession = require(".//khajittHasMiddlewares/checkForSession");
const swagController = require("./controllers/swagController");
const authController = require("./controllers/authControllers");
const cartController = require("./controllers/cartController");
const searchController = require("./controllers/searchController");

const app = express();

const { read } = swagController;
const { register, login, signout, getUser } = authController;
const { add, remove, checkout } = cartController;
const { search } = searchController;

const { SERVER_PORT, SESSION_SECRET } = process.env;

app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSession);
app.use(express.static(`${__dirname}/../build`));

app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/signout", signout);
app.get("/api/user", getUser);
app.get("/api/swag", read);
app.post("/api/cart/checkout", checkout);
app.post("/api/cart/:id", add);
app.delete("/api/cart/:id", remove);
app.get("/api/search", search);

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT}.`);
});
