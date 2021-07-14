import React, {  useEffect, useState } from 'react'
import axios from "axios";
import {Modal, Button} from 'react-bootstrap';
import InfiniteScroll from "react-infinite-scroller";
import {Link} from 'react-router-dom'

const HomeScreen = () => {

    const [posts, setPosts] = useState([])
    const [openmodal, setModal] = useState(false);
    const [lastloading,setLastLoading] = useState(true);

    const [url, setUrl] = useState(`http://localhost:3002/api/articles/all/?skip=${0}`)
    
    const allPosts = async()=>{
              try{
              const resp = await axios.get(url);

              if(resp.data.dataEmpty){
                setLastLoading(false);
                return;
              }

                console.log({resp});
                setPosts([...posts,...resp.data.posts]);
                setUrl(`http://localhost:3002/api/articles/all/?skip=${resp.data.skiprows}`)
                
              }catch(err){
              console.log("useffect err",err);
              }
          }
    
    console.log(posts);



    return ( 
        <div className="posts-container">
            All Posts  screen
            <div className="article-container">
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
                    (<div className="article">
                            <div className="article-post">
                                <img src={post.Article_Image_Link}/>
                                <div>
                                <Link to={{pathname: `/article/${post._id}`,
                                post}}>
                                <button>Edit</button></Link>
                                <Link><button>Delete</button></Link>

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
                                <p>{post.Article_Content}</p>
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
     );
}
 
export default HomeScreen;