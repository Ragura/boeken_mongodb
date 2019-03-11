const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const auteurSchema = new Schema({
    naam: {
        type: String,
        required: true
    },
});

const Auteur = mongoose.model("Auteur", auteurSchema, "auteurs");

module.exports = Auteur;