"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
/**
 * This function check if the user who send the request is authorized
 * It compares
 * @param req
 * @param res
 * @param next
 */
module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization === undefined) {
            return;
        }
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.random_secret_key);
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw "Invalid user ID";
        }
        else {
            next();
        }
    }
    catch (_a) {
        res.status(401).json({
            error: new Error("Invalid request!"),
        });
    }
};
//# sourceMappingURL=authorize.js.map