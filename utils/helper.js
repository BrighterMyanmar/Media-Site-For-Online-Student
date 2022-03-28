const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const fMsg = (res, msg = "Success", result = []) => {
   res.status(200).json({
      con: true,
      msg,
      result
   })
}

module.exports = {
   fMsg,
   encode: password => bcrypt.hashSync(password),
   comparePass: (plain, hash) => bcrypt.compareSync(plain, hash),
   makeToken: payload => jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" })
}