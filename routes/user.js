const router = require('express').Router();
const controller = require('../controllers/user');
const { validateBody } = require('../utils/validator');
const { UserSchema } = require('../utils/schema');

router.post('/', [validateBody(UserSchema.Login), controller.login]);
router.post('/register', [validateBody(UserSchema.Register), controller.register]);


module.exports = router;
