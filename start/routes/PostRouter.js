const { Router } = require('express');
const router = new Router();

const PostController = require('../../app/Controllers/PostController');

router.get('/', PostController.index);
router.get('/:id', PostController.show);
router.post('/', PostController.store);
router.put('/:id', PostController.update);
router.delete('/:id', PostController.destroy);

router.get('/:id/sendstart', PostController.sendStart);

module.exports = router;
