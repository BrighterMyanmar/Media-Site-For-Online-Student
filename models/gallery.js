const mongoose = require('mongoose');
const { Schema } = mongoose;

const GallerySchema = new Schema({
   name: { type: String, require: true },
   created: { type: Date, default: Date.now }
});

let Gallery = mongoose.model("gallery", GallerySchema);
module.exports = Gallery;