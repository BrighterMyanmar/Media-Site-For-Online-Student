const router = require('express').Router();
const controller = require('../controllers/tag');
const { validateBody, validateParam, validateToken } = require('../utils/validator')
const { TagSchema, AllSchema } = require('../utils/schema');
const { saveFile } = require('../utils/gallery');

router.get('/', controller.all);
router.post('/', [validateToken, saveFile, validateBody(TagSchema), controller.add]);


router.route('/:id')
   .get(validateParam(AllSchema.id, "id"), controller.get)
   .patch(validateToken, validateParam(AllSchema.id, "id"), controller.patch)
   .delete(validateToken, validateParam(AllSchema.id, "id"), controller.drop)

module.exports = router;
