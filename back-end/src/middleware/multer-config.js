"use strict";
const multer = require("multer");
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpeg",
    "image/png": "png",
};
/**
 * This is the storage configuration for multer
 */
const storage = multer.diskStorage({
    /**
     * This function tells multer to store images in images folder
     * @param req
     * @param file
     * @param callback
     */
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    /**
     * This function tells multer to
     *  - use the original filename,
     *  - to replace spaces by underscores,
     *  - to add the date to the filename
     *  - to use MIME TYPES to resolve extension
     *
     * @param req
     * @param file
     * @param callback
     */
    filename: (req, file, callback) => {
        // TODO fix extension redundancy
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + "." + extension);
    },
});
/**
 * We set the storage configuration and tell that we deal only with images
 */
module.exports = multer({ storage }).single("image");
//# sourceMappingURL=multer-config.js.map