const Post = require('../models/Post');
const { postQueue } = require('../config/bull');

// Create and schedule a post
exports.createPost = async (req, res) => {
  try {
    const { content, scheduledTime, recurrence } = req.body;

    const post = await Post.create({
      content,
      scheduledTime,
      recurrence,
      user: req.user.id
    });

    // Enqueue the post
    await postQueue.add({ postId: post._id }, { delay: new Date(scheduledTime) - new Date() });

    res.status(201).json({ message: 'Post scheduled successfully', post });
  } catch (err) {
    res.status(500).json({ message: 'Post scheduling failed', error: err.message });
  }
};

// Get all published posts
exports.getPublishedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ status: 'published' }).sort({ publishedAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch posts', error: err.message });
  }
};

// Get post status
exports.getPostStatus = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.user.toString() !== req.user.id)
      return res.status(404).json({ message: 'Post not found' });

    res.status(200).json({ status: post.status });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch post status', error: err.message });
  }
};

// Update a scheduled post
exports.updatePost = async (req, res) => {
  try {
    const { content, scheduledTime, recurrence } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post || post.user.toString() !== req.user.id)
      return res.status(404).json({ message: 'Post not found' });

    if (post.status !== 'scheduled')
      return res.status(400).json({ message: 'Cannot update published/failed post' });

    post.content = content || post.content;
    post.scheduledTime = scheduledTime || post.scheduledTime;
    post.recurrence = recurrence || post.recurrence;

    await post.save();

    // Requeue the updated post
    await postQueue.add({ postId: post._id }, { delay: new Date(post.scheduledTime) - new Date() });

    res.status(200).json({ message: 'Post updated and rescheduled', post });
  } catch (err) {
    res.status(500).json({ message: 'Post update failed', error: err.message });
  }
};

// Delete a scheduled post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post || post.user.toString() !== req.user.id)
      return res.status(404).json({ message: 'Post not found' });

    if (post.status !== 'scheduled')
      return res.status(400).json({ message: 'Cannot delete published/failed post' });

    await post.deleteOne();
    res.status(200).json({ message: 'Post deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
};
