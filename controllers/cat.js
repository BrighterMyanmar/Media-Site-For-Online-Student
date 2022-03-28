const DB = require('../models/cat');
const Helper = require('../utils/helper');

const all = async (req, res, next) => {
   let cats = await DB.find();
   Helper.fMsg(res, "All Categories", cats);
}

const add = async (req, res, next) => {
   let dbCat = await DB.findOne({ name: req.body.name });
   if (dbCat) {
      next(new Error("Category name is already in use"));
      return;
   }
   let result = await new DB(req.body).save();
   Helper.fMsg(res, "Category Saved", result);
}

const get = async (req, res, next) => {
   let result = await DB.findById(req.params.id);
   if (result) {
      Helper.fMsg(res, "Sing Category", result);
   } else {
      next(new Error("No category with that id"));
   }
}

const patch = async (req, res, next) => {
   let dbCat = await DB.findById(req.params.id);
   if (dbCat) {
      await DB.findByIdAndUpdate(dbCat._id, req.body);
      let result = await DB.findById(dbCat._id);
      Helper.fMsg(res, "Updated Category", result);
   } else {
      next(new Error("No category with that id"));
   }
}
const drop = async (req, res, next) => {
   let dbCat = await DB.findById(req.params.id);
   if (dbCat) {
      await DB.findByIdAndDelete(dbCat._id);
      Helper.fMsg(res, "Category Dropped");
   } else {
      next(new Error("No category with that id"));
   }
}

module.exports = {
   all,
   add,
   get,
   patch,
   drop
}