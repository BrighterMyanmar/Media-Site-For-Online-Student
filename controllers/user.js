const Helper = require('../utils/helper');
const DB = require('../models/user');

const login = async (req, res, next) => {
   let dbUser = await DB.findOne({ phone: req.body.phone }).select('-__v');
   if (dbUser) {
      if (Helper.comparePass(req.body.password, dbUser.password)) {
         let user = dbUser.toObject();
         delete user.password;
         user.token = Helper.makeToken(user);
         Helper.fMsg(res, "Login Success", user);
      } else {
         next(new Error("Creditial Error"));
      }
   } else {
      next(new Error("Creditial Error"));
   }
}

const register = async (req, res, next) => {
   let phoneUser = await DB.findOne({ phone: req.body.phone });
   if (phoneUser) {
      next(new Error("Phone number is already in use"));
      return;
   }
   let nameUser = await DB.findOne({ name: req.body.name });
   if (nameUser) {
      next(new Error("Name is already in use"));
      return;
   }
   let emailUser = await DB.findOne({ email: req.body.email });
   if (emailUser) {
      next(new Error("Email is already in use"));
      return;
   }
   req.body.password = Helper.encode(req.body.password);
   let result = await new DB(req.body).save();
   Helper.fMsg(res, "Register Succes", result);

}

module.exports = {
   login,
   register
}