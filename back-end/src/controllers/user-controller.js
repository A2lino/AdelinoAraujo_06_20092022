"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user-model");
/**
 * This function create a new user in mongo db
 * It uses the email as unique identifier
 * It hashes the password with bcrypt
 * @param req
 * @param res
 * @param next
 */
exports.signup = (req, res, next) => {
    // we hash the password
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    // we create the new User for mongodb
    const user = new User({
        email: req.body.email,
        password: hashedPassword,
    });
    // we save the user in mongodb
    user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur enregistré" }))
        .catch((error) => res.status(400).json(error));
};
/**
 * This function check if a user can login
 * It check the email and the password of the user
 * @param req
 * @param res
 * @param next
 */
exports.login = (req, res, next) => {
    // we search for user email in mongodb
    User.findOne({ email: req.body.email }).then((user) => {
        if (!user)
            return res.status(401).json({ error: "Utilisateur inconnu" });
        bcrypt
            .compare(req.body.password, user.password)
            .then((valid) => {
            if (!valid)
                return res.status(401).json({ error: "Mot de passe incorrect" });
            res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, process.env.random_secret_key, {
                    // TODO replace the random secret key
                    expiresIn: "24h",
                }),
            });
        })
            .catch((error) => res.status(500).json({ error }));
    });
};
//# sourceMappingURL=user-controller.js.map