const logger = require("./logger");
// Errors tijdens REQUEST PIPELINE (request tot response) opvangen

module.exports = (err, req, res, next) => {
    if (err.name === "ValidationError") {        
        return res.status(400).send(err._message);
    }

    // Ongeldige JSON notatie (fout in body-parser)
    if (err.type === "entity.parse.failed") {
        return res.status(400).send("Ongeldig JSON formaat");
    }
    
    return res.status(500).send(err);
};