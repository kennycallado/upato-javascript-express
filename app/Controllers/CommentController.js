const { getRepository } = require('typeorm');

const Comment = require('../Models/Comment');
const User = require('../Models/User');
const Post = require('../Models/Post');

class CommentController {
  async index(req, res) {
    const comments = await getRepository(Comment).find();

    for (const comment of comments) {
      const post = await getRepository(Post).findOne(comment.post);
      const user = await getRepository(User).findOne(comment.user);

      comment.post = { title: post.title };
      comment.user = { username: user.username, email: user.email };
    }

    return res.json(comments);
  }
  async show(req, res) {
    const comment = await getRepository(Comment).findOne(req.params.id);

    if (comment) return res.json(comment);
    else return res.json({ message: 'Error, comment id not foud' });
  }
  async store(req, res) {
    // Usuario debería venir de auth
    // Post debería venir de params
    const user = await getRepository(User).findOne(1);
    const post = await getRepository(Post).findOne(1);
    const { content } = req.body;

    if (content) {
      let comment = new Comment(content);
      comment.user = user;
      comment.post = post;
      const commentCreated = await getRepository(Comment).save(comment);

      return res.json(commentCreated);
    } else return res.json({ message: 'Error, faltan datos' });
  }
  async update(req, res) {
    const { content } = req.body;
    const comment = await getRepository(Comment).findOne(req.params.id);

    if (content && comment) {
      const commentUpdated = getRepository(Comment).merge(comment, req.body);

      await getRepository(Comment).manager.save(commentUpdated);

      return res.json(commentUpdated);
    } else return res.json({ message: 'Error, id o contenido no ingresado' });
  }
  async destroy(req, res) {
    const comment = await getRepository(Comment).findOne(req.params.id);

    if (comment) {
      await getRepository(Comment).delete(comment);

      return res.json(comment);
    } else return res.json({ message: 'Error, no existe el comentario.' });
  }

  async sendLike(req, res) {
    let comment = new Comment();
    comment = await getRepository(Comment).findOne(req.params.id);

    comment.sendLike();

    await getRepository(Comment).manager.save(comment);

    return res.json({ message: comment.likes });
  }
}

module.exports = new CommentController();
