const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use( bodyParser.json() );
app.use(cors());

const commentsByPostId = {

}

//get all posts
app.get('/posts/:id/comments', (req, res)=>{
    res.send(commentsByPostId[req.params.id] || []);
});

//create or push the comments for the given post Id.
app.post('/posts/:id/comments', async (req, res)=>{
    const commentId = randomBytes(4).toString('hex');

    const { content } = req.body; 

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id: commentId, content});
    commentsByPostId[req.params.id] = comments;
    console.log("comment request received.");
    await axios.post('http://localhost:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id
        }
    });

    res.status(201).send(comments);
});

//receiving events coming from the EVENT-BUS
app.post('/events', (req, res)=>{
    console.log('Event Received at comments from event-bus: ', req.body.type);
    res.send({});
});

app.listen(4001, ()=>{
    console.log("Comments server is listening on port 4001.");
});
