const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Joi = require("joi");

const Auteur = require("./auteur");

const boekSchema = new Schema({
    titel: {
        type: String,
        required: true,
        maxlength: 100
    },
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
        type: [{
            type: String,
            lowercase: true,
            enum: ["romantisch", "horror", "fantasy"]
        }]
    },
    publicatieDatum: {
        type: Date
    },
    isbn: {
        type: String,
        unique: true,
        trim: true,
        // match: /(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)/,
        validate: {
            validator: function(value) {
                const isbnPuur = value.replace(/-/g, "").trim();
                console.log(isbnPuur);
                
                if (isbnPuur.length === 10 || isbnPuur.length === 13) {
                    return true;
                } else {
                    return false;
                }
            },
            message: "Ongeldig ISBN formaat"
        },
        set: function(val) {
            return val.replace(/-/g, "").trim();
        }
    },
    vertaling: {
        type: Boolean,
        default: false
    },
    taalOrigineel: {
        type: String,
        required: function() {
            return this.vertaling;
        }
    }
}, {
    timestamps: true
});

boekSchema.statics.joiValidate = function(boek) {
    const joiSchema = Joi.object().keys({
        titel: Joi.string().required(),
        auteur: Joi.string().alphanum().length(24),
        aantalPaginas: Joi.number().min(1),
        genres: Joi.array().items(Joi.string().valid(["romantisch", "horror", "fantasy"])),
        publicatieDatum: Joi.date(),
        isbn: Joi.string().regex(/(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)/),
        vertaling: Joi.boolean(),
        taalOrigineel: Joi.string().when('vertaling', {
            is: true,
            then: Joi.string().required()
        })
    });

    return Joi.validate(boek, joiSchema);
}

const Boek = mongoose.model("Boek", boekSchema, "boeken");


module.exports = Boek;