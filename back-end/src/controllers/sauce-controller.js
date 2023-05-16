"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const Sauce = require("../models/sauce-model");
/**
 * This function returns an array of all sauces from mongo db
 * @param req
 * @param res
 * @param next
 */
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then((allSauces) => res.status(200).json(allSauces))
        .catch((error) => res.status(400).json({ error }));
};
/**
 * This function returns a sauce by id
 * @param req
 * @param res
 * @param next
 */
exports.getSingleSauce = (req, res, next) => {
    const sauceId = req.params.id;
    Sauce.findById(sauceId)
        .then((singleSauce) => res.status(200).json(singleSauce))
        .catch((error) => res.status(400).json({ error }));
};
/**
 * This function create a new store in mongo db
 * @param req
 * @param res
 * @param next
 */
exports.createSauce = (req, res, next) => {
    const sauce = JSON.parse(req.body.sauce);
    delete sauce._id;
    const newSauce = new Sauce(Object.assign(Object.assign({}, sauce), { imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}` }));
    newSauce
        .save()
        .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
        .catch((error) => res.status(400).json({ error }));
};
/**
 * This function update a sauce by id
 * @param req
 * @param res
 * @param next
 */
exports.updateSauce = (req, res) => {
    const sauceToUpdate = req.file ? Object.assign(Object.assign({}, JSON.parse(req.body.sauce)), { imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` }) : Object.assign({}, req.body);
    Sauce.updateOne({ _id: req.params.id }, Object.assign(Object.assign({}, sauceToUpdate), { _id: req.params.id }))
        .then(res.status(200).json({ message: "Sauce modifiée" }))
        .catch((error) => res.status(400).json({ error }));
};
/**
 * This function delete a sauce by id
 * @param req
 * @param res
 * @param next
 */
exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
        const filename = sauce.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
            Sauce.deleteOne({ _id: req.params.id })
                .then(() => res.status(200).json({ message: "Sauce supprimée !" }))
                .catch((error) => res.status(400).json({ error }));
        });
    })
        .catch((error) => res.status(500).json({ error }));
};
/**
 * This function handle user likes
 * @param req
 * @param res
 * @param next
 */
exports.likeSauce = (req, res, next) => {
    const sauceId = req.params.id;
    const userId = req.body.userId;
    const like = req.body.like;
    if (like === 0) {
        const sauce = Sauce.findById(sauceId);
        sauce
            .then((sauce) => {
            if (sauce.usersLiked.includes(userId)) {
                sauce.likes -= 1;
                sauce.usersLiked.pull(userId);
                sauce.save();
            }
            if (sauce.usersDisliked.includes(userId)) {
                sauce.dislikes -= 1;
                sauce.usersDisliked.pull(userId);
                sauce.save();
            }
        })
            .then(() => res.status(200).json({ message: "Like annulé" }))
            .catch((error) => res.status(400).json({ error }));
    }
    if (like === 1) {
        Sauce.findOneAndUpdate({ _id: sauceId }, { $inc: { likes: 1 }, $push: { usersLiked: userId } }, { new: true })
            .then(() => res.status(200).json({ message: "Sauce liké" }))
            .catch((error) => res.status(400).json({ error }));
    }
    if (like === -1) {
        Sauce.findOneAndUpdate({ _id: sauceId }, { $inc: { dislikes: 1 }, $push: { usersDisliked: userId } }, { new: true })
            .then(() => res.status(200).json({ message: "Sauce disliké" }))
            .catch((error) => res.status(400).json({ error }));
    }
};
//# sourceMappingURL=sauce-controller.js.map