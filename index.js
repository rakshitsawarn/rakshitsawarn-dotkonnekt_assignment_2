const express = require('express');

// It will import the scheduling logic
const schedulejobs = require('./scheduler');

const app = express();

// We are implementing middleware to parse JSON body

app.use(express.json());


// Simple API endpoints to schedule jobs

app.post('/schedule', (req, res) => {
    const jobs = req.body.jobs;

    // Validation of input
    if(!jobs || !Array.isArray(jobs)){
        return res.status(400).send({ error: 'Invalid jobs format. Expected an array of jobs.' });
    }

    // Calling the scheduler logic

    const executionOrder = schedulejobs(jobs);
    res.json({ executionOrder });
});




// It will start the server

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
