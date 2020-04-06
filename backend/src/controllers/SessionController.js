const conn = require('../database/conn');
const KnexController = require('./KnexController');

module.exports = {
  create(req, res) {
    const { email, password } = req.body;

    conn('users')
      .where({ email, password })
      .select('*')
      .first()
      .then(data => {
        if (!data) {
          res.status(401).json({ error: 'As credenciais informadas são inválidas.' });
        }

        else {
          res.json(data);
        }
      });
  }
};