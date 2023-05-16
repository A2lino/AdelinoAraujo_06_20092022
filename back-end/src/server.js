"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const normalizePort_1 = __importDefault(require("./utils/normalizePort"));
const dotenv_1 = __importDefault(require("dotenv"));
const http = require("http");
const app = require("./app");
// we use the dotenv configuration
dotenv_1.default.config();
// we normalize the port
const port = (0, normalizePort_1.default)(process.env.PORT || 3000);
// we set the application port
app.set("port", port);
// the node server will use our express application
const server = http.createServer(app);
// we start listening on port
server.listen(port);
//# sourceMappingURL=server.js.map