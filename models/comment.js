const mongoose = require('mongoose')
const { Schema } = mongoose;

const CommentSchema = new Schema({
   postId: { type: Schema.Types.ObjectId, required: true, ref: "post" },
   name: { type: String, required: true },
   email: { type: String, required: true },
   content: { type: String, required: true },
   created: { type: Date, default: Date.now }
});

const Comment = mongoose.model('comment', CommentSchema);
module.exports = Comment;
