const conn = require('../database/conn');
const KnexController = require('./KnexController');

module.exports = {
  insert(req, res) {
    const { title, description, value } = req.body;
    const user_id = req.headers['user-id'];

    conn('incidents').insert({ title, description, value, user_id })
      .then(data => res.json({ id: data[0] }))
      .catch(e => KnexController.catch(res, e));
  },

  async select (req, res) {
    const { page = 1 } = req.query;

    const [count] = await conn('incidents').count();

    const incidents = await conn('incidents')
      .join('users', 'users.id', '=', 'incidents.user_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['incidents.*', 'users.email', 'users.name', 'users.whatsapp', 'users.city', 'users.uf']);

    res.header('X-Total-Count', count['count(*)']);
    
    return res.json(incidents);
  },

  delete(req, res) {
    const { id } = req.params;
    const user_id = req.headers['user-id'];

    conn('incidents').where('id', id).select('user_id').first().then(data => {
      if (!data) {
        res.status(401).json({
          error: `Nenhum incidente encontrado com o ID ${id}.`
        });
      }

      else if (data.user_id != user_id) {
        res.status(401).json({
          error: `Seu usuário não tem permissão para remover o incidente ID ${id}.`
        });
      }

      else {
        conn('incidents').where('id', id).delete().then(data => res.status(204).send());
      }
    });
  }
};