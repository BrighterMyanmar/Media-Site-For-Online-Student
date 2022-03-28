const router = require('express').Router();
const DB = require('../models/gallery');
const Helper = require('../utils/helper');
const { saveFile, saveFiles, deleteFile } = require('../utils/gallery');

router.post('/', saveFiles, (req, res, next) => {
   let filenames = req.body.images; // 1647173926515_ads.jpg , 1647173926517_aside1.png , 1647173926517_aside2.png
   let images = filenames.split(",");
   images.forEach(async (image) => {
      await new DB({ name: image }).save();
   });
   Helper.fMsg(res, "Image Uploaded!");
});
router.get('/', async (req, res, next) => {
   let images = await DB.find();
   Helper.fMsg(res, "images", images);
})
router.delete('/:name', async (req, res, next) => {
   let image = req.params.name;
   let dbImage = await DB.findOne({ name: image });
   if (dbImage) {
      await DB.findByIdAndDelete(dbImage._id);
      await deleteFile(dbImage.name); 
      Helper.fMsg(res, "Imaeg Deleted");
   } else {
      next(new Error("No file with that name"));
   }
})

module.exports = router;