import React, {useState} from 'react';
import axios from 'axios';

const PostCreate = () => {

    const [title, setTitle] = useState('');

    const onSubmitHandler = async (event) =>{
        event.preventDefault();
        console.log("inside submit handler..");
        await axios.post("http://localhost:4000/posts", {title})
            .then(response => {
                console.log('Response from API:', response.data);
                // Handle the response data here
            })
            .catch(error => {
                console.error('Error from API:', error);
                // Handle the error here
            });
    };

    return (
        <div className='container'>
          <form onSubmit={onSubmitHandler}>
            <div className="form-group" style={{paddingBottom: "20px"}}>
              <h2>Create Post</h2>
              <label htmlFor="title">Title</label>
              <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                type="text"
                className="form-control"
                id="title"
                placeholder="Enter title"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      );
}

export default PostCreate;