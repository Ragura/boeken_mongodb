const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Auteur = require("./auteur");

const boekSchema = new Schema({
    titel: {
        type: String,
        required: true
    },
    // auteur: {
    //     type: String,
    //     required: true
    // },
    auteur: {
        type: Schema.Types.ObjectId,
        ref: Auteur
    },
    aantalPaginas: {
        type: Number,
        default: 1,
        min: 1
    },
    genres: {
        type: [String],
        lowercase: true,
        enum: ["romantisch", "horror", "fantasy"]
    }
}, {
    timestamps: true
});

const Boek = mongoose.model("Boek", boekSchema, "boeken");

module.exports = Boek;