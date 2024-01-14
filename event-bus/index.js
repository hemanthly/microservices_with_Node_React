const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();

app.use(bodyParser.json());

app.post('/events', async (req, res) => {
    const event = req.body;

    console.log("some event received at the EVENT-BUS.");
    //echo incoming event to POSTS service
    await axios.post('http://localhost:4000/events', event)
    .then((result) => {
        // console.log(result);
        console.log('sent incoming event to posts service from event-bus');
    }).catch((err) => {
        console.log(err);
    });
    //echo incoming event to COMMENTS service
    await axios.post('http://localhost:4001/events', event)
    .then((result) => {
        // console.log(result);
        console.log('sent incoming event to comments service from event-bus');
    }).catch((err) => {
        console.log(err);
    });
    //echo incoming event to QUERY service
    await axios.post('http://localhost:4002/events', event)
    .then((result) => {
        // console.log(result);
        console.log('sent incoming event to QUERY service from event-bus');
    }).catch((err) => {
        console.log(err);
    });

    res.send({ status: 'OK'});
});

app.listen(4005, () => {
    console.log('Event-bus Listening on 4005');
})