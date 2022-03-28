const router = require('express').Router();
const controller = require('../controllers/cat');
const { validateBody, validateParam, validateToken } = require('../utils/validator');
const { CatSchema, AllSchema } = require('../utils/schema');
const { saveFile } = require("../utils/gallery");

router.get('/', controller.all);
router.post('/', [validateToken, saveFile, validateBody(CatSchema), controller.add]);

router.route('/:id')
   .get(validateParam(AllSchema.id, "id"), controller.get)
   .patch(validateToken, validateParam(AllSchema.id, "id"), controller.patch)
   .delete(validateToken, validateParam(AllSchema.id, "id"), controller.drop)

module.exports = router;