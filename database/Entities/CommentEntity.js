const { EntitySchema } = require('typeorm');
const Comment = require('../../app/Models/Comment');

module.exports = new EntitySchema({
  name: 'Comment',
  target: Comment,
  tableName: 'comments',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    content: {
      type: 'varchar',
    },
    likes: {
      type: 'int',
    },
  },
  relations: {
    post: {
      target: 'Post',
      type: 'many-to-one',
      joinColumn: {
        name: 'post_id',
      },
      cascade: true,
    },
    user: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: {
        name: 'user_id',
      },
    },
  },
});
