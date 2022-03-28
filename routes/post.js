const router = require('express').Router();
const controller = require('../controllers/post');
const { saveFile } = require('../utils/gallery');
const { validateToken, validateBody, validateParam } = require('../utils/validator');
const { PostSchema, AllSchema } = require('../utils/schema');

router.get('/paginate/:page', [validateParam(AllSchema.page, "page"), controller.paginate]);
router.get('/like/toggle/:id/:page',[validateParam(AllSchema.id,"id"),controller.toggleLike]);
router.get('/bycat/:id', [validateParam(AllSchema.id, 'id'), controller.byCat]);
router.get('/byuser/:id', [validateParam(AllSchema.id, 'id'), controller.byUser]);
router.get('/bytag/:id', [validateParam(AllSchema.id, "id"), controller.byTag]);
router.post('/', [validateToken, saveFile, validateBody(PostSchema.add), controller.add]);


router.route('/:id')
   .get([validateParam(AllSchema.id, "id"), controller.get])
   .patch([validateToken, validateParam(AllSchema.id, "id"), controller.patch])
   .delete([validateToken, validateParam(AllSchema.id, 'id'), controller.drop]);


module.exports = router;