const generateUniqueId = require('../../utils/generateUniqueId');
const connection = require('../../database/connection');
const Mail = require('./MailController');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },

  async store(request, response) {
    const { name, email, whatsapp, city, uf } = request.body;

    const id = generateUniqueId();

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    Mail.Send({
      id,
      name,
      email,
    });

    return response.json({ id });
  },
};
