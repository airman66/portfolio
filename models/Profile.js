const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    icon: {type: String, required: true},
    link: {type: String, required: true},
    prompt: {type: String, required: true}
});

module.exports = mongoose.model("Profile", schema);