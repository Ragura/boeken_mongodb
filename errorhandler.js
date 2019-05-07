// const logger = require("./logger");
// Errors tijdens REQUEST PIPELINE (request tot response) opvangen

module.exports = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    return res.status(400).send({ error: err.message });
  }

  // Ongeldige JSON notatie (fout in body-parser)
  if (err.type === "entity.parse.failed") {
    return res.status(400).send({ error: "Ongeldig JSON formaat" });
  }

  // Ongeldig ObjectID
  if (err.name === "CastError") {
    return res.status(400).send({ error: err.message });
  }

  return res.status(500).send({ error: err });
};
