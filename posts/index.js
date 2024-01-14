const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use( bodyParser.json() );

app.use(cors());

const posts = {
    
};

app.get('/', (req, res)=>{
    res.send(`<h1>Hemanth ka rajya hei!</h1>`);
})

//get all posts
app.get('/posts', (req, res)=>{
    res.send(posts);
});

//create a new post
app.post('/posts', async (req, res)=>{

    try {
        const id = randomBytes(4).toString('hex');
        const { title } = req.body;
        //storing in the posts object , temporary db
        posts[id] = {
            id, title
        };
        console.log("post request received.");
        await axios.post('http://localhost:4005/events',{
            type: 'PostCreated',
            data: {
                id, 
                title
            }
        });
        res.status(201).send(posts[id]);
    } catch (error) {
        console.error('Error processing POST request:', error);
        res.status(500).send('Internal Server Error');
    }

});
//receiving events coming from the EVENT-BUS
app.post('/events', (req, res)=>{
    console.log('Received Event in posts from event-bus: ', req.body.type);
    res.send({});
});

app.listen(4000, ()=>{
    console.log("Posts is running on port 4000.");
});