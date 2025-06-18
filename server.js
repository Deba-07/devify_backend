const app = require('./app');
const scheduleJobs = require('./jobs/postPublisher');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  scheduleJobs(); // Start the cron jobs after server starts
});
