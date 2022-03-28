const DB = require('../models/tag');
const Helper = require('../utils/helper');

const all = async (req, res, next) => {
   let tags = await DB.find();
   Helper.fMsg(res, "All Tags", tags);
}

const get = async (req, res, next) => {
   let dbTag = await DB.findById(req.params.id);
   if (dbTag) {
      Helper.fMsg(res, "Sing Tag", dbTag);
   } else {
      next(new Error("No tag with that id"));
   }
}

const add = async (req, res, next) => {
   const dbTag = await DB.findOne({ name: req.body.name });
   if (dbTag) {
      next(new Error("Tag name is already in use"));
   } else {
      let result = await new DB(req.body).save();
      Helper.fMsg(res, "Tag Added", result);
   }
}

const patch = async (req, res, next) => {
   let dbTag = await DB.findById(req.params.id);
   if (dbTag) {
      await DB.findByIdAndUpdate(dbTag._id, req.body);
      let result = await DB.findById(req.params.id);
      Helper.fMsg(res, "Tag Upadated", result);
   } else {
      next(new Error("No tag with that id"));
   }
}
const drop = async (req, res, next) => {
   let dbTag = await DB.findById(req.params.id);
   if (dbTag) {
      await DB.findByIdAndDelete(dbTag._id);
      Helper.fMsg(res, "Tag Deleted");
   } else {
      next(new Error("No tag with that id"));
   }
}

module.exports = {
   all,
   get,
   add,
   patch,
   drop
}
