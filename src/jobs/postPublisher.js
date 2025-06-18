const Post = require('../models/Post');
const { postQueue } = require('../config/bull');
const sendEmail = require('../utils/sendEmail');

// After post is published


// Job processor
postQueue.process(async (job, done) => {
    const { postId } = job.data;
    
    try {
        const post = await Post.findById(postId);
        if (!post) throw new Error('Post not found');
        
        // Check again if it's already published or failed
        if (post.status !== 'scheduled') return done();
        
        post.status = 'published';
        post.publishedAt = new Date();
        await post.save();
        await sendEmail(user.email, 'Your post is now live! 🎉', `<p>${post.content}</p>`);

    console.log(`✅ Post published: ${post._id}`);

    // Bonus: Handle recurrence
    if (post.recurrence === 'daily') {
      const nextTime = new Date(post.scheduledTime);
      nextTime.setDate(nextTime.getDate() + 1);
      const newPost = await Post.create({
        content: post.content,
        scheduledTime: nextTime,
        recurrence: 'daily',
        user: post.user
      });
      await postQueue.add({ postId: newPost._id }, { delay: nextTime - new Date() });
    }

    if (post.recurrence === 'weekly') {
      const nextTime = new Date(post.scheduledTime);
      nextTime.setDate(nextTime.getDate() + 7);
      const newPost = await Post.create({
        content: post.content,
        scheduledTime: nextTime,
        recurrence: 'weekly',
        user: post.user
      });
      await postQueue.add({ postId: newPost._id }, { delay: nextTime - new Date() });
    }

    done();
  } catch (err) {
    console.error(`❌ Failed to publish post: ${postId}`, err.message);

    // Optional: Mark as failed
    await Post.findByIdAndUpdate(postId, { status: 'failed' });
    done(err);
  }
});
