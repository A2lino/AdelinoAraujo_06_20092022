"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This function returns a valid port
 * @param value
 */
function normalizePort(value) {
    const port = parseInt(value.toString(), 10);
    if (isNaN(port))
        return value;
    if (port >= 0)
        return port;
    return false;
}
exports.default = normalizePort;
//# sourceMappingURL=normalizePort.js.map