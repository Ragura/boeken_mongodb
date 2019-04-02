const logger = require("./logger");
// Errors tijdens REQUEST PIPELINE (request tot response) opvangen

module.exports = (err, req, res, next) => {
    if (err.name === "ValidationError") {        
        res.status(400).send(err._message);
    }

    // Ongeldige JSON notatie (fout in body-parser)
    if (err.type === "entity.parse.failed") {
        res.status(400).send("Ongeldig JSON formaat");
    }
    
    res.status(500).send(err);
};