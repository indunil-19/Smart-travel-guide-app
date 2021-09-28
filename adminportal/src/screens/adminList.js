import { useEffect, useState } from "react";
// import M from "materialize-css";

import NavBar from "../components/navbar";
import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/image";
import { Button } from "@chakra-ui/button";
import { ViewIcon } from "@chakra-ui/icons";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
  } from "@chakra-ui/react"
const AdminList=()=>{
   const [data,setData]=useState([])
   useEffect(()=>{
    fetch("/admin/viewAdmins")
    .then(res=>res.json())
    .then(result=>{
        console.log(result)
       if(result.error){
        //   M.toast({html: result.error,classes:"#c62828 red darken-3"})
       }
       else{
            console.log(result.admins)
             setData(result.admins)
       }
    }).catch(err=>{
        console.log(err)
    })
   },[])
    return(
       <NavBar>
             <div className="container"> 
            <table>
                <thead>
                <tr >
                    <th> Id</th>
                    <th style={{padding:"30px"}}>Profile</th>
                    <th style={{padding:"30px"}}>First Name</th>
                    <th style={{padding:"30px"}}>Last Nmae</th>
                    <th style={{padding:"30px"}}>View</th>
                </tr>
                </thead>

                <tbody>
                    
                        {
                            data.map((item,index)=>{
                                return(
                                    <tr >
                                        <td >{index+1}</td>
                                        <td style={{padding:"30px"}}><Profile value={item.pic} firstname1={item.firstname}/></td>
                                        <td style={{padding:"30px"}}>{item.firstname}</td>
                                        <td style={{padding:"30px"}}>{item.lastname}</td>
                                        <td style={{padding:"30px"}}><Button colorScheme="teal" size="xs">
                                                <ViewIcon/>
                                            </Button></td>
                                    </tr>
                                )
                            })
                        }
                </tbody>
            </table>
             </div>
             </NavBar>

       
          
          
      
      
    )
}

const Profile=(props)=>(<Popover  >
    <PopoverTrigger>
        <Avatar src={props.value}/>
    </PopoverTrigger>
    <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader style={{backgroundColor:"grey"}}>{props.firstname1}</PopoverHeader>
        <PopoverBody style={{backgroundColor:"grey"}}>
            
        <div><Image src={props.value} alt="Segun Adebayo"  style={{objectFit:"contain"}}/></div>
            
        
            </PopoverBody>
    </PopoverContent>
    </Popover>)

export default AdminList;
