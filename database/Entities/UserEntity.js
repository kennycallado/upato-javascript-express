const { EntitySchema } = require('typeorm');
const User = require('../../app/Models/User');

module.exports = new EntitySchema({
  name: 'Post',
  target: User,
  tableName: 'users',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    username: {
      type: 'varchar',
    },
    email: {
      type: 'varchar',
    },
    password: {
      type: 'varchar',
    },
  },
});
