import React,{useState,useContext,} from 'react'
import {useHistory} from 'react-router-dom'
// import {UserContext} from '../../App'
// import M from 'materialize-css'
import {
    Flex,
    Heading,
    Text,
    Input,
    Button,
    Link as Link1,
    FormControl,
    FormLabel,
  
  } from '@chakra-ui/react';
const SignIn  = ()=>{
     //const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    
    const PostData = ()=>{
        
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            // M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/admin/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
           if(data.error){
            //   M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
            //    localStorage.setItem("jwt",data.token)
            //    localStorage.setItem("user",JSON.stringify(data.user))
            //    dispatch({type:"USER",payload:data.user})
            //    M.toast({html:"signedin success",classes:"#43a047 green darken-1"})
               history.push('/admin/dashboard')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (
   


    <Flex minH="100vh" justify="center" align="center" backgroundImage="url('https://images.unsplash.com/photo-1559038267-bfa6d8d3a160?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80')" backgroundPosition="center" backgroundSize="cover" backgroundRepeat="no-repeat">
    <Flex  flexDirection="column" bg="#FFFFFF" p={10} borderRadius="10px" boxShadow="dark-lg">
    <Heading fontSize={'4xl'}>Sign in to your account</Heading>
    <Text fontSize={'lg'} color={'gray.600'} p={4}>
       to enjoy all of our cool <Link1 color={'blue.400'}>features</Link1> ✌️
    </Text>

    <FormControl id="Email" isRequired>
    <FormLabel>Email</FormLabel>
    <Input placeholder="Email" value={email} type="text"  onChange={(e)=>setEmail(e.target.value) }/>
    </FormControl>


    <FormControl id="Password" isRequired>
    <FormLabel>Password</FormLabel>
    <Input placeholder="Password" value={password} type="password" onChange={(e)=>setPasword(e.target.value)} />
    </FormControl>



    <Button colorScheme="teal" size="md" mt={5} onClick={()=>PostData()} >
        SignIn
   </Button>

    </Flex>


    </Flex>
   )
}


export default SignIn