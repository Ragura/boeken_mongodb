const logger = require("./logger");
// Errors tijdens REQUEST PIPELINE (request tot response) opvangen

module.exports = (err, req, res, next) => {   
    if (err.name === "ValidationError") {        
        res.status(400).send(err._message);
    }
    next(err);
};