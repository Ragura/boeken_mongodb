const _ = require("lodash");

// Do not save properties with value equal to null

module.exports = function(schema, options) {
  schema.pre("save", function(next) {
    for (const field of Object.keys(this._doc)) {
      if (this._doc[field] === null) {
        console.log("Nu");

        delete this._doc[field];
      }
    }
    next();
  });
};
