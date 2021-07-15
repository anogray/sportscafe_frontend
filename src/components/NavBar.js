import React, { useState } from 'react';
import { useEffect } from 'react';
import {Link} from "react-router-dom"
import  {useResponsive}  from 'react-hooks-responsive'

export default function Navbar(){
    const breakpoints = { xs: 0, sm: 480, md: 1024 }

    const { size, orientation, screenIsAtLeast, screenIsAtMost } = useResponsive(breakpoints)
    const [state, setstate] = useState(true);
    const [winScreen, setScreen] = useState("");

    useEffect(()=>{

        if(size=="xs"){
            setstate(false);
        }
        else{
            setstate(true);  
        }
    },[size])


    const  openMenu = ()=> {
        document.querySelector(".sidebar").classList.add("open");
    }
    const closeMenu=()=> {
        document.querySelector(".sidebar").classList.remove("open");
    }
    return(
        <>
        <div className="navbar-container">
            <div className="nav-container">
            <div className="nav-feature">
           {  state && <div className="logo-image">
              <img src="/logo.jpg" alt="image" className="logo-img" />
            </div>}
            {!state && <div className="hamburger">
            <button > &#9776;</button>
            </div>
               
            }
            <div className="title">
                SportsCafe
            </div>
            {state && <div className="about-us">
            <Link to = "/aboutus"> About Us</Link>
               
            </div>}
            </div>

            </div>
            
        </div>
        </>
    )
}