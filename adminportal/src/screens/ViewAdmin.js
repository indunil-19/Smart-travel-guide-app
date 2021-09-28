import React, { useState } from 'react'
import NavBar from '../components/navbar'
import { CCard,CCardImage,CCardBody,CCardText } from '@coreui/react'
import { Text } from '@chakra-ui/layout'
import { Avatar } from '@chakra-ui/avatar'
import { Button } from '@chakra-ui/button'
export default function ViewAdmin() {
    const[Firstname,setfirstname]=useState("Varatharajan")
    const[Lastname,setlastname]=useState("Subtramaniyam")
    const[Dob,setdob]=useState("13/10/1997")
    const[Email,setemail]=useState("Svaratharajan@gmail.com")
    
    return (
        <NavBar>
            <div>
            <CCard style={{minWidth:"30rem" ,maxWidth: '60rem',display:"flex",flexDirection:"column",alignItems:"center",backgroundColor:"darkgray" }}>
            <CCardImage orientation="top" src="/background1.jpg"  style={{marginBottom:"-50px"}}/>
            <Avatar src="https://bit.ly/sage-adebayo" size="2xl" style={{textAlign:"center"}}/>
            <CCardBody >
              <CCardText>
                  <Text style={{fontSize:"40px",padding:"20px"}}>Firstname :- {Firstname}</Text>
                  <Text style={{fontSize:"40px",padding:"20px"}}>Lastname :-{Lastname}</Text>
                  <Text style={{fontSize:"40px",padding:"20px"}}>Dob :-{Dob}</Text>
                  <Text style={{fontSize:"40px",padding:"20px"}}>Email :-{Email}</Text>
                  <div style={{padding:"20px"}}><Button>Edit</Button></div>
                
              </CCardText>
            </CCardBody>
          </CCard>
            </div>
        </NavBar>
    )
}
