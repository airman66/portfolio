const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    about: {type: String, required: true},
    copyright: {type: String, required: true},
    resume: {type: String, required: true},
    name: {type: String, required: true},
    profession: {type: String, required: true},
    email: {type: String, required: true},
    photo: {type: String, required: true}
});

module.exports = mongoose.model("OtherData", schema);