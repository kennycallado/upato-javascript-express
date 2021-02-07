// Librerías requeridas
const { getRepository } = require('typeorm');

// Módulos de la aplicación requeridos
const Post = require('../Models/Post');

class PostController {
  async index(req, res) {
    const posts = await getRepository(Post).find();

    return res.json(posts);
  }
  async show(req, res) {
    const post = await getRepository(Post).findOne(req.params.id);

    return res.json(post);
  }
  async store(req, res) {
    const { title, content } = req.body;

    if (title && content) {
      const post = new Post(title, content);
      const postCreated = await getRepository(Post).save(post);

      return res.json(postCreated);
    } else {
      return res.json({ message: 'Error, faltan datos' });
    }
  }
  async update(req, res) {
    const post = await getRepository('Post').findOne(req.params.id);

    if (post) {
      const postUpdated = getRepository('Post').merge(post, req.body);

      await getRepository('Post').manager.save(postUpdated);

      return res.json(postUpdated);
    } else return res.json({ message: 'Error, post not found' });
  }
  async destroy(req, res) {
    const post = await getRepository('Post').findOne(req.params.id);

    if (post) {
      await getRepository('Post').delete(post.id);
  
      return res.json(post);
    } else return res.status(404).json({ message: 'Error, post not found' });
  }

  async sendStart(req, res) {
    const post = await getRepository(Post).findOne(req.params.id);

    if (post.starts == 0) post.starts = 1;
    else post.starts++;

    await getRepository(Post).manager.save(post);

    return res.json(post);
  }
}

module.exports = new PostController();
