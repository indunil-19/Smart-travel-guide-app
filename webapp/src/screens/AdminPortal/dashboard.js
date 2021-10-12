import NavBar from "../../components/navbar";
import 'bootstrap/dist/css/bootstrap.min.css'
import { CCard } from "@coreui/react";
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from 'react-slideshow-image';
import Widgets from "../../components/Widget";

//import image from '../../public/images/
import {
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    StatGroup,
  } from "@chakra-ui/react"
import { CProgress } from "@coreui/react";
import { CProgressBar } from "@coreui/react";
const Dashboard=()=>{
    return(
        <>
        
        <Slideshow/>
       
        <StatGroup bg="white" p="5" boxShadow="dark-lg">
        <Stat>
            <StatLabel>Number of Admin online</StatLabel>
            <StatNumber>30</StatNumber>
            <StatHelpText>
            <StatArrow type="increase" />
            25%
            <CProgress className="mb-3">
    <CProgressBar value={25}/>
  </CProgress>
            </StatHelpText>
        </Stat>

        <Stat >
            <StatLabel>Number of Admin Offline</StatLabel>
            <StatNumber>120</StatNumber>
            <StatHelpText>
            <StatArrow type="decrease" />
           75 %
           <CProgress className="mb-3">
    <CProgressBar value={75}/>
  </CProgress>
            </StatHelpText>
        </Stat>
        </StatGroup>
        <StatGroup bg="white" p="5" boxShadow="dark-lg">
        <Stat>
            <StatLabel>Number of Downloads</StatLabel>
            <StatNumber>1000000</StatNumber>
            <StatHelpText>
            <StatArrow type="increase" />
            
            
            </StatHelpText>
        </Stat>

        <Stat >
            <StatLabel>Number of Users</StatLabel>
            <StatNumber>100000</StatNumber>
            <StatHelpText>
            <StatArrow type="decrease" />
          
            </StatHelpText>
        </Stat>
        </StatGroup>
       
       

        </>
    )
}

const slideImages = [
    {
      url: '/background1.jpg',
      caption: 'Welcome'
    },
    {
      url: '/background1.jpg',
      caption: 'Take features'
    },
    {
      url: '/background1.jpg',
      caption: 'Have A Nice Day'
    },
    {
      url: '/background1.jpg',
      caption: 'Bye'
    },
    {
      url: '/background1.jpg',
      caption: 'Welcome Back'
    },
    
  ];
  
  const Slideshow = () => {
      return (
        <div className="slide-container" style={{height:"500px"}}>
          <Slide>
           {slideImages.map((slideImage, index)=> (
              <div className="each-slide" key={index}>
                <div style={{'backgroundImage': `url(${slideImage.url})`,height:"500px",objectFit:"cover"}}>
                  <span>{slideImage.caption}</span>
                </div>
              </div>
            ))} 
          </Slide>
        </div>
      )
  }
  
export default Dashboard;