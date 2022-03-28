const req = require("express/lib/request");
const jwt = require('jsonwebtoken');

module.exports = {
   validateBody: (schema) => {
      return (req, res, next) => {
         let result = schema.validate(req.body);
         if (result.error)
            next(new Error(result.error.details[0].message));
         else
            next();
      }
   },
   validateParam: (schema, name) => { // id , page 
      return (req, res, next) => {
         let obj = {};
         obj[`${name}`] = req.params[`${name}`];
         let result = schema.validate(obj);
         if (result.error)
            next(new Error(result.error.details[0].message));
         else
            next();
      }
   },
   validateToken: (req, res, next) => {
      if (req.headers.authorization) {
         let token = req.headers.authorization.split(" ")[1];
         let decoded = jwt.decode(token, process.env.SECRET_KEY);
         if (decoded) {
            req.body["user"] = decoded;
            next();
         } else {
            next(new Error("Tokenization Error"));
         }
      } else {
         next(new Error("Tokenization Error"));
      }
   }
}