import React, { Component, useState } from 'react'
import { Form , Button, Image} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect } from 'react';

const PostScreen = (props) => {
    let data = props.location.post
    const request = data ? "put" : "post";

    const [Sports_Name, setName] = useState(data ? data.Sports_Name : "");
    const [Article_Title, setTitle] = useState(data? data.Article_Title:"");
    const [Article_Content, setContent] = useState(data ? data.Article_Content:"");
    const [Article_Author, setAuthor] = useState(data ? data.Article_Author : "");
    const [Article_Image_Link, setImage] = useState(data ? data.Article_Image_Link : "");
    const [imgChange, setImgChange] = useState(false);
    const [success, setSuccess] = useState(false);
  
    useEffect(() => {

      if(success){
        props.history.push("/");
      }
      return () => {
        
      };
    }, [success])

    const submitHandler = async(e)=>{
      e.preventDefault();
      try{
        const formData = {
          Sports_Name,
          Article_Title,
          Article_Content,
          Article_Author,
          Article_Image_Link,
          imgUpdate: imgChange
        }
        // console.log({formData});
        let resp="";
        if(request=="post"){
          // resp = await axios.post("/api/articles",formData)
           resp = await axios.post("https://sportscafe-test.herokuapp.com/api/articles",formData)

        }else{
          // resp = await axios.put(`/api/articles/${data._id}`,formData)
           resp = await axios.put(`https://sportscafe-test.herokuapp.com/api/articles/${data._id}`,formData)

        }
        if(!resp){
          console.log(resp);
          return;
        }
        
        console.log("respinsepost",resp);
        setSuccess(true);

      }catch(err){

      }
    }
// console.log({Article_Image_Link});
    const uploadFile = async(e)=>{
      e.preventDefault();
      try{
        const file = e.target.files[0];
        // console.log("uploaded fxn",file);
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        // const resp  = await axios.post('/api/articles/upload', bodyFormData)
        const resp  = await axios.post('https://sportscafe-test.herokuapp.com/api/articles/upload', bodyFormData)
        // console.log("resp upload",resp);
        setImage(resp.data.filename)
        setImgChange(true);
      }catch(err){
          console.log(err);
      }


    }

    return ( 
        <div className="">
            Post  screen
            <Form className="edit-form">
            <Form.Group className="mb-3" >
              <Form.Label>Sports Name</Form.Label>
              <Form.Control className="mb-3" name="name" type="text" placeholder="Sports Name" onChange={(e)=>setName(e.target.value)} value={Sports_Name}/>
              <Form.Label>Article Title</Form.Label>
              <Form.Control className="mb-3" name="article" type="text" placeholder="Article Title" onChange={(e)=>setTitle(e.target.value)}  value={Article_Title}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Article Content</Form.Label>
              <Form.Control as="textarea" name="content" onChange={(e)=>setContent(e.target.value)}  rows={3} value={Article_Content}/>
            </Form.Group>
            <Form.Group className="mb-3 col" >
              <Form.Label>Author Name</Form.Label>
              <Form.Control className="mb-3" type="text" name="author" onChange={(e)=>setAuthor(e.target.value)}  placeholder="Author Name" value={Article_Author}/>
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
            {/* <Form.Label>Default file input example</Form.Label> */}
             <Form.Control name="file" type="file" onChange={(e)=>uploadFile(e)} >
            </Form.Control> 
            {   data ? <Image className="img-post" src={ data.Article_Image_Link}/> : ""} 
            
          </Form.Group>
            <Button onClick={submitHandler}>{data ? "Update" : "Add" }</Button>
        </Form>
        </div>
     );
}
 
export default PostScreen;