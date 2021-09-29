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
    const[Sentence,setsentence]=useState(item.item.sentences)
    const[Options,setOptions]=useState(item.item.Options)
    const[newOption,setnewOPtion]=useState("")
    const[newSentence,setnewSentence]=useState("")
    const deleteoption=()=>{}
    const addoption=()=>(setOptions((Options =>{
        if(newOption!=""){
            return [...Options, newOption]
        }
        return Options
    } )))
    const Editsentence=()=>setediting(true)
    
    const deleteitem=(id)=>{
        const temp=[...Options]
        temp.splice(id, 1)
        
       return (temp)
    }
    
    return(
        <div>
            <Flex flexDirection="column" boxShadow="2xl" bg="lightgrey" p={10} style={{borderColor:"black",borderWidth:"5px"}} >
                    <Box  style={{height:"100px",borderRadius:"10px",borderBlockColor:"crimson",backgroundColor:"darkgray",paddingLeft:"10px",paddingTop:"10px",minHeight:"150px"}}>
                        { !isediting ? 
                        <div>
                        <div>{Sentence}
                        </div>
                        <div style={{display:"flex",justifyContent:"space-evenly",bottom:"30px"}}>
                        <Button style={{width:"100px"}} onClick={Editsentence}>Edit</Button>
                    
                        </div> </div> : <div >
                            <input onChange={(e)=>setnewSentence(e.target.value)} defaultValue={Sentence}  style={{height:"50px",width:"500px"}}></input>
                            <div style={{display:"flex" ,flexDirection:"row",justifyContent:"space-evenly",paddingTop:"20px"}}>
                            <Button onClick={()=>(setsentence(newSentence),setediting(false))}>Okay</Button>
                            <Button onClick={()=>setediting(false)}><CloseIcon/>Close</Button>
                            </div>
                            </div>
                        }
                        </Box>
                    <div style={{display:"flex",flexDirection:"column" ,padding:"20px",textAlign:"center"}}>
                        {Options.map((option,i)=>{
                            
                            const id=i
                            
                            return(<div style={{display:"flex",textAlign:"center",justifyContent:"center"}}><div style={{padding:"10px"}}>{option}</div><Button onClick={()=>setOptions(deleteitem(id))} ><CloseIcon /></Button></div>)})}
                    </div>
                    <div style={{display:"flex",flexDirection:"column"}}>
                    <div style={{display:"flex",justifyContent:"space-evenly"}}><Input onChange={e=>setnewOPtion(e.target.value)} style={{width:"300px"}} placeholder="Enteroptions"></Input ><Button style={{width:"100px"}} onClick={addoption} >AddOptions</Button>
                    
                    </div>
                    <div style={{textAlign:"center",padding:"30px"}}>
                    <Button >Submit</Button>
                    </div>
                    </div>
                    
                    
                </Flex>
        </div>
    )
}