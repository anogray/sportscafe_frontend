import React, { Component } from 'react'
import { Form , Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostScreen = (props) => {
    const data = props.location.post
    console.log(props.location.post);
    return ( 
        <div className="">
            Post  screen
            <Form className="edit-form">
  <Form.Group className="mb-3" >
    <Form.Label>Sports Name</Form.Label>
    <Form.Control className="mb-3" type="text" placeholder="Sports Name" value={data.Sports_Name}/>
    <Form.Label>Article Title</Form.Label>
    <Form.Control className="mb-3" type="text" placeholder="Sports Name" value={data.Article_Title}/>
  </Form.Group>
  <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
    <Form.Label>Article Content</Form.Label>
    <Form.Control as="textarea" rows={3} value={data.Article_Content}/>
  </Form.Group>
  <Form.Group className="mb-3 col" >
    <Form.Label>Author Name</Form.Label>
    <Form.Control className="mb-3" type="text" placeholder="Author Name" value={data.Article_Author}/>
  </Form.Group>
</Form>
        </div>
     );
}
 
export default PostScreen;