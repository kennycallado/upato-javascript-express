const { EntitySchema } = require('typeorm');
const Post = require('../../app/Models/Post');

module.exports = new EntitySchema({
  name: 'Post',
  target: Post,
  tableName: 'posts',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    title: {
      type: 'varchar',
    },
    content: {
      type: 'text',
    },
    starts: {
      type: 'int',
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: {
        name: 'user_id',
      },
      cascade: true,
    },
  },
});
