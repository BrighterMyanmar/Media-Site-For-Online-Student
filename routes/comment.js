const router = require('express').Router();
const controller = require('../controllers/comment');
const { validateParam, validateBody, validateToken } = require('../utils/validator');
const { AllSchema, CommentSchema } = require('../utils/schema');

router.get('/:id', [validateParam(AllSchema.id, "id"), controller.all]);
router.post('/', [validateBody(CommentSchema), controller.add]);

router.delete("/:id", [validateToken, validateParam(AllSchema.id, "id"), controller.drop]);

module.exports = router;