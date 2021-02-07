const { getRepository } = require('typeorm');

const Comment = require('../Models/Comment');

class CommentController {
  async index(req, res) {
    const comments = await getRepository('Comment').find();

    return res.json(comments);
  }
  async show(req, res) {
    const comment = await getRepository('Comment').findOne(req.params.id);

    if (comment) return res.json(comment);
    else return res.json({ message: 'Error, comment id not foud' });
  }
  async store(req, res) {
    const { content } = req.body;

    if (content) {
      const comment = new Comment(content);
      const commentCreated = await getRepository('Comment').save(comment);

      return res.json(commentCreated);
    } else return res.json({ message: 'Error, faltan datos' });
  }
  async update(req, res) {
    const { content } = req.body;
    const comment = await getRepository('Comment').findOne(req.params.id);

    if (content && comment) {
      const commentUpdated = getRepository('Comment').merge(comment, req.body);

      await getRepository('Comment').manager.save(commentUpdated);

      return res.json(commentUpdated);
    } else return res.json({ message: 'Error, id o contenido no ingresado' });
  }
  async destroy(req, res) {}

  async sendLike(req, res) {
    let comment = new Comment();
    comment = await getRepository('Comment').findOne(req.params.id);

    comment.sendLike();

    await getRepository('Comment').manager.save(comment);

    return res.json({ message: comment.likes });
  }
}

module.exports = new CommentController();
