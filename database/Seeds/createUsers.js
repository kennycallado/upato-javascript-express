const User = require('../../app/Models/User')

class CreateUsers {
  async run(factory, connection) {
    await factory(User)().createMany(10);
  }
}

module.exports = CreateUsers;
