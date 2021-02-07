// Librerías requeridas
const { getRepository } = require('typeorm');

// Módulos de la aplicación requeridos
const Post = require('../Models/Post');
const User = require('../Models/User');
const Comment = require('../Models/Comment');

class PostController {
  async index(req, res) {
    let posts = await getRepository(Post).find();

    for (const post of posts) {
      const user = await getRepository(User).findOne(post.user);

      // post.user = user;
      post.user = { username: user.username, email: user.email };
    }

    return res.json(posts);
  }

  async show(req, res) {
    // Obtiene el post
    let post = await getRepository(Post).findOne(req.params.id);
    // Obtiene el user
    const user = await getRepository(User).findOne(post.user);
    // Obtiene los comentarios
    const comments = await getRepository(Comment).find({ post });

    // asigna los datos en el objeto.
    post.comments = comments;
    post.user = user;

    return res.json(post);
  }

  async store(req, res) {
    // Usuario debería venir de auth...
    // si no existe debe fallar la petición
    const user = await getRepository(User).findOne(1);
    const { title, content } = req.body;

    if (title && content) {
      let post = new Post(title, content);
      post.user = user;
      const postCreated = await getRepository(Post).save(post);

      return res.json(postCreated);
    } else {
      return res.json({ message: 'Error, faltan datos' });
    }
  }
  async update(req, res) {
    const post = await getRepository(Post).findOne(req.params.id);

    if (post) {
      const postUpdated = getRepository(Post).merge(post, req.body);

      await getRepository(Post).manager.save(postUpdated);

      return res.json(postUpdated);
    } else return res.json({ message: 'Error, post not found' });
  }

  async destroy(req, res) {
    const post = await getRepository(Post).findOne(req.params.id);

    if (post) {
      await getRepository(Post).delete(post.id);

      return res.json(post);
    } else return res.status(404).json({ message: 'Error, post not found' });
  }

  async sendStart(req, res) {
    let post = await getRepository(Post).findOne(req.params.id);
    const user = await getRepository(User).findOne(post.user);

    if (post.starts == 0) post.starts = 1;
    else post.starts++;

    await getRepository(Post).manager.save(post);

    post.user = { username: user.username, email: user.email };

    return res.json(post);
  }
}

module.exports = new PostController();
