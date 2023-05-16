"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
// security packages
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean");
const helmet = require("helmet");
// we define a rate limit
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: "Too many requests from this IP !",
});
// we use the dotenv configuration
dotenv.config();
// we create an express application
const app = express();
// we import the routes
const sauceRoutes = require("./routes/sauce-routes");
const userRoutes = require("./routes/user-routes");
// we connect the mongodb
mongoose
    .connect(`mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@cluster0.tnrtt.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Connexion mongodb réussie"))
    .catch(() => console.log("Connexion mongodb échec"));
// we use our middlewares
app.use(limiter);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.use(helmet({
    crossOriginResourcePolicy: false,
}));
app.use(xss());
app.use("/images", express.static(path.join(__dirname, "../images")));
app.use(express.json());
// we use our routes
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);
module.exports = app;
//# sourceMappingURL=app.js.map