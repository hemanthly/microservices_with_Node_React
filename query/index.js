const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {

    if(type === 'PostCreated'){
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };

    }
    if(type === 'CommentCreated'){
        const { id, content, postId, status } = data;

        const post = posts[postId];
        post.comments.push({ id, content , status});
    }
    if( type === 'CommentUpdated' ){
        const { id, content, postId, status } = data;

        const post = posts[postId];
        const comment = post.comments.find( comment =>{
            return id === comment.id;
        });
        //since we receive a generic event which just tells that some property is updated,
        // since we don't know which particular one got updated, we have to update all. 
        // but here we are not updating id, and postId, because they are constants for a comment right.
        comment.status = status;
        comment.content = content;
    }
}
//QUICK EXAMPLE of posts data structure look like
// posts === {
//     'dgfsdg': {
//         id: 'dgfsdg',
//         title: 'post title',
//         comments: [
//             { id: 'sdfdg', content: 'first comment!!'}
//         ]
//     },
//     'htghtg': {
//         id: 'htghtg',
//         title: 'post title 2',
//         comments: [
//             { id: 'a4gkmy', content: 'first comment!!'},
//             { id: 'df56f', content: 'sdgfdg comment!!'},
//             { id: 'h6g7', content: 'hkjgh comment!!'}
//         ]
//     }
// }
app.get('/posts', (req, res)=>{
    res.send(posts);
});

app.post('/events', (req, res)=>{
    const { type, data } = req.body;

    handleEvent(type, data);

    // console.log(posts);
    res.send({});
});

app.listen(4002, async () => {
    console.log('Query Listening on port 4002.');

    //collecting all the missed events and acting on it again.
    await axios.get('http://localhost:4005/events')
    .then((response) => {
        (response.data).map( (event) => {
            console.log('Processing event: ', event.type);

            handleEvent(event.type, event.data);
        })
    }).catch((err) => {
        console.log(err.message);
    });

    
});