const fs = require('fs');

const saveFile = async (req, res, next) => {
   const file = req.files.file;
   let filename = new Date().valueOf() + "_" + file.name;
   file.mv(`./uploads/${filename}`);
   req.body["image"] = filename;
   next();
}

const saveFiles = async (req, res, next) => {
   const filenames = [];
   const files = req.files.files;
   files.forEach((file) => {
      let filename = new Date().valueOf() + "_" + file.name;
      filenames.push(filename);
      file.mv(`./uploads/${filename}`);
   });
   req.body["images"] = filenames.join();
   next();
}

const deleteFile = async (filename) => {
   fs.unlinkSync(`./uploads/${filename}`)
}

module.exports = {
   saveFile,
   saveFiles,
   deleteFile
}