const Queue = require('bull');

const postQueue = new Queue('post-queue', process.env.REDIS_URL);

postQueue.on('error', (err) => {
  console.error('❌ Bull queue error:', err.message);
});

module.exports = { postQueue };
