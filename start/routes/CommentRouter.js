const { Router } = require('express');
const router = new Router();

const CommentController = require('../../app/Controllers/CommentController');

router.get('/', CommentController.index);
router.get('/:id', CommentController.show);
router.get('/:id/sendlike', CommentController.sendLike);
router.post('/', CommentController.store);
router.put('/:id', CommentController.update);
router.delete('/:id', CommentController.destroy);

module.exports = router;
