import React, { useState } from 'react'
import NavBar from '../components/navbar'
import { Box } from '@chakra-ui/layout';
import { CloseIcon } from '@chakra-ui/icons';
import { CContainer } from '@coreui/react';
import { Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
export default function Editquestions() {

        const[Questionset,setQuestion]=useState(list1)  
    return (
        <div>
            <NavBar>
            {list1.map((item1)=>(
               <Question item={item1}/>
            ))}
            </NavBar>
        </div>
    )
}
const list1=[{
    'sentences':"Preferd weather",
    'Options':['hot','rainy','cold']
},{
    'sentences':"Preferd weather",
    'Options':['hot','rainy','cold']
},{
    'sentences':"Preferd weather",
    'Options':['hot','rainy','cold']
},{
    'sentences':"Preferd weather",
    'Options':['hot','rainy','cold']
}]

const Question=(item)=>{
    const[isediting,setediting]=useState(false);
    const[item2,setitem]=useState(item.item)
    return(
        <div>
            <Flex flexDirection="column" boxShadow="2xl" bg="lightgrey" p={10} style={{borderColor:"black",borderWidth:"5px"}} >
                    <Box  style={{height:"100px",borderRadius:"10px",borderBlockColor:"crimson",backgroundColor:"darkgray",paddingLeft:"10px",paddingTop:"10px",minHeight:"150px"}}><div>{item2.sentences}
                        </div>
                        <div style={{display:"flex",justifyContent:"space-evenly",bottom:"30px"}}>
                        <Button style={{width:"100px"}}>Edit</Button>
                        <Button style={{width:"100px"}}><CloseIcon/>Close</Button>
                        </div>
                        </Box>
                    <div style={{display:"flex",flexDirection:"column" ,padding:"20px",textAlign:"center"}}>
                        {item2.Options.map(option=>(<div style={{display:"flex",textAlign:"center",justifyContent:"center"}}><div style={{padding:"10px"}}>{option}</div><Button ><CloseIcon /></Button></div>))}
                    </div>
                    <div style={{display:"flex",flexDirection:"column"}}>
                    <div style={{display:"flex",justifyContent:"space-evenly"}}><Input style={{width:"300px"}} placeholder="Enteroptions"></Input><Button style={{width:"100px"}}>AddOptions</Button>
                    
                    </div>
                    <div style={{textAlign:"center",padding:"30px"}}>
                    <Button >Submit</Button>
                    </div>
                    </div>
                    
                    
                </Flex>
        </div>
    )
}