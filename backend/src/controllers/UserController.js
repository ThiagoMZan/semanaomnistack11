const conn = require('../database/conn');
const KnexController = require('./KnexController');

module.exports = {
  insert(req, res) {
    const { email, password, name, whatsapp, city, uf } = req.body;

    conn('users').insert({ email, password, name, whatsapp, city, uf })
      .then(data => res.json({ id: data[0] }))
      .catch(e => KnexController.catch(res, e));
  },

  select(req, res) {
    conn('users')
      .select('*')
      .then(data => res.json(data));
  },

  selectIncidents(req, res) {
    const user_id = req.headers['user-id'];

    conn('incidents')
      .where('user_id', user_id)
      .select('*')
      .then(data => res.json(data));
  }
};