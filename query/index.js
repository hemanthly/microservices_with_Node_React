const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
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

    if(type === 'PostCreated'){
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };

    }
    if(type === 'CommentCreated'){
        const { id, content, postId } = data;

        const post = posts[postId];
        post.comments.push({ id, content });
    }
    console.log(posts);
    res.send({});
});

app.listen(4002, () => {
    console.log('Query Listening on port 4002.');
})