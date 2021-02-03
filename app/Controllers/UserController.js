class UserController {
  async index(req, res) {
    return res.json({ message: 'hola' });
  }
}

module.exports = new UserController();