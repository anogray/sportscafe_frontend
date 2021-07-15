import React, {  useEffect, useState } from 'react'
import axios from "axios";
import { Button, Card, Form, Image} from 'react-bootstrap';
import InfiniteScroll from "react-infinite-scroller";
import {Link} from 'react-router-dom'

const AllPosts = () => {

    const [posts, setPosts] = useState([])
    const [openmodal, setModal] = useState(false);
    const [lastloading,setLastLoading] = useState(true);

   // const [url, setUrl] = useState(`http://localhost:3002/api/articles/all/?skip=${0}`)
    const [url, setUrl] = useState(`https://sportscafe-test.herokuapp.com/api/articles/all/?skip=${0}`)
    const[delPost, setDeletePost] = useState(false);
    
    const allPosts = async()=>{
              try{
              const resp = await axios.get(url);

              if(resp.data.dataEmpty){
                setLastLoading(false);
                return;
              }

                console.log({resp});
                setPosts([...posts,...resp.data.posts]);
                //setUrl(`http://localhost:3002/api/articles/all/?skip=${resp.data.skiprows}`)
                setUrl(`https://sportscafe-test.herokuapp.com/api/articles/all/?skip=${resp.data.skiprows}`)
                //
                
              }catch(err){
              console.log("useffect err",err);
              }
          }

          const deletePost = async(id)=>{
            try{
              
              const resp = await axios.delete(`/api/articles/${id}`)
              setDeletePost(true);
              if(resp.data.success){
                let prev = posts.filter((prev)=>prev._id!=id)
                setPosts(prev);
              }

            }catch(err){
              console.log(err);
            }

          }


    return ( 
        <div className="posts-container">
            All Posts  screen
            <div className="article-container">
            
            <Link to = "/article" ><div className="add-button"><button>Add</button></div></Link>
            <div className="article-padding">
            <InfiniteScroll
              pageStart={0}
              loadMore={allPosts}
              hasMore={url}
              loader={ lastloading && 
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
            >
            
                {posts.length ? posts.map((post)=>
                    (<div className="article" key={post._id}>
                            <div className="article-post">
                                <img src={post.Article_Image_Link} className="img-posts"/>
                                
                                <div className="feature-buttons">
                                <Link to={{pathname: `/article/${post._id}`,
                                post}}>
                                <button className="style-btn">Edit</button></Link>
                                <button className="style-btn" onClick={(e)=>deletePost(post._id)}>Delete</button>

                                </div>
                            </div>
                            <div className="article-body">


                                <div className="Sports_Name">
                                
                                <p>{post.Sports_Name}</p>
                                
                                </div>
                                <div className="Article_Title">
                                <p>{post.Article_Title}</p>
                                </div>
                                <div className="Article_Content">
                                {/* <textarea id="article-content" name="w3review" rows="5" cols="60">
                                {post.Article_Content.split("").map((ele)=>ele)}
                                </textarea> */}
                                 {post.Article_Content}
                                </div>
                                <div className="Article_Author">
                                <p>{post.Article_Author}</p>
                                </div>

                            </div>
                    </div>)
                    ) : <div>No Content</div>
                }
                </InfiniteScroll>
                
            </div>
          </div>
        </div>
     );
}
 
export default AllPosts;