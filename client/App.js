import React from 'react';
import ReactDOM from 'react-dom/client';
import PostCreate from './src/PostCreate';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostList from './src/PostList';

function App() {
  return (
    <div className="App">
      <h1>Blogger app is used...</h1>
      <PostCreate></PostCreate>
      <hr/>
      <h1>Posts</h1>
      <PostList></PostList>
    </div>
    
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App></App>);