// Librerías requeridas
const { getRepository, getConnection } = require('typeorm');

// Módulos de la aplicación requeridos
const User = require('../Models/User');

class UserController {
  async index(req, res) {
    const users = await getRepository('User').find();

    return res.json(users);
  }

  async show(req, res) {
    const user = await getRepository('User').findOne(req.params.id);

    return res.json(user);
  }

  async store(req, res) {
    const { username, email, password } = req.body;

    const user = new User(username, email, password);
    const userCreated = await getRepository('User').save(user);

    return res.json(userCreated);
  }

  async update(req, res) {
    const user = await getRepository('User').findOne(req.params.id);

    if (user) {
      const { username, email, password } = req.body;

      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = password;

      const userUpdated = await getRepository('User').manager.save(user);

      return res.json(userUpdated);
    }

    return res.status(404).json({ message: 'Error, usuario no existente.' });
  }

  async destroy(req, res) {
    const user = await getRepository('User').findOne(req.params.id);

    if (user) {
      await getRepository('User').delete(user.id);

      return res.json(user);
    }

    return res.status(404).json({ message: 'Error, usuario no existe.' });
  }
}

module.exports = new UserController();
