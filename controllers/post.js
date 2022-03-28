const DB = require('../models/post');
const CommentDB = require('../models/comment');
const Helper = require('../utils/helper');

const all = async (req, res, next) => {
   let posts = await DB.find();
   Helper.fMsg(res, "All Posts", posts);
}

const add = async (req, res, next) => {
   let userId = req.body.user._id;
   delete req.body.user;
   req.body["user"] = userId;
   let result = await new DB(req.body).save();
   Helper.fMsg(res, "Post Saved", result);
}

const get = async (req, res, next) => {
   // let post = await DB.findById(req.params.id).populate('user tag','-__v -_id -created -password');
   let post = await DB.findById(req.params.id).select('title content');
   let comments = await CommentDB.find({ postId: post._id });
   post = post.toObject();
   post.comments = comments;
   Helper.fMsg(res, "Single Post", post);
}

const patch = async (req, res, next) => {
   let dbPost = await DB.findById(req.params.id);
   if (dbPost) {
      delete req.body.user;
      await DB.findByIdAndUpdate(dbPost._id, req.body);
      let updatePost = await DB.findById(dbPost._id);
      Helper.fMsg(res, "Updated Post", updatePost);
   } else {
      next(new Error("No post with that id!"));
   }
}

const drop = async (req, res, next) => {
   const dbPost = await DB.findById(req.params.id);
   if (dbPost) {
      await DB.findByIdAndDelete(dbPost._id);
      Helper.fMsg(res, "Post Deleted");
   } else {
      next(new Error("No post with that id!"));
   }
}
const byCat = async (req, res, next) => {
   const posts = await DB.find({ cat: req.params.id }).populate('user cat');
   if (posts) {
      Helper.fMsg(res, "All Cat based post", posts);
   } else {
      next(new Error("No post with that cat id!"));
   }
}

const byUser = async (req, res, next) => {
   const posts = await DB.find({ user: req.params.id });
   if (posts) {
      Helper.fMsg(res, "All User based post", posts);
   } else {
      next(new Error("No post with that user id!"));
   }
}

const paginate = async (req, res, next) => {
   let limit = Number(process.env.POST_LIMIT);
   let reqPage = Number(req.params.page);
   let pageNum = reqPage == 1 ? 0 : reqPage - 1;
   let skipCount = pageNum * limit;

   let posts = await DB.find().skip(skipCount).limit(limit);
   Helper.fMsg(res, "Paginated Posts", posts);
}
const byTag = async (req, res, next) => {
   let posts = await DB.find({ tag: req.params.id }).populate('tag user', '-__v -_id -created -email -password');
   Helper.fMsg(res, "Posts By Tag", posts);
}

const toggleLike = async (req, res, next) => {
   let post = await DB.findById(req.params.id);
   if (post) {
      if (req.params.page == 1)
         post.like = post.like + 1;
      else
         post.like = post.like - 1;

      await DB.findByIdAndUpdate(post._id, post);
      let result = await DB.findById(req.params.id);
      Helper.fMsg(res, "Like Added", result);
   } else {
      next(new Error("No post with that id"));
   }
}




module.exports = {
   all,
   add,
   get,
   patch,
   drop,
   byCat,
   byUser,
   paginate,
   byTag,
   toggleLike

}