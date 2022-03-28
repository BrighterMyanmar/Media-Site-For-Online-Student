const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
   user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
   cat: { type: Schema.Types.ObjectId, required: true, ref: 'cat' },
   tag: { type: Schema.Types.ObjectId, required: true, ref: 'tag' },
   like: { type: Number, default: 0 },
   image: { type: String, required: true },
   title: { type: String, required: true },
   content: { type: String, required: true },
   created: { type: Date, default: Date.now }
});

const Post = mongoose.model("post", PostSchema);
module.exports = Post;
