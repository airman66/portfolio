const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    image: {type: String, required: true},
    name: {type: String, required: true},
    year: {type: Number, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true, default: "website"},
    workHeading: {type: String, required: true},
    link: {type: String, required: true},
    previewImage: {type: String, required: true}
});

module.exports = mongoose.model("Work", schema);