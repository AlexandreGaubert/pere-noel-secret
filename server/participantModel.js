var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var participantSchema = new Schema({
  name: String,
  exclude: [String],
  pickedBy: String,
  wasPicked: Boolean,
  hasPicked: Boolean,
  gender: String,
  picked: String
});

module.exports = mongoose.model("participant", participantSchema);
