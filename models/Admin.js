const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    nickname: {type: String, required: true},
    password: {type: String, required: true}
});

module.exports = mongoose.model("Admin", schema);