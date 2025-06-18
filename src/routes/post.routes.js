const express = require('express');
const router = express.Router();
const {
  createPost,
  getPublishedPosts,
  getPostStatus,
  updatePost,
  deletePost
} = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');

// All routes below require authentication
router.use(authMiddleware);

// @route   POST /api/posts
router.post('/', createPost);

// @route   GET /api/posts/published
router.get('/published', getPublishedPosts);

// @route   GET /api/posts/:id/status
router.get('/:id/status', getPostStatus);

// @route   PUT /api/posts/:id
router.put('/:id', updatePost);

// @route   DELETE /api/posts/:id
router.delete('/:id', deletePost);

module.exports = router;
