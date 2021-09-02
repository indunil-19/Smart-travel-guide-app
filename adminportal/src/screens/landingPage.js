import React,{useState,useContext,} from 'react'
import M from 'materialize-css'

const TravelApp=()=>{    
    document.addEventListener('DOMContentLoaded', function() {
        var elems = document.querySelectorAll('.carousel');
        var instances = M.Carousel.init(elems,{
            fullWidth:true,
            
        });
      });
      

    return(
       
<div>

    <div id="index-banner" className="container">
        <div className="section no-pad-bot">
        <div className="container">
            
            <h1 className="header center teal-text text-lighten-2">Smart Travel Guide</h1>
            <div className="row center">
            <h5 className="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
            </div>
            <div className="row center">
            <a href="#" id="download-button" className="btn-large waves-effect waves-light teal lighten-1">Download App from Here</a>
            </div>
        

        </div>
        </div>
        <div className="">
        <img src="https://images.unsplash.com/photo-1580794749460-76f97b7180d8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8ODF8fHNyaSUyMGxhbmthfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="Unsplashed background img 2"/>

        </div>
    </div>

    <div className="container" style={{marginTop:"100px"}}>
    <div className="carousel carousel-slider">
        <a className="carousel-item" href="#two!"><img src="https://lorempixel.com/800/400/food/2"/></a>
        <a className="carousel-item" href="#three!"><img src="https://lorempixel.com/800/400/food/3"/></a>
        <a className="carousel-item" href="#four!"><img src="https://lorempixel.com/800/400/food/4"/></a>
  </div>
    </div>
      

    
  <div className="container">
    <div className="section">

      <div className="row">
        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center brown-text"><i className="material-icons">flash_on</i></h2>
            <h5 className="center">Speeds up development</h5>

            <p className="light">We did most of the heavy lifting for you to provide a default stylings that incorporate our custom components. Additionally, we refined animations and transitions to provide a smoother experience for developers.</p>
          </div>
        </div>

        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center brown-text"><i className="material-icons">group</i></h2>
            <h5 className="center">User Experience Focused</h5>

            <p className="light">By utilizing elements and principles of Material Design, we were able to create a framework that incorporates components and animations that provide more feedback to users. Additionally, a single underlying responsive system across all platforms allow for a more unified user experience.</p>
          </div>
        </div>

        <div className="col s12 m4">
          <div className="icon-block">
            <h2 className="center brown-text"><i className="material-icons">settings</i></h2>
            <h5 className="center">Easy to work with</h5>

            <p className="light">We have provided detailed documentation as well as specific code examples to help new users get started. We are also always open to feedback and can answer any questions a user may have about Materialize.</p>
          </div>
        </div>
      </div>

    </div>
  </div>


  <div className="container valign-wrapper">
    <div className="section no-pad-bot">
      <div className="container">
        <div className="row center">
          <h5 className="header col s12 light">A modern responsive front-end framework based on Material Design</h5>
        </div>
      </div>
    </div>
    <div className="">
        
        <img src="https://images.unsplash.com/photo-1582103518581-46fe9a449915?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTI4fHxzcmklMjBsYW5rYXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"/>
    </div>
  </div>
</div>

    
    )
}

export default TravelApp;