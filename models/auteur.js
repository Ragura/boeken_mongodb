const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi");

const adresSchema = new Schema({
  straat: {
    type: String,
    required: true
  },
  huisnummer: {
    type: Number,
    min: 1,
    required: true
  },
  bus: {
    type: String,
    maxlength: 3
  },
  postcode: {
    type: Number,
    required: true,
    min: 1000,
    max: 9999
  },
  woonplaats: {
    type: String,
    required: true
  },
  land: {
    type: String,
    default: "België"
  }
});

const auteurSchema = new Schema({
  naam: {
    type: String,
    required: true
  },
  adres: {
    type: adresSchema
  }
});

auteurSchema.statics.joiValidate = function(auteur) {
  const joiSchemaAdres = Joi.object().keys({
    straat: Joi.string().required(),
    huisnummer: Joi.number()
      .min(1)
      .required(),
    bus: Joi.string().max(3),
    postcode: Joi.number()
      .min(1000)
      .max(9999)
      .required(),
    woonplaats: Joi.string().required(),
    land: Joi.string().default("België")
  });

  const joiSchema = Joi.object().keys({
    naam: Joi.string().required(),
    adres: joiSchemaAdres
  });

  return Joi.validate(auteur, joiSchema);
};

const Auteur = mongoose.model("Auteur", auteurSchema, "auteurs");

module.exports = Auteur;
