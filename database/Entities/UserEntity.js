const { EntitySchema } = require('typeorm');
const User = require('../../app/Models/User');

module.exports = new EntitySchema({
  name: 'User',
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
    create_at: {
      createDate: true,
    },
    update_at: {
      createDate: true,
    }
  },
});
