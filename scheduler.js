
function scheduleJobs(jobs) {
  // Sort jobs initially by arrival_time (helps simulate time in order)
  jobs.sort((a, b) => a.arrival_time - b.arrival_time);

  const executedJobs = [];
  const pendingJobs = [...jobs];
  let currentTime = 0;

  // Continue until all jobs are executed
  while (pendingJobs.length > 0) {
    // Get all jobs that have arrived till now
    const availableJobs = pendingJobs.filter(job => job.arrival_time <= currentTime);

    if (availableJobs.length === 0) {
      // No jobs available yet → increment time
      currentTime++;
      continue;
    }

    // Pick the job with highest priority, then lowest job_id
    availableJobs.sort((a, b) => {
      if (b.priority === a.priority) return a.job_id - b.job_id;
      return b.priority - a.priority;
    });

    // Select the best job
    const jobToExecute = availableJobs[0];
    executedJobs.push(jobToExecute.job_id);

    // Remove it from pendingJobs
    const index = pendingJobs.findIndex(j => j.job_id === jobToExecute.job_id);
    pendingJobs.splice(index, 1);

    // Move time forward
    currentTime++;
  }

  return executedJobs;
}

module.exports = scheduleJobs;
