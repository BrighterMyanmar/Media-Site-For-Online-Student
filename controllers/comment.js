const DB = require('../models/comment');
const Helper = require('../utils/helper');

const all = async (req, res, next) => {
   let comments = await DB.find({ postId: req.params.id });
   Helper.fMsg(res, "Comments for a post", comments);
}

const add = async (req, res, next) => {
   let result = await new DB(req.body).save();
   Helper.fMsg(res, "Comment Added", result);
}

const drop = async (req, res, next) => {
   let dbComment = await DB.findById(req.params.id);
   if (dbComment) {
      await DB.findByIdAndDelete(dbComment._id);
      Helper.fMsg(res, "Comment Deleted");
   } else {
      next(new Error("No comment with that id"));
   }
}

module.exports = {
   all,
   add,
   drop
}