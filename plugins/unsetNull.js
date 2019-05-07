const _ = require("lodash");

// Unset properties with value null when updating with findOneAndUpdate()

module.exports = function(schema, options) {
  schema.pre("findOneAndUpdate", function() {
    const $unset = this._update["$unset"] || {};

    for (const field of Object.keys(this._update)) {
      if (this._update[field] === undefined || this._update[field] === null) {
        delete this._update[field];
        $unset[field] = 1;
      }
    }

    if (!_.isEmpty($unset)) {
      this._update["$unset"] = $unset;
    }
  });
};
