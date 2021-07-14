import React, {  useEffect, useState } from 'react'
import axios from "axios";
import {Modal, Button} from 'react-bootstrap';
 
const HomeScreen = () => {

    const [posts, setPosts] = useState([])
    const [openmodal, setModal] = useState(false);
    const [skip, setSkip] = useState(0)
    const [scrolling, setScrolling] = useState(false)

    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
      console.log("scrolling",isFetching);
        window.addEventListener('scroll', handleScroll);
        console.log("scrolling added",window);

                    setIsFetching(true);
        //         }
        //         allPosts();

        return () => window.removeEventListener('scroll', handleScroll);
      }, []);

      useEffect(() => {
        console.log("isfetching",isFetching);
        if (!isFetching) return;
        // fetchMoreListItems();
                const allPosts = async()=>{
            //         console.log("changes usereffects",skip);
                    try{
                    const resp = await axios.get(`http://localhost:3002/api/articles/all/?skip=${skip}`);

                    if(resp.data.dataEmpty){
                      console.log("got stopped");
                      setScrolling(true);
                      //window.removeEventListener('scroll', handleScroll);
                    }
                    else{
                      console.log({resp});
                      setPosts([...posts,...resp.data.posts]);
                      setSkip((prev)=>prev+5);
                    }
                    }catch(err){
                    console.log("useffect err",err);
                    }
                    setIsFetching(false);
                }
      
      allPosts();
      }, [isFetching])

      function handleScroll() {
        //console.log('Fetch more list items!',window.pageYOffset,window.innerHeight,document.documentElement.scrollTop, document.documentElement.offsetHeight);
       
        if(scrolling){
          return
        }
        if (window.innerHeight + document.documentElement.scrollTop < document.documentElement.offsetHeight) 
        {      //console.log('Fetch more list items!',window.pageYOffset,window.innerHeight,document.documentElement.scrollTop, document.documentElement.offsetHeight);
console.log("yessssssss");
return;
        } 
        if(!scrolling){
          console.log("checking scrolling valid",scrolling);
          setIsFetching(true);
          return;
        }
        
       console.log('Fetch more list items!',window.pageYOffset,window.innerHeight,document.documentElement.scrollTop, document.documentElement.offsetHeight);

              // window.scrollTo(0, window.innerHeight);
        // if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) {
        //   // console.log("values",window.innerHeight,document.documentElement.scrollTop, document.documentElement.offsetHeight)
        //   return};
        // setIsFetching(true);

      }
    // useEffect(() => {
    //     document.addEventListener("scroll", () => {
    //       const scrollCheck = window.scrollY < 100
    //       if (scrollCheck !== scroll) {
    //         setScroll(scrollCheck)
    //       }
    //     })

    //     const allPosts = async()=>{
    //         //         console.log("changes usereffects",skip);
    //                 try{
    //                 const resp = await axios.get(`/api/articles/all/?skip=${skip}`);
    //                 console.log({resp});
    //                 setPosts([...posts,...resp.data.posts]);
    //                 }catch(err){
    //                 console.log("useffect err",err);
    //                 }
    //             }
      
    //   allPosts();
            
        
    //   },[])

    // useEffect(() => {
    //     // document.addEventListener("scroll", () => {
    //     //     const scrollCheck = window.scrollY > 100
    //     //     if (scrollCheck !== scroll) {
    //     //       setScroll(scrollCheck)
    //     //     }
    //     //   })

    //     function onScroll() {
    //         let currentPosition = window.pageYOffset; // or use document.documentElement.scrollTop;
    //         if (currentPosition > scrollTop) {
    //           // downscroll code
    //           setScrolling(false);
    //         } else {
    //           // upscroll code
    //           setScrolling(true);
    //         }
    //         setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
    //       }
      
    //       //window.addEventListener("scroll", onScroll);
        
    //     const allPosts = async()=>{
    //         console.log("changes usereffects",skip);
    //         try{
    //         const resp = await axios.get(`/api/articles/all/?skip=${skip}`);
    //         console.log({resp});
    //         setPosts([...posts,...resp.data.posts]);
    //         }catch(err){
    //         console.log("useffect err",err);
    //         }
    //     }
    //     // const onScroll = e => {
    //     //     setScrollTop(e.target.documentElement.scrollTop);
    //     //     setScrolling(e.target.documentElement.scrollTop > scrollTop);
    //     //   };
    //     // window.addEventListener("scroll", onScroll);
    //     allPosts();

    //     return () => {
    //         window.removeEventListener("scroll", onScroll);
    //     };
    // }, [scrollTop])
    console.log(posts);
    console.log("skip",skip);
    const openModal = ()=>{
        setModal(true);
    }
    const closeModal = ()=>{
        setModal(false);
    }

    // const ModalBody = ()=>{
    //     return (      
        <Modal show={openmodal} onHide={closeModal}>
            <Modal.Header closeButton>
            <Modal.Title id='ModalHeader'>A Title Goes here</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Some Content here</p>
          </Modal.Body>
          <Modal.Footer>

            {/* <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss> */}
 
            <button className='btn btn-primary' >
              Save
            </button>
          </Modal.Footer>
        </Modal>
    //     )
    //     }


// const handleScroll = (e) => {
//     const { offsetHeight, scrollTop, scrollHeight} = e.target
//     // console.log("postlength");

//     if (offsetHeight + scrollTop === scrollHeight) {
//         console.log("postlength",posts.length);
//         setSkip(posts.length)
//     }
//   }

        // console.log("e.target",window)
    return ( 
        <div className="posts-container">
            Home  screen            

            {/* //<ModalBody/> */}

            <button type='button' onClick={()=>openModal(true)}>Add Article</button>
            
            

            <div className="article-container">
                {posts.length ? posts.map((post)=>
                    (<div className="article">
                            <div className="article-post">
                                <img src={post.Article_Image_Link}/>
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
                {isFetching && 'Fetching more list items...'}
            </div>
        </div>
     );
}
 
export default HomeScreen;