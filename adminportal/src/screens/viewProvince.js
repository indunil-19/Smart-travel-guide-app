import React, { useState, useRef,useEffect } from 'react'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import M from 'materialize-css'

import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import { CustomGallery, Item, DefaultLayout } from 'react-photoswipe-gallery'
import { Button } from '@chakra-ui/button'
import { Box, Flex } from '@chakra-ui/layout'
import NavBar from '../components/navbar'
import { DeleteIcon,ArrowUpIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router'
export const ViewProvince = (props) => {
  const {pid}=useParams()
  const [ima,setIma]=useState([])
  useEffect(()=>{
    
     fetch("/admin/getProvinceData/"+pid).
     then(res=>res.json())
     .then(data=>{
        console.log(data)
        setIma(data.images)
       
     }).catch(err=>{
         console.log(err)
     })
  
  },[])
          
  return (
   <NavBar>
     <>
     <Galary imarr={ima} pid={pid} />
     </>
   </NavBar>
  )
}
const Galary=({pid,imarr,...props})=>{
  const [images,setImages]=useState(imarr)
  const layoutRef = useRef()
  const inputRef = useRef()


  const [isLoading,setLoading]=useState(false)
  const [url,setUrl]=useState("")

  const postDetails = (image)=>{
    console.log(image)
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","employeeApp")
    data.append("cloud_name","myimagcloud")
    fetch("https://api.cloudinary.com/v1_1/myimagcloud/image/upload",{
        method:"post",
        body:data
    })
    .then(res=>res.json())
    .then(data=>{
       setUrl(data.url)
    })
    .catch(err=>{
        console.log(err)
    })
  
  
  }
  useEffect(()=>{
    if(url){
     fetch("/admin/addImgtoProvinceData",{
         method:"post",
         headers:{
             "Content-Type":"application/json",
         },
         body:JSON.stringify({
             image:url,
             pid:pid,
             name:"",
             description:""
         })
     }).then(res=>res.json())
     .then(data=>{
        console.log(data)
        if(data.message){
           M.toast({html: data.message,classes:"#c62828 red darken-3"})
           setImages(data.result.images)

        }
       
     }).catch(err=>{
         console.log(err)
     })
  }
  },[url])


  return(
    <Flex flexDirection="column" alignItems="center">
    <Flex flexDirection="row" overflowX="scroll" margin="5">
    <CustomGallery layoutRef={layoutRef} ui={PhotoswipeUIDefault}>

      {images.map((image,index)=>{
         return(
          <Item key={index}
          original={image}
          thumbnail={image}
          width="1024"
          height="768"
        >
          {({ ref, open }) => (
           <>
            <img ref={ref} onClick={open} src={image}  width="200px" height="200px"/>
            <Button ><DeleteIcon/></Button>
           </>
          )}
        </Item>
         )
      })}
   
    </CustomGallery>

    <DefaultLayout
      shareButton={false}
      fullscreenButton={true}
      zoomButton={true}
      ref={layoutRef}
    />
       
    </Flex>
  
    <Button
    isLoading={isLoading}
    loadingText="Uploading"
    colorScheme="teal"
    variant="outline"
    rightIcon={<ArrowUpIcon/>}
    onClick={()=>inputRef.current.click()}
    
    
  >
    Upload
  </Button>
  <input  ref={inputRef} type="file" style={{display:"none"}} onChange={(e)=>postDetails(e.target.files[0])}/>
    </Flex>
    
  )
}

